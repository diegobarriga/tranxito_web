import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import Loader from '../../../../components/Loader/Loader';
import Alert from '../../../Alert/Alert';
import SignupForm from './SignupForm';


class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /*
  componentDidMount() {
    this.props.resetError();
  }
  */
  render() {
    if (this.props.isLoading === true) return <Loader />;

    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.isAdmin === 'D') {
        authRedirect = <Redirect to="/dashboard" />;
      }
    } else {
      authRedirect = <Redirect to="/" />;
    }

    /* Alert */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = 'Supervisor was created successfully';
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = 'Error the supervisor could not be created';
      alert = (<Alert alertType="FAIL" message={msg} />);
    }

    return (

      <Container>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8 }}>
            { authRedirect }
            <h1 style={h1Style}>Register Supervisor</h1>
            <SignupForm
              submit={this.props.onAuth}
              token={this.props.token}
              motorCarrierId={this.props.match.params.id}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}


SignupView.propTypes = {
  isAdmin: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  match: PropTypes.object.isRequired,
};

SignupView.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role,
  token: state.auth.token,
  error: state.auth.error,
  isLoading: state.auth.loading,
});

const mapDispatchToProps = dispatch => ({
  onAuth: data => dispatch(actions.signup(data)),
  resetError: () => dispatch(actions.errorReset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupView));
