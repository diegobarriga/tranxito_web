import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const SupportPersonnelRoute = ({ isAuthenticated, component: Component, ...restOfProps }) => (
  <Route
    {...restOfProps}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />}
  />
);

CompanyRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

export default connect(mapStateToProps)(SupportPersonnelRoute);
