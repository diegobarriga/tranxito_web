import validator from 'validator';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react';
var _ = require('lodash');

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        email: '',
        password: ''
      },
      isLoading: false,
      redirectTo: false,
      showPassword: false
    }
    this.onTogglePassword = this.onTogglePassword.bind(this);
    this.isValidLogin = this.isValidLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onTogglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  onChange(e) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  validateInput(data) {
    let errors = {};
    if (validator.isEmpty(String(data.email))) {
      errors.email = 'This field is required';
    }
    else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Not a valid email';
    }
    if (validator.isEmpty(String(data.password))) {
      errors.password = 'This field is required';
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  isValidLogin(){
    const { errors, isValid } = this.validateInput(this.state.credentials);
    if (!isValid) this.setState({ errors });
    return isValid;
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
    const { errors, isLoading, redirectTo } = this.state;
    if (redirectTo) {
      this.setState({redirectTo: false});
      return <Redirect to='/dashboard'/>;
    }
    return(
      <Form onSubmit={this.submitHandler} loading={}>
        <Form.Field>
          <Form.Input
          type="email"
          name="email"
          placeholder='Email'
          error={errors.email}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            placeholder='Password'
            type="password"
            name="password"
            autoComplete="new-password"
            onChange={this.onChange}
            error={errors.password}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox label='Show password' onClick={this.onTogglePassword}/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm;
