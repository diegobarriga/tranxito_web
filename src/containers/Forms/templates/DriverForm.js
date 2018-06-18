import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import api from '../../../services/api';
import '../../../assets/styles/forms.css';

const _ = require('lodash');

class DriverForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        firstName: '',
        lastName: '',
        email: '',
        driverLicenseNumber: '',
        licenseIssuingState: '',
        exemptDriverConfiguration: '0',
        timeZoneOffsetUtc: '',
        startingTime24HourPeriod: '',
        moveYardsUse: '0',
        personalUse: '0',
        username: '',
        password: '',
        passwordConfirmation: '',
        accountType: 'D',
        accountStatus: true,
      },
      picture: '',
      isLoading: false,
      showPassword: false,
    };
    this.isValidData = this.isValidData.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.emptyErrors = this.emptyErrors.bind(this);
    this.onTogglePassword = this.onTogglePassword.bind(this);
    this.createSelectItems = this.createSelectItems.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    // Si estamos editando el documento cargamos los datos del usuario para completar el form
    if (!this.props.isCreate) {
      this.getUserInfo().then((response) => {
        if (response.status === 200) {
          const newData = {
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            driverLicenseNumber: response.data.driverLicenseNumber,
            licenseIssuingState: response.data.licenseIssuingState,
            exemptDriverConfiguration: response.data.exemptDriverConfiguration,
            timeZoneOffsetUtc: response.data.timeZoneOffsetUtc,
            startingTime24HourPeriod: response.data.startingTime24HourPeriod,
            moveYardsUse: response.data.moveYardsUse,
            defaultUse: response.data.defaultUse,
            personalUse: response.data.personalUse,
            image: response.data.image,
            username: response.data.username,
            password: '',
            accountType: 'D',
            accountStatus: true,
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
    if (event.target.name === 'picture') {
      this.setState({ picture: event.target.files[0] });
    } else {
      this.setState({
        ...this.state,
        data: { ...this.state.data, [event.target.name]: event.target.value },
      });
    }
  }

  getUserInfo() {
    return api.people.getUser(this.props.match.params.id, this.props.token);
  }

  // TODO Complete with defined validations
  // https://docs.google.com/document/d/1xpVsXXotppyoR2_pqqleRZp6-cvYGC78tZzaVFZrVcA/edit
  validateInput(data) {
    const errors = {};
    if (_.isEmpty(String(data.firstName))) {
      errors.firstName = 'This field is required';
    } else if (_.isEmpty(String(data.firstName.trim()))) {
      errors.firstName = "This field can't be blank";
    } else if (String(data.firstName.length) > 30 || String(data.firstName).length < 2) {
      errors.firstName = 'First name must have between 2-30 characters';
    }
    if (_.isEmpty(String(data.lastName))) {
      errors.lastName = 'This field is required';
    } else if (_.isEmpty(String(data.lastName.trim()))) {
      errors.lastName = "This field can't be blank";
    } else if (String(data.lastName.length) > 30 || String(data.lastName).length < 2) {
      errors.lastName = 'Last name must have between 2-30 characters';
    }
    if (_.isEmpty(String(data.username))) {
      errors.username = 'This field is required';
    } else if (_.isEmpty(String(data.username.trim()))) {
      errors.username = "This field can't be blank";
    }
    if (_.isEmpty(String(data.email))) {
      errors.email = 'This field is required';
    } else if (_.isEmpty(String(data.email.trim()))) {
      errors.email = "This field can't be blank";
    } else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Input is not a valid email';
    }
    if (_.isEmpty(String(data.password))) {
      errors.password = 'This field is required';
    } else if (_.isEmpty(String(data.password.trim()))) {
      errors.password = "This field can't be blank";
    }
    if (_.isEmpty(String(data.passwordConfirmation))) {
      errors.passwordConfirmation = 'This field is required';
    } else if (_.isEmpty(String(data.passwordConfirmation.trim()))) {
      errors.passwordConfirmation = "This field can't be blank";
    } else if (!validator.equals(String(data.password), String(data.passwordConfirmation))) {
      errors.passwordConfirmation = "Passwords don't match";
    }
    if (!_.isEmpty(data.picture) && !validator.isMimeType(String(data.picture))) {
      errors.picture = 'Invalid file format';
    }
    if (_.isEmpty(String(data.driverLicenseNumber))) {
      errors.driverLicenseNumber = 'This field is required';
    } else if (_.isEmpty(String(data.driverLicenseNumber.trim()))) {
      errors.driverLicenseNumber = "This field can't be blank";
    } else if (!validator.isAlphanumeric(String(data.driverLicenseNumber))) {
      errors.driverLicenseNumber = 'Must only contain numbers and letters (0-9/A-Z)';
    } else if (String(data.driverLicenseNumber).length > 20) {
      errors.driverLicenseNumber = 'Must have ≤ 20 characters';
    }
    if (_.isEmpty(String(data.licenseIssuingState))) {
      errors.licenseIssuingState = 'This field is required';
    } else if (_.isEmpty(String(data.licenseIssuingState.trim()))) {
      errors.licenseIssuingState = "This field can't be blank";
    } else if (String(data.licenseIssuingState).length !== 2) {
      errors.licenseIssuingState = 'Not a valid state';
    }
    /*
    if (_.isEmpty(String(data.exemptDriverConfiguration))) {
      errors.exemptDriverConfiguration = 'This field is required';
    } else if (!['E', '0'].includes(this.exemptDriverConfiguration)) {
      errors.exemptDriverConfiguration = "Must be 'E', '0'";
    }
    */
    if (_.isEmpty(String(data.startingTime24HourPeriod))) {
      errors.startingTime24HourPeriod = 'This field is required';
    }
    /*
    if (_.isEmpty(String(data.timeZoneOffsetUtc))) {
      errors.timeZoneOffsetUtc = 'This field is required';
    } else if (!validator.isInt(String(this.timeZoneOffsetUtc), { min: 4, max: 11 })) {
      errors.timeZoneOffsetUtc = 'Must be an integer between 4 and 11';
    }
    */
    /*
    if (_.isEmpty(String(data.personalUse))) {
      errors.personalUse = 'This field is required';
    }
    */
    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  isValidData() {
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  createSelectItems(min, max) {
    const items = [];
    for (let i = min; i <= max; i += 1) {
      items.push(<option key={i} value={i}>{i}</option>);
    }
    return items;
  }

  async submitHandler(event) {
    event.preventDefault(); // prevents reload of the page
    if (this.isValidData()) {
      this.setState({ errors: {}, isLoading: true });
      // verify credentials
      try {
        await this.props.submit(this.state);
      } catch (error) {
        this.setState({ errors: error.response.data.errors, isLoading: false });
      }
    }
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  render() {
    const {
      errors,
      showPassword,
      data,
    } = this.state;

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
                valid={!this.emptyErrors() && !errors.firstName}
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
                valid={!this.emptyErrors() && !errors.lastName}
                invalid={errors.lastName}
              />
              <FormFeedback>{errors.lastName}</FormFeedback>
            </FormGroup>
          </div>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>Username</Label>
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={data.username}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.username}
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
                placeholder="Email"
                value={data.email}
                onChange={this.onChange}
                invalid={errors.email}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
          </div>
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
              value={data.password}
              valid={!this.emptyErrors() && !errors.password}
              invalid={errors.password}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>Password confirmation </Label>
          <FormGroup>
            <Input
              placeholder="Password confirmation"
              type={!showPassword ? 'password' : 'text'}
              name="passwordConfirmation"
              autoComplete="new-password"
              value={data.passwordConfirmation}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.passwordConfirmation}
              invalid={errors.passwordConfirmation}
            />
            <FormFeedback>{errors.passwordConfirmation}</FormFeedback>
          </FormGroup>
        </div>

        <div className="field">
          <Label for="image">Image</Label>
          <FormGroup>
            <Input
              type="file"
              name="picture"
              className="center-item"
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.picture}
              invalid={errors.picture}
            />
            <FormFeedback>{errors.picture}</FormFeedback>
          </FormGroup>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>Driver license number</Label>
            <FormGroup>
              <Input
                type="text"
                name="driverLicenseNumber"
                placeholder="Driver license number"
                value={data.driverLicenseNumber}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.driverLicenseNumber}
                invalid={errors.driverLicenseNumber}
              />
              <FormFeedback>{errors.driverLicenseNumber}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>Licenses issuing state</Label>
            <FormGroup>
              <Input
                type="text"
                name="licenseIssuingState"
                placeholder="Licenses issuing state"
                value={data.licenseIssuingState}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.licenseIssuingState}
                invalid={errors.licenseIssuingState}
              />
              <FormFeedback>{errors.licenseIssuingState}</FormFeedback>
            </FormGroup>
          </div>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>Exempt driver configuration</Label>
            <FormGroup>
              <Input
                label="Exempt Driver Configuration"
                type="select"
                name="exemptDriverConfiguration"
                value={data.exemptDriverConfiguration}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.exemptDriverConfiguration}
                invalid={errors.exemptDriverConfiguration}
              >
                <option value="0">0</option>
                <option value="E">E</option>
              </Input>
              <FormFeedback>{errors.exemptDriverConfiguration}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>Time Zone Offset in UTC</Label>
            <FormGroup>
              <Input
                type="select"
                name="timeZoneOffsetUtc"
                value={data.timeZoneOffsetUtc}
                onChange={this.onChange}
                valid={errors.timeZoneOffsetUtc}
                invalid={!this.emptyErrors() && !errors.timeZoneOffsetUtc}
              >
                {this.createSelectItems(4, 11)}
              </Input>
              <FormFeedback>{errors.timeZoneOffsetUtc}</FormFeedback>
            </FormGroup>
          </div>
        </div>

        <div className="field">
          <Label>Starting Time 24 Hour Period</Label>
          <FormGroup>
            <Input
              type="datetime-local"
              name="startingTime24HourPeriod"
              value={data.startingTime24HourPeriod}
              valid={!this.emptyErrors() && !errors.startingTime24HourPeriod}
              invalid={errors.startingTime24HourPeriod}
              onChange={this.onChange}
            />
          </FormGroup>
        </div>

        <div className="unstackable three fields">
          <div className="field">
            <Label>Move Yards Use</Label>
            <FormGroup>
              <Input
                type="select"
                name="moveYardsUse"
                value={data.moveYardsUse}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.moveYardsUse}
                invalid={errors.moveYardsUse}
              >
                {this.createSelectItems(0, 1)}
              </Input>
              <FormFeedback>{errors.moveYardsUse}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>Default Use</Label>
            <FormGroup>
              <Input
                type="select"
                name="defaultUse"
                value={data.defaultUse}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.defaultUse}
                invalid={errors.defaultUse}
              >
                {this.createSelectItems(0, 1)}
              </Input>
              <FormFeedback>{errors.defaultUse}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>Personal Use</Label>
            <FormGroup>
              <Input
                type="select"
                name="personalUse"
                value={data.personalUse}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.personalUse}
                invalid={errors.personalUse}
              >
                {this.createSelectItems(0, 1)}
              </Input>
              <FormFeedback>{errors.personalUse}</FormFeedback>
            </FormGroup>
          </div>
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    );
  }
}

DriverForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default DriverForm;
