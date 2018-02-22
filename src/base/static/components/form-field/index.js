import React, { Component } from "react";
import PropTypes from "prop-types";
import { fromJS, List as ImmutableList, Map as ImmutableMap } from "immutable";
import classNames from "classnames";

import {
  TextField,
  TextareaField,
  DropdownField,
  DatetimeField,
  GeocodingField,
  AddAttachmentButton,
  BigRadioField,
  BigCheckboxField,
  InputFormSubmitButton,
  RichTextareaField,
  MapDrawingToolbar,
  AutocompleteComboboxField,
  CustomUrlToolbar,
  BigToggleField,
  PublishControlToolbar,
  RangeSliderWithLabel,
} from "../form-field-types";

import "./form-field.scss";
import { inputForm as messages } from "../messages.js";
import {
  mayHaveAnyValue,
  mustHaveSomeValue,
  mustHaveUniqueUrl,
} from "./validators";
import constants from "../constants";

const Util = require("../../js/utils.js");

class FormField extends Component {
  componentWillMount() {
    this.fieldConfig = this.props.categoryConfig.fields.find(
      field => field.name === this.props.fieldName
    );
    this.validator = this.getValidator(this.fieldConfig);
    const initialFieldState = this.getInitialFieldState(this.fieldConfig);
    if (initialFieldState) {
      this.props.onInitialize(this.fieldConfig.name, initialFieldState);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.isInitializing ||
      nextProps.showValidityStatus ||
      nextProps.updatingField === this.fieldConfig.name
    );
  }

  onChange(fieldName, fieldValue) {
    this.props.onChange(
      fieldName,
      fieldValue,
      this.validator.validate(
        fieldValue,
        this.props.places,
        this.props.landmarks
      )
    );
  }

  getValidator(fieldConfig) {
    if (
      fieldConfig.type === constants.SUBMIT_FIELD_TYPENAME ||
      fieldConfig.type === constants.ATTACHMENT_FIELD_TYPENAME ||
      fieldConfig.type === constants.GEOCODING_FIELD_TYPENAME
    ) {
      return {
        validate: mayHaveAnyValue,
        message: "",
      };
    } else if (fieldConfig.type === constants.MAP_DRAWING_TOOLBAR_TYPENAME) {
      return {
        validate: mustHaveSomeValue,
        message: messages.missingGeometry,
      };
    } else if (fieldConfig.type === constants.CUSTOM_URL_TOOLBAR_TYPENAME) {
      return {
        validate: mustHaveUniqueUrl,
        message: messages.duplicateUrl,
      };
    } else {
      return {
        validate: fieldConfig.optional ? mayHaveAnyValue : mustHaveSomeValue,
        message: messages.missingRequired,
      };
    }
  }

  getInitialFieldState(fieldConfig) {
    // "autofill" is a better term than "autocomplete" for this feature.
    // TODO: Update this throughout the codebase.
    let autofillValue = fieldConfig.autocomplete
      ? Util.getAutocompleteValue(fieldConfig.name)
      : null;

    fieldConfig.hasAutofill = !!autofillValue;

    let fieldValue;
    switch (fieldConfig.type) {
      case constants.BIG_TOGGLE_FIELD_TYPENAME:
        fieldValue =
          autofillValue ||
          fieldConfig.default_value ||
          fieldConfig.content[1].value; // "off" position of the toggle
        break;
      case constants.BIG_CHECKBOX_FIELD_TYPENAME:
        fieldValue =
          fromJS(autofillValue) ||
          fromJS(fieldConfig.default_value) ||
          ImmutableList();
        break;
      case constants.PUBLISH_CONTROL_TOOLBAR_TYPENAME:
        fieldValue = autofillValue || fieldConfig.default_value;
        break;
      case constants.MAP_DRAWING_TOOLBAR_TYPENAME:
        fieldValue = "";
        break;
      // NOTE: For these fields, we don't want to initialize any value in the
      // parent form's state, since the value these fields produce is not
      // relevant to the content of the form itself.
      case constants.SUBMIT_FIELD_TYPENAME ||
        constants.ATTACHMENT_FIELD_TYPENAME ||
        constants.GEOCODING_FIELD_TYPENAME:
        return null;
      default:
        fieldValue = autofillValue || fieldConfig.default_value || "";
        break;
    }

    const fieldObj = ImmutableMap()
      .set(constants.FIELD_STATE_INITIALIZED_KEY, true)
      .set(constants.FIELD_STATE_VALUE_KEY, fieldValue)
      .set(constants.FIELD_STATE_FIELD_TYPE_KEY, fieldConfig.type)
      .set(
        constants.FIELD_STATE_VALIDITY_KEY,
        this.validator.validate(
          fieldValue,
          this.props.places,
          this.props.landmarks
        )
      )
      .set(constants.FIELD_STATE_VALIDITY_MESSAGE_KEY, this.validator.message);

    return fieldObj;
  }

  getFieldValue() {
    return this.props.fieldState
      ? this.props.fieldState.get(constants.FIELD_STATE_VALUE_KEY)
      : "";
  }

  buildField(fieldConfig) {
    // TODO: appropriate field visibility based on admin status

    const cn = {
      optionalMsg: classNames("input-form__optional-msg", {
        "input-form__optional-msg--visible": fieldConfig.optional,
      }),
    };
    const fieldPrompt = (
      <p className="input-form__field-prompt" key={1}>
        {fieldConfig.prompt}
        <span className={cn.optionalMsg}>{messages.optionalMsg}</span>
      </p>
    );

    const sharedProps = {
      autofillMode: this.props.autofillMode,
      disabled: this.props.disabled,
      hasAutofill: fieldConfig.hasAutofill,
      key: 2,
      name: fieldConfig.name,
      onChange: this.onChange.bind(this),
      placeholder: fieldConfig.placeholder,
      value: this.getFieldValue(),
    };

    switch (fieldConfig.type) {
      case constants.TEXT_FIELD_TYPENAME:
        return [fieldPrompt, <TextField {...sharedProps} />];
      case constants.TEXTAREA_FIELD_TYPENAME:
        return [fieldPrompt, <TextareaField {...sharedProps} />];
      case constants.RICH_TEXTAREA_FIELD_TYPENAME:
        return [
          fieldPrompt,
          // TODO: make bounds prop configurable.
          <RichTextareaField
            {...sharedProps}
            onAdditionalData={this.props.onAdditionalData.bind(this)}
            bounds="#content"
          />,
        ];
      case constants.CUSTOM_URL_TOOLBAR_TYPENAME:
        return [fieldPrompt, <CustomUrlToolbar {...sharedProps} />];
      case constants.MAP_DRAWING_TOOLBAR_TYPENAME:
        return [
          fieldPrompt,
          <MapDrawingToolbar
            {...sharedProps}
            onGeometryStyleChange={this.props.onGeometryStyleChange.bind(this)}
            map={this.props.map}
            markers={fieldConfig.content.map(item => item.url)}
            router={this.props.router}
          />,
        ];
      case constants.ATTACHMENT_FIELD_TYPENAME:
        return [
          fieldPrompt,
          <AddAttachmentButton
            onAdditionalData={this.props.onAdditionalData.bind(this)}
            label={fieldConfig.label}
          />,
        ];
      case constants.SUBMIT_FIELD_TYPENAME:
        return (
          <InputFormSubmitButton
            name={fieldConfig.name}
            label={fieldConfig.label}
          />
        );
      case constants.RANGE_FIELD_TYPENAME:
        return [
          fieldPrompt,
          <RangeSliderWithLabel
            {...sharedProps}
            max={fieldConfig.max}
            min={fieldConfig.min}
          />,
        ];
      case constants.BIG_CHECKBOX_FIELD_TYPENAME:
        return [
          fieldPrompt,
          fieldConfig.content.map(item => (
            <BigCheckboxField
              key={item.value}
              value={item.value}
              label={item.label}
              id={"input-form-" + fieldConfig.name + "-" + item.value}
              checkboxGroupState={this.getFieldValue()}
              name={fieldConfig.name}
              onChange={this.onChange.bind(this)}
              autofillMode={this.props.autofillMode}
              hasAutofill={fieldConfig.hasAutofill}
            />
          )),
        ];
      case constants.BIG_RADIO_FIELD_TYPENAME:
        return [
          fieldPrompt,
          fieldConfig.content.map(item => (
            <BigRadioField
              key={item.value}
              value={item.value}
              label={item.label}
              id={"input-form-" + fieldConfig.name + "-" + item.value}
              checked={this.getFieldValue() === item.value}
              name={fieldConfig.name}
              onChange={this.onChange.bind(this)}
              autofillMode={this.props.autofillMode}
              hasAutofill={fieldConfig.hasAutofill}
            />
          )),
        ];
      case constants.PUBLISH_CONTROL_TOOLBAR_TYPENAME:
        return (
          <PublishControlToolbar
            {...sharedProps}
            publishedState={this.getFieldValue()}
          />
        );
      case constants.DATETIME_FIELD_TYPENAME:
        return [
          fieldPrompt,
          <DatetimeField
            {...sharedProps}
            date={this.getFieldValue()}
            showTimeSelect={true}
          />,
        ];
      case constants.GEOCODING_FIELD_TYPENAME:
        return [
          fieldPrompt,
          <GeocodingField {...sharedProps} mapConfig={this.props.mapConfig} />,
        ];
      case constants.BIG_TOGGLE_FIELD_TYPENAME:
        return [
          fieldPrompt,
          <BigToggleField
            name={fieldConfig.name}
            checked={this.getFieldValue() === fieldConfig.content[0].value}
            key={2}
            labels={[
              fieldConfig.content[0].label,
              fieldConfig.content[1].label,
            ]}
            values={[
              fieldConfig.content[0].value,
              fieldConfig.content[1].value,
            ]}
            id={"input-form-" + fieldConfig.name}
            onChange={this.onChange.bind(this)}
            autofillMode={this.props.autofillMode}
            hasAutofill={fieldConfig.hasAutofill}
          />,
        ];
      case constants.DROPDOWN_FIELD_TYPENAME:
        return [
          fieldPrompt,
          <DropdownField {...sharedProps} options={fieldConfig.content} />,
        ];
      case constants.DROPDOWN_AUTOCOMPLETE_FIELD_TYPENAME:
        return [
          fieldPrompt,
          <AutocompleteComboboxField
            {...sharedProps}
            options={fieldConfig.content}
            id={"autocomplete-" + fieldConfig.name}
            showAllValues={true}
          />,
        ];
      default:
        console.error("Error: unknown form field type:", fieldConfig.type);
        return null;
    }
  }

  render() {
    const value = this.getFieldValue();
    const cn = classNames("input-form__field-container", {
      "input-form__field-container--invalid":
        !this.validator.validate(
          value,
          this.props.places,
          this.props.landmarks
        ) && this.props.showValidityStatus,
      "input-form__field-container--hidden":
        value &&
        this.fieldConfig.hasAutofill &&
        this.props.autofillMode === "hide",
    });

    return <div className={cn}>{this.buildField(this.fieldConfig)}</div>;
  }
}

FormField.propTypes = {
  autofillMode: PropTypes.string.isRequired,
  categoryConfig: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldState: PropTypes.object,
  landmarks: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  mapConfig: PropTypes.object.isRequired,
  onAdditionalData: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onGeometryStyleChange: PropTypes.func,
  onInitialize: PropTypes.func.isRequired,
  places: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  showValidityStatus: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object,
  ]),
};

FormField.defaultProps = {
  autofillMode: "color",
};

export default FormField;
