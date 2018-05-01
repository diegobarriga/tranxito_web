import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Loader from '../../../components/Loader/Loader';
import Alert from '../../Alert/Alert';


class SignupView extends Component {
  constructor(props) {
  super(props);
  this.state = {
    errors: {},
    redirectTo: false,
    pathname: ''
  }
  this.submit = this.submit.bind(this);
}

  componentDidMount() {
    this.props.resetError();
  }

    render() {
      if (this.props.isLoading === true) return <Loader />;

      const h1Style = {
        marginTop: '2rem',
        textAlign: 'center',
        marginBottom: '2rem',
      };

      let authRedirect = null;
      if (this.props.isAuthenticated) {
        if (!this.props.isAdmin) {
          authRedirect = <Redirect to="/dashboard" />;
        }
      } else {
        authRedirect = <Redirect to="/" />;
      }

      let alert;

      if (this.props.error === null) {
        alert = null;
      } else if (this.props.error.status === 200) {
        alert = (<Alert alertType="SUCCESS" />);
        // this.props.resetError();
      } else {
        alert = (<Alert alertType="FAIL" />);
        // this.props.resetError();
      }

      /* Dispatch action to reset status to null */


      return (

        <Container>
          <Row>
            <Col sm="12" md={{ size: 12 }}>
              { alert }
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 5, offset: 3 }}>
              { authRedirect }
              <h1 style={h1Style}>Register Supervisor</h1>
              <SignupForm signup={this.props.onAuth}>
            </Col>
          </Row>
        </Container>
      );
    }
}


Signup.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  resetError: PropTypes.func.isRequired,
};

Signup.defaultProps = {
  error: null,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  token: state.auth.token,
  error: state.auth.error,
  isLoading: state.auth.loading,

});


const mapDispatchToProps = dispatch => ({
  onAuth: (data) => dispatch(actions.signup(data)),
  resetError: () => dispatch(actions.errorReset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
