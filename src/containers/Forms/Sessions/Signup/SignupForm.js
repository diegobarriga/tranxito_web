import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

const _ = require('lodash');

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        email: '',
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
        username: '',
        accountType: 'S',
      },
      isLoading: false,
      redirectTo: false,
      showPassword: false,
    };
    this.onTogglePassword = this.onTogglePassword.bind(this);
    this.isValidSignup = this.isValidSignup.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
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
    console.log(data);
    if (_.isEmpty(String(data.firstName))) {
      errors.firstName = 'This field is required';
    }
    if (_.isEmpty(String(data.lastName))) {
      errors.lastName = 'This field is required';
    }
    if (_.isEmpty(String(data.username))) {
      errors.username = 'This field is required';
    }
    if (_.isEmpty(String(data.email))) {
      errors.email = 'This field is required';
    } else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Input is not a valid email';
    }
    if (_.isEmpty(String(data.password))) {
      errors.password = 'This field is required';
    }
    if (_.isEmpty(String(data.passwordConfirmation))) {
      errors.passwordConfirmation = 'This field is required';
    } else if (!validator.equals(String(data.password), String(data.passwordConfirmation))) {
      errors.passwordConfirmation = "Passwords don't match";
    }
    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  isValidSignup() {
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  submitHandler(event) {
    // prevents reloading of the page
    event.preventDefault();
    if (this.isValidSignup()) {
      this.setState({ errors: {}, isLoading: true });
      const newData = {
        ...this.state.data,
        token: this.props.token,
        motorCarrierId: this.props.motorCarrierId,
      };
      this.props.submit(newData);
    }
    // .catch(
    //   (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
    // );
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  render() {
    const {
      errors, isLoading, redirectTo, showPassword,
    } = this.state;
    // Change redirect link
    if (redirectTo) {
      this.setState({ redirectTo: false });
      return <Redirect to="/dashboard" />;
    }
    return (
      <Form onSubmit={this.submitHandler}>
        <FormGroup widths="equal">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={this.onChange}
            invalid={errors.firstName}
          />
          <FormFeedback>{errors.firstName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={this.onChange}
            invalid={errors.lastName}
          />
          <FormFeedback>{errors.lastName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.onChange}
            invalid={errors.username}
          />
          <FormFeedback>{errors.username}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            name="email"
            onChange={this.onChange}
            placeholder="Email"
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
        <FormGroup>
          <Input
            placeholder="Password Confirmation"
            type={!showPassword ? 'password' : 'text'}
            name="passwordConfirmation"
            autoComplete="new-password"
            onChange={this.onChange}
            invalid={errors.passwordConfirmation}
          />
          <FormFeedback>{errors.passwordConfirmation}</FormFeedback>
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

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.string.isRequired,
};

export default SignupForm;
