export default {
  TEXT_FIELD_TYPENAME: "text",
  TEXTAREA_FIELD_TYPENAME: "textarea",
  RICH_TEXTAREA_FIELD_TYPENAME: "rich_textarea",
  BIG_CHECKBOX_FIELD_TYPENAME: "big_checkbox",
  BIG_RADIO_FIELD_TYPENAME: "big_radio",
  DROPDOWN_FIELD_TYPENAME: "dropdown",
  DROPDOWN_AUTOCOMPLETE_FIELD_TYPENAME: "dropdown_autocomplete",
  PUBLISH_CONTROL_TOOLBAR_TYPENAME: "publish_control_toolbar",
  DATETIME_FIELD_TYPENAME: "datetime",
  GEOCODING_FIELD_TYPENAME: "geocoding",
  BIG_TOGGLE_FIELD_TYPENAME: "big_toggle",
  ATTACHMENT_FIELD_TYPENAME: "file",
  COMMON_FORM_ELEMENT_TYPENAME: "common_form_element",
  SUBMIT_FIELD_TYPENAME: "submit",
  RANGE_FIELD_TYPENAME: "range",
  INFORMATIONAL_HTML_FIELD_TYPENAME: "informational_html",
  NUMBER_FIELD_TYPENAME: "number",
  GEOLOCATE_FIELD_TYPENAME: "geolocate",
  LNG_LAT_FIELD_TYPENAME: "lng_lat",

  AUTOFILL_DURATION_DAYS: 30,

  LOCATION_TYPE_PROPERTY_NAME: "location_type",
  TITLE_PROPERTY_NAME: "title",
  SUBMITTER_NAME: "submitter_name",
  SUBMITTER: "submitter",
  USER_TOKEN_PROPERTY_NAME: "user_token",
  CREATED_DATETIME_PROPERTY_NAME: "created_datetime",
  UPDATED_DATETIME_PROPERTY_NAME: "updated_datetime",
  DATASET_SLUG_PROPERTY_NAME: "datasetSlug",
  MODEL_ID_PROPERTY_NAME: "id",
  STORY_FIELD_NAME: "story",
  DATASET_ID_PROPERTY_NAME: "datasetId",
  CUSTOM_URL_PROPERTY_NAME: "url-title",
  SHOW_METADATA_PROPERTY_NAME: "showMetadata",
  IS_VISIBLE_PROPERTY_NAME: "visible",
  IS_FOCUSED_PROPERTY_NAME: "isFocused",
  TARGET_PROPERTY_NAME: "target",
  SUBMISSION_SETS: "submission_sets",
  SUPPORT: "support",
  URL: "url",

  ATTACHMENT_TYPE_PROPERTY_NAME: "type",
  ATTACHMENT_NAME_PROPERTY_NAME: "name",
  ATTACHMENT_FILE_PROPERTY_NAME: "file",
  RICH_TEXT_IMAGE_CODE: "RT",
  COVER_IMAGE_CODE: "CO",

  RICH_TEXT_IMAGE_MARKUP_PREFIX: "{{#rich-text-image ",
  RICH_TEXT_IMAGE_MARKUP_SUFFIX: "}}",

  FIELD_VALUE_KEY: "value",
  FIELD_VALIDITY_KEY: "isValid",
  FIELD_VALIDITY_MESSAGE_KEY: "message",
  FIELD_FIELD_TYPE_KEY: "type",
  FIELD_RENDER_KEY: "renderKey",
  FIELD_VISIBILITY_KEY: "isVisible",
  FIELD_TRIGGER_VALUE_KEY: "trigger",
  FIELD_TRIGGER_TARGETS_KEY: "triggerTargets",
  FIELD_AUTO_FOCUS_KEY: "isAutoFocusing",
  FIELD_ADVANCE_STAGE_ON_VALUE_KEY: "advanceStage",

  GEOMETRY_PROPERTY_NAME: "geometry",
  GEOMETRY_STYLE_PROPERTY_NAME: "style",
  GEOMETRY_TYPE_PROPERTY_NAME: "type",

  // These geometry style property names follow the SimpleStyle spec.
  // https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0
  LINE_COLOR_PROPERTY_NAME: "stroke",
  LINE_OPACITY_PROPERTY_NAME: "stroke-opacity",
  FILL_COLOR_PROPERTY_NAME: "fill",
  FILL_OPACITY_PROPERTY_NAME: "fill-opacity",
  MARKER_ICON_PROPERTY_NAME: "marker-symbol",

  IS_HIDDEN_BY_FILTERS: "_mapseed:isHiddenByFilters",
  IS_FOCUSED_BY_FILTERS: "_mapseed:isFocusedByFilters",

  FOCUS_TARGET_LAYER_ACTION: "focus",
  UNFOCUS_MODEL_ACTION: "unfocus",

  DEFAULT_DATE_FORMAT: "YYYY-MM-DD",
  DEFAULT_DATE_DISPLAY_FORMAT: "MMMM Do YYYY",

  MAP_TRANSITION_FIT_LINESTRING_COORDS: "map:fit-linestring-coords",
  MAP_TRANSITION_FIT_POLYGON_COORDS: "map:fit-polygonal-coords",
  MAP_TRANSITION_EASE_TO_POINT: "map:ease-to-point",

  TRIGGER_GEOLOCATE_EVENT: "map:trigger-geolocate",

  HEADER_HEIGHT: 56,
  GEOCODE_ADDRESS_BAR_HEIGHT: 42,
};
