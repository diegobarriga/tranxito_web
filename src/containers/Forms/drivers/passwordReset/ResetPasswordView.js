import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Grid, Row, Col, Alert} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ResetPasswordForm from "./ResetPasswordForm";
import { validateToken, resetPassword } from "./../../actions/authActions";

class ResetPasswordView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectTo: false,
      pathname: '',
      isLoading: true,
      success: false
    }
    this.resetPaswordSubmit = this.resetPaswordSubmit.bind(this);
  }

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() => this.setState({ isLoading: false, success: true }))
      .catch(() => this.setState({ isLoading: false, success: false }));
  }

  resetPaswordSubmit(data) {
    this.props
      .resetPassword(data)
      .then(() => {
        this.setState({
          redirectTo: true,
          pathname: '/login'
        });
      });
  }

  render() {
    const { isLoading, success, redirectTo, pathname } = this.state;
    const token = this.props.match.params.token;
    if (redirectTo) {
      this.setState({ redirectTo: false });
      return <Redirect to={pathname}/>
    } else {
      return (
        <div>
          {isLoading && <Alert bsStyle="info">Loading...</Alert>}
          {!isLoading &&
          success && (
            <Grid>
              <Row>
                <ResetPasswordForm resetPaswordSubmit={this.resetPaswordSubmit} token={token} />
              </Row>
            </Grid>)}
          {!isLoading && !success && <Alert bsStyle="danger">Invalid Token</Alert>}
        </div>
      );
    }
  }
}

ResetPasswordView.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { validateToken, resetPassword })(ResetPasswordView);
