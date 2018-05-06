import React, { Component } from 'react';
import validator from 'validator';
import TemplateCSV from '../templates/template_csv';
import { Button, Form, FormGroup, FormFeedback, Label, Input} from 'reactstrap';
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
    this.emptyErrors = this.emptyErrors.bind(this);
    this.onTogglePassword = this.onTogglePassword.bind(this);
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
    if (_.isEmpty(String(data.first_name))) {
      errors.first_name = 'This field is required';
    }
    else if (String(data.first_name.length) > 30 || String(data.first_name).length < 2) {
      errors.first_name = 'First name must have between 2-30 characters';
    }
    if (_.isEmpty(String(data.last_name))) {
      errors.last_name = 'This field is required';
    }
    else if (String(data.last_name.length) > 30 || String(data.last_name).length < 2) {
      errors.last_name = 'Last name must have between 2-30 characters';
    }
    if (_.isEmpty(String(data.username))) {
      errors.username = 'This field is required';
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

  onTogglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  isValidCreate(){
    const { errors, isValid } = this.validateInput(this.state.data);
    console.log(errors);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  createSelectItems(min, max) {
    const items = [];
    for (let i = min; i <= max; i++) {
      items.push(<option value={i}>{i}</option>);
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

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  render() {
    const { errors, isLoading, showPassword} = this.state;

    return (
      <Form onSubmit={this.submitHandler}>
        <FormGroup widths='equal'>
          <Input
          type="text"
          name="first_name"
          placeholder='First Name'
          onChange={this.onChange}
          valid={!this.emptyErrors() && !errors.first_name}
          invalid={errors.first_name}
          />
          <FormFeedback>{errors.first_name}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
          type="text"
          name="last_name"
          placeholder='Last Name'
          onChange={this.onChange}
          valid={!this.emptyErrors() && !errors.last_name}
          invalid={errors.last_name}
          />
          <FormFeedback>{errors.last_name}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
          type="text"
          name="username"
          placeholder='Username'
          onChange={this.onChange}
          valid={!this.emptyErrors() && !errors.username}
          invalid={errors.username}
          />
          <FormFeedback>{errors.username}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
          type="email"
          name="email"
          placeholder='Email'
          onChange={this.onChange}
          invalid={errors.email}
          />
          <FormFeedback>{errors.email}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            placeholder='Password'
            type={!showPassword ? "password" : "text"}
            name="password"
            autoComplete="new-password"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.password}
            invalid={errors.password}
          />
          <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>
          <FormGroup>
          <Input
            placeholder='Password Confirmation'
            type={!showPassword ? "password" : "text"}
            name="passwordConfirmation"
            autoComplete="new-password"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.passwordConfirmation}
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
        <FormGroup>
          <Input
            type="text"
            name="driver_license_number"
            placeholder="Driver License Number"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.driver_license_number}
            invalid={errors.driver_license_number}
          />
          <FormFeedback>{errors.driver_license_number}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="licenses_issuing_state"
            placeholder="Licenses Issuing State"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.licenses_issuing_state}
            invalid={errors.licenses_issuing_state}
          />
          <FormFeedback>{errors.licenses_issuing_state}</FormFeedback>
        </FormGroup>
        <FormGroup>
        <Label>Exempt Driver Configuration</Label>
        <Input
          label='Exempt Driver Configuration'
          type='select'
          name="exempt_driver_configuration"
          onChange={this.onChange}
          valid={!this.emptyErrors() && !errors.exempt_driver_configuration}
          invalid={errors.exempt_driver_configuration}
        >
          <option value='0'>0</option>
          <option value='1'>1</option>
          <option value='E'>E</option>
        </Input>
        <FormFeedback>{errors.exempt_driver_configuration}</FormFeedback>
        </FormGroup>
        <FormGroup>
        <Label>Time Zone Offset in UTC</Label>
        <Input
          type='select'
          name="time_zone_offset_utc"
          onChange={this.onChange}
          valid={errors.time_zone_offset_utc}
          invalid={!this.emptyErrors() && !errors.time_zone_offset_utc}
        >
          {this.createSelectItems(4,11)}
        </Input>
        <FormFeedback>{errors.time_zone_offset_utc}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label>Starting Time 24 Hour Period</Label>
          <Input
          type="datetime-local"
          name="starting_time_24_hour_period"
          valid={!this.emptyErrors() && !errors.starting_time_24_hour_period}
          invalid={errors.starting_time_24_hour_period}
          onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
        <Label>Move Yards Use</Label>
        <Input
          type='select'
          name="move_yards_use"
          onChange={this.onChange}
          valid={!this.emptyErrors() && !errors.move_yards_use}
          invalid={errors.move_yards_use}
        >
          {this.createSelectItems(0,1)}
        </Input>
        <FormFeedback>{errors.move_yards_use}</FormFeedback>
        </FormGroup>
        <FormGroup>
        <Label>Default Use</Label>
        <Input
          type='select'
          name="default_use"
          onChange={this.onChange}
          valid={!this.emptyErrors() && !errors.default_use}
          invalid={errors.default_use}
        >
          {this.createSelectItems(0,1)}
        </Input>
        <FormFeedback>{errors.default_use}</FormFeedback>
        </FormGroup>
        <FormGroup>
        <Label>Personal Use</Label>
        <Input
          type='select'
          name="personal_use"
          onChange={this.onChange}
          valid={!this.emptyErrors() && !errors.personal_use}
          invalid={errors.personal_use}
        >
          {this.createSelectItems(0,1)}
        </Input>
        <FormFeedback>{errors.personal_use}</FormFeedback>
        </FormGroup>
        <Button type='submit' loading={isLoading}>Submit</Button>
      </Form>
    );
  }
}


export default CreateDriverForm;
