import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Grid, Row, Col, Alert} from 'react-bootstrap';
import ForgotPasswordForm from "./ForgotPasswordForm";
import { resetPasswordRequest } from "./../../actions/authActions";

class ForgotPasswordView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false
    }
    this.forgotPaswordSubmit = this.forgotPaswordSubmit.bind(this);
  }


  forgotPaswordSubmit(data) {
    this.props
      .resetPasswordRequest(data)
      .then(() => this.setState({ success: true }));
  }

  render() {
    return (
      <div>
        {this.state.success ? (
          <Alert bsStyle="info">Email has been sent.</Alert>
        ) : (
          <Grid>
            <Row>
              <ForgotPasswordForm forgotPaswordSubmit={this.forgotPaswordSubmit} />
            </Row>
          </Grid>
        )}
      </div>
    );
  }
}

ForgotPasswordView.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordView);
