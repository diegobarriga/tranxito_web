import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import api from '../../../../services/api';

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
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    // Si estamos editando el documento cargamos los datos del usuario para completar el form
    if (!this.props.isCreate) {
      this.getUserInfo().then((response) => {
        if (response.status === 200) {
          const newData = {
            email: response.data.email,
            password: '',
            passwordConfirmation: '',
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            username: response.data.username,
            accountType: 'S',
          };
          this.setState({ data: newData });
        } else {
          console.log('Error loading user info');
        }
      });
    }
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

  getUserInfo() {
    return api.people.getUser(this.props.match.params.id, this.props.token);
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
      errors,
      redirectTo,
      showPassword,
      data,
    } = this.state;

    // Change redirect link
    if (redirectTo) {
      this.setState({ redirectTo: false });
      return <Redirect to="/dashboard" />;
    }
    return (

      <form className="ui form" onSubmit={this.submitHandler}>
        <div className="unstackable two fields">
          <div className="field">
            <Label>First name</Label>
            <FormGroup widths="equal">
              <Input
                type="text"
                name="firstName"
                placeholder="First name"
                value={data.firstName}
                onChange={this.onChange}
                invalid={errors.firstName}
              />
              <FormFeedback>{errors.firstName}</FormFeedback>
            </FormGroup>
          </div>

          <div className="field">
            <Label>Last name</Label>
            <FormGroup>
              <Input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={data.lastName}
                onChange={this.onChange}
                invalid={errors.lastName}
              />
              <FormFeedback>{errors.lastName}</FormFeedback>
            </FormGroup>
          </div>
        </div>
        <div className="field">
          <Label>Username</Label>
          <FormGroup>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={this.onChange}
              invalid={errors.username}
            />
            <FormFeedback>{errors.username}</FormFeedback>
          </FormGroup>
        </div>

        <div className="field">
          <Label>Email</Label>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={data.email}
              onChange={this.onChange}
              placeholder="Email"
              invalid={errors.email}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </FormGroup>
        </div>

        <div className="field">
          <Label>Password</Label>
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
        </div>

        <div className="field">
          <Label>Password confirmation</Label>
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
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  isCreate: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

export default SignupForm;
