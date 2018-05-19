import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

const _ = require('lodash');

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        email: '',
        password: '',
      },
      isLoading: false,
      redirectTo: false,
      showPassword: false,
    };
    this.onTogglePassword = this.onTogglePassword.bind(this);
    this.isValidLogin = this.isValidLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.emptyErrors = this.emptyErrors.bind(this);
  }

  onTogglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  onChange(event) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
  }

  validateInput(data) {
    const errors = {};
    if (_.isEmpty(String(data.email))) {
      errors.email = 'This field is required';
    } else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Not a valid email';
    }
    if (_.isEmpty(String(data.password))) {
      errors.password = 'This field is required';
    }
    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  isValidLogin() {
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  submitHandler(event) {
    event.preventDefault(); // prevents reload of the page
    if (this.isValidLogin()) {
      this.setState({ errors: {}, isLoading: true });
      // verify credentials
      this.props.login(this.state.data.email, this.state.data.password);
      // .catch(
      //   (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      // );
    }
  }

  render() {
    const {
      errors, isLoading, redirectTo, showPassword,
    } = this.state;
    // if (redirectTo) {
    //   this.setState({redirectTo: false});
    //   return <Redirect to='/dashboard'/>;
    // }
    return (
      <Form onSubmit={this.submitHandler}>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.email}
            invalid={errors.email}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Password"
            type={!showPassword ? 'password' : 'text'}
            name="password"
            autoComplete="new-password"
            onChange={this.onChange}
            invalid={errors.password}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" onClick={this.onTogglePassword} />{' '}
            Show password
          </Label>
        </FormGroup>
        <Button type="submit" loading={isLoading}>Submit</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
