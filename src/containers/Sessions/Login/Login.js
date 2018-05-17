import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import Alert from '../../Alert/Alert';


class Login extends React.Component {
  state = {
    controls: {
      email: {
        value: '',
      },
      password: {
        value: '',
      },
    },
  }
  componentDidMount() {
    this.props.resetError();
  }

  emailChangedHandler = (event) => {
    const updatedControls = {
      ...this.state.controls,
      email: {
        ...this.state.controls.email,
        value: event.target.value,
      },
    };
    this.setState({ controls: updatedControls });
  }

  passwordChangedHandler = (event) => {
    const updatedControls = {
      ...this.state.controls,
      password: {
        ...this.state.controls.password,
        value: event.target.value,
      },
    };
    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    // prevents reloading of the page
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;

    const h1Style = {
      marginTop: '5rem',
      textAlign: 'center',
      marginBottom: '2rem',
    };

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.isAdmin) {
        authRedirect = <Redirect to="/motor_carriers" />;
      } else {
        authRedirect = <Redirect to="/dashboard" />;
      }
    }

    /* Alerts */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.response.status === 401) {
      msg = 'Error invalid username or password';
      alert = (<Alert alertType="FAIL" message={msg} />);
    } else if (this.props.error.response.status === 503) {
      msg = 'Server Down';
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
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            { authRedirect }
            <h1 style={h1Style}>Login</h1>
            <Form onSubmit={this.submitHandler}>
              <FormGroup>
                <Input type="email" invalid={this.state.controls.email.valid} name="email" onChange={this.emailChangedHandler} placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" onChange={this.passwordChangedHandler} placeholder="Password" />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

Login.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired,
  error: PropTypes.object,

};

Login.defaultProps = {
  error: null,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  isLoading: state.auth.loading,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password) => dispatch(actions.login(email, password)),
  resetError: () => dispatch(actions.errorReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
