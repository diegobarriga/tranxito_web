import React from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Loader from '../../../components/Loader/Loader';
import Alert from '../../Alert/Alert';


class Signup extends React.Component {
  state = {
    controls: {
      email: {
        value: '',
      },
      password: {
        value: '',
      },
      lastName: {
        value: '',
      },
      firstName: {
        value: '',
      },
      username: {
        value: '',
      },
      accountType: {
        value: 'S',
      },
    },
  }

  componentDidMount() {
    this.props.resetError();
  }
    onInputChange = (event) => {
      const state = this.state;
      state.controls[event.target.name].value = event.target.value;
      this.setState(state);
    }


    submitHandler = (event) => {
      // prevents reloading of the page
      event.preventDefault();
      this.props.onAuth(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.controls.firstName.value,
        this.state.controls.lastName.value,
        this.state.controls.username.value,
        this.state.controls.accountType.value,
        this.props.match.params.id,
        this.props.token,
      );
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
              <Form onSubmit={this.submitHandler}>
                <FormGroup>
                  <Input type="text" name="username" onChange={this.onInputChange} placeholder="Username" />
                </FormGroup>
                <FormGroup>
                  <Input type="text" name="firstName" onChange={this.onInputChange} placeholder="First Name" />
                </FormGroup>
                <FormGroup>
                  <Input type="text" name="lastName" onChange={this.onInputChange} placeholder="Last Name" />
                </FormGroup>
                <FormGroup>
                  <Input type="email" name="email" onChange={this.onInputChange} placeholder="Email" />
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" onChange={this.onInputChange} placeholder="Password" />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
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
  onAuth: (
    email,
    password,
    firstName,
    lastName,
    username,
    accountType,
    motorCarrierId,
    token,
  ) => dispatch(actions.signup(
    email,
    password,
    firstName,
    lastName,
    username,
    accountType,
    motorCarrierId,
    token,
  )),
  resetError: () => dispatch(actions.errorReset()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
