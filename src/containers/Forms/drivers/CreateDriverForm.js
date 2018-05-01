import React, { Component } from 'react';
import validator from 'validator';
import TemplateCSV from '../templates/template_csv';
import { Button, Checkbox, Form } from 'semantic-ui-react';
var _ = require('lodash');

class CreateDriverForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        first_name: '',
        last_name: '',
        email: '',
        driver_license_number: '',
        licenses_issuing_state: '',
        exempt_driver_configuration: '',
        time_zone_offset_utc: '',
        starting_time_24_hour_period: '',
        move_yards_use: '',
        personal_use: '',
        username: '',
        password: '',
        passwordConfirmation: ''
      },
      isLoading: false,
      showPassword: false
    };
    this.isValidCreate = this.isValidCreate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  // TODO Complete with defined validations
  // https://docs.google.com/document/d/1xpVsXXotppyoR2_pqqleRZp6-cvYGC78tZzaVFZrVcA/edit
  validateInput(data) {
    let errors = {}
    console.log(data);
    if (_.isEmpty(String(data.firstName))) {
      errors.firstName = 'This field is required';
    }
    else if (String(data.firstName.length) > 30 || String(data.firstName).length < 2) {
      errors.firstName = 'First name must have between 2-30 characters';
    }
    if (_.isEmpty(String(data.lastName))) {
      errors.lastName = 'This field is required';
    }
    else if (String(data.lastName.length) > 30 || String(data.lastName).length < 2) {
      errors.lastName = 'Last name must have between 2-30 characters';
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
    if (_.isEmpty(String(data.driver_license_number))) {
      errors.driver_license_number = 'This field is required';
    }
    else if (!validator.isAlphanumeric(String(data.driver_license_number))) {
      errors.driver_license_number = 'Must only contain numbers and letters (0-9/A-Z)';
    }
    else if (String(data.driver_license_number).length > 20) {
      errors.driver_license_number = 'Must have ≤ 20 characters';
    }
    if (_.isEmpty(String(data.licenses_issuing_state))) {
      errors.licenses_issuing_state = 'This field is required';
    }
    else if (String(data.licenses_issuing_state).length != 2) {
      errors.licenses_issuing_state = 'Not a valid state';
    }
    if (_.isEmpty(String(data.exempt_driver_configuration))) {
      errors.exempt_driver_configuration = 'This field is required';
    }
    else if (!['E', '0'].includes(this.exempt_driver_configuration)) {
      errors.exempt_driver_configuration = "Must be 'E', '0' or '1'" ;
    }
    if (_.isEmpty(String(data.time_zone_offset_utc))) {
      errors.time_zone_offset_utc = 'This field is required';
    }
    else if (!validator.isInt(String(this.time_zone_offset_utc), {min: 4, max: 11})) {
      errors.time_zone_offset_utc = "Must be an integer between 4 and 11";
    }
    //format time
    if (_.isEmpty(String(data.starting_time_24_hour_period))) {
      errors.starting_time_24_hour_period = 'This field is required';
    }
    if (_.isEmpty(String(data.personal_use))) {
      errors.personal_use = 'This field is required';
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  isValidCreate(){
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  createSelectItems(min, max) {
    const items = [];
    for (let i = min; i <= max; i++) {
      items.push(<option>{i}</option>);
    }
    return items;
  }

  submitHandler(event){
    event.preventDefault(); // prevents reload of the page
    if (this.isValidCreate()) {
      this.setState({ errors: {}, isLoading: true});
      // verify credentials
      this.props.submit(this.state.data).catch(
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  render() {
    const { errors, isLoading, showPassword } = this.state;

    return (
      <Form onSubmit={this.submitHandler}>
        <Form.Group widths='equal'>
          <Form.Input
          type="text"
          name="firstName"
          placeholder='First Name'
          onChange={this.onChange}
          error={errors.firstName}
          />
          <Form.Input
          type="text"
          name="lastName"
          placeholder='Last Name'
          onChange={this.onChange}
          error={errors.lastName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="text"
          name="username"
          placeholder='Username'
          onChange={this.onChange}
          error={errors.username}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="email"
          name="email"
          placeholder='Email'
          onChange={this.onChange}
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
        <Form.Group>
          <Form.Input
            type="text"
            name="driver_license_number"
            placeholder="Driver License Number"
            onChange={this.onChange}
            error={errors.driver_license_number}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            type="text"
            name="licenses_issuing_state"
            placeholder="Licenses Issuing State"
            onChange={this.onChange}
            error={errors.licenses_issuing_state}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="select"
          name="exempt_driver_configuration"
          placeholder="Exempt Driver Configuration"
          error={errors.exempt_driver_configuration}
          onChange={this.onChange}>
            <option>1</option>
            <option>E</option>
            <option selected="selected">0</option>
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="select"
          name="time_zone_offset_utc"
          placeholder="Time Zone Offset UTC"
          error={errors.time_zone_offset_utc}
          onChange={this.onChange}>
            {this.createSelectItems(4, 11)}
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="datetime-local"
          name="starting_time_24_hour_period"
          placeholder="Starting Time 24 Hour Period"
          error={errors.starting_time_24_hour_period}
          onChange={this.onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="select"
          name="move_yards_use"
          placeholder="Move Yards Use"
          error={errors.move_yards_use}
          onChange={this.onChange}>
            {this.createSelectItems(0, 1)}
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="select"
          name="default_use"
          placeholder="Default Use"
          error={errors.default_use}
          onChange={this.onChange}>
            {this.createSelectItems(0, 1)}
          </Form.Input>
        </Form.Group>
        <Form.Group>
          <Form.Input
          type="select"
          name="personal_use"
          placeholder="Personal Use"
          error={errors.personal_use}
          onChange={this.onChange}>
            {this.createSelectItems(0, 1)}
          </Form.Input>
        </Form.Group>
        <Button type='submit' loading={isLoading}>Submit</Button>
      </Form>
    );
  }
}


export default CreateDriverForm;
