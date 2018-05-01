import validator from 'validator';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form } from 'semantic-ui-react';
var _ = require('lodash');

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
        accountType: 'S'
        }
      },
      isLoading: false,
      redirectTo: false,
      showPassword: false
    }
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
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  validateInput(data) {
    let errors = {}
    console.log(data);
    if (_.isEmpty(String(data.firstName))) {
      errors.firstName = 'This field is required';
    }
    if (_.isEmpty(String(data.lastName))) {
      errors.lastName = 'This field is required';
    }
    if (_.isEmpty(String(data.email))) {
      errors.email = 'This field is required';
    }
    else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Input is not a valid email';
    }
    if (_.isEmpty(String(data.password))) {
      errors.password = 'This field is required';
    }
    if (_.isEmpty(String(data.passwordConfirmation))) {
      errors.passwordConfirmation = 'This field is required';
    }
    else if (!validator.equals(String(data.password), String(data.passwordConfirmation))) {
      errors.passwordConfirmation = "Passwords don't match";
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  isValidSignup(){
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  submitHandler(event){
    // prevents reloading of the page
    event.preventDefault();
    this.props.submit(this.state.data);
    // .catch(
    //   (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
    // );
  }

  submitHandler(event){
    event.preventDefault(); // prevents reload of the page
    if (this.isValidLogin()) {
      this.setState({ errors: {}, isLoading: true});
      // verify credentials
      this.props.login(this.state).catch(
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  render(){
    const { errors, isLoading, redirectTo, showPassword } = this.state;
    // Change redirect link
    if (redirectTo) {
      this.setState({redirectTo: false});
      return <Redirect to='/dashboard'/>;
    }
    return(
      <Form onSubmit={this.submitHandler}>
        <Form.Group widths='equal'>
          <Form.Input
          type="text"
          name="firstName"
          placeholder='First Name'
          error={errors.firstName}
          />
          <Form.Input
          type="text"
          name="lastName"
          placeholder='Last Name'
          error={errors.lastName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="text"
          name="username"
          placeholder='Username'
          error={errors.username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="email"
          name="email"
          placeholder='Email'
          error={errors.email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            placeholder='Password'
            type={!showPassword ? "password" : "text"}
            name="password"
            autoComplete="new-password"
            onChange={this.onChange}
            error={errors.password}
          />
          <Form.Input
            placeholder='Password Confirmation'
            type={!showPassword ? "password" : "text"}
            name="passwordConfirmation"
            autoComplete="new-password"
            onChange={this.onChange}
            error={errors.passwordConfirmation}
          />
          <Checkbox label='Show password' onClick={this.onTogglePassword}/>
        </Form.Group>
        <Button type='submit' loading={isLoading}>Submit</Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired
}

export default SignupForm;
