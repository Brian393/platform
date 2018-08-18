import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Button } from "../atoms/buttons";
import StoryNavigator from "../organisms/story-navigator";
import MapLegend from "../organisms/map-legend";

import { rightSidebarConfigSelector } from "../../state/ducks/config";

import "./right-sidebar.scss";

const RightSidebar = props => {
  let component;
  // TODO: Support multiple simultaneous right sidebar components.
  if (props.rightSidebarConfig.component === "StoryNavigator") {
    component = <StoryNavigator {...props} />;
  } else if (props.rightSidebarConfig.component === "MapLegend") {
    component = <MapLegend {...props} />;
  }

  return (
    <div className="right-sidebar">
      <Button className="right-sidebar__collapse-btn" />
      {component}
    </div>
  );
};

RightSidebar.propTypes = {
  rightSidebarConfig: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    visibleDefault: PropTypes.bool,
    component: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  }),
};

RightSidebar.defaultProps = {
  component: "StoryNavigator",
};

const mapStateToProps = state => ({
  rightSidebarConfig: rightSidebarConfigSelector(state),
});

export default connect(mapStateToProps)(RightSidebar);
