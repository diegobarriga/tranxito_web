import React, { Component } from 'react';
import validator from 'validator';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { translate } from 'react-i18next';
import api from '../../../services/api';
import states from '../../../utils/states.json';
import '../../../assets/styles/forms.css';

const _ = require('lodash');

console.log(states);

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
        licenseIssuingCountry: '',
        timeZoneOffsetUtc: 4,
        startingTime24HourPeriod: '',
        username: '',
        password: '',
        passwordConfirmation: '',
        accountType: 'D',
        accountStatus: true,
        defaultUse: true,
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
            licenseIssuingCountry: response.data.licenseIssuingCountry,
            timeZoneOffsetUtc: response.data.timeZoneOffsetUtc,
            startingTime24HourPeriod: response.data.startingTime24HourPeriod,
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
    const { t } = this.props;
    if (_.isEmpty(String(data.firstName))) {
      errors.firstName = t('This field is required');
    } else if (_.isEmpty(String(data.firstName.trim()))) {
      errors.firstName = t("This field can't be blank");
    } else if (String(data.firstName.length) > 30 || String(data.firstName).length < 2) {
      errors.firstName = t('First name must have between 2-30 characters');
    }
    if (_.isEmpty(String(data.lastName))) {
      errors.lastName = t('This field is required');
    } else if (_.isEmpty(String(data.lastName.trim()))) {
      errors.lastName = t("This field can't be blank");
    } else if (String(data.lastName.length) > 30 || String(data.lastName).length < 2) {
      errors.lastName = t('Last name must have between 2-30 characters');
    }
    if (_.isEmpty(String(data.username))) {
      errors.username = t('This field is required');
    } else if (_.isEmpty(String(data.username.trim()))) {
      errors.username = t("This field can't be blank");
    }
    if (_.isEmpty(String(data.email))) {
      errors.email = t('This field is required');
    } else if (_.isEmpty(String(data.email.trim()))) {
      errors.email = t("This field can't be blank");
    } else if (!validator.isEmail(String(data.email))) {
      errors.email = t('Input is not a valid email');
    }
    if (_.isEmpty(String(data.password))) {
      errors.password = t('This field is required');
    } else if (_.isEmpty(String(data.password.trim()))) {
      errors.password = t("This field can't be blank");
    }
    if (_.isEmpty(String(data.passwordConfirmation))) {
      errors.passwordConfirmation = t('This field is required');
    } else if (_.isEmpty(String(data.passwordConfirmation.trim()))) {
      errors.passwordConfirmation = t("This field can't be blank");
    } else if (!validator.equals(String(data.password), String(data.passwordConfirmation))) {
      errors.passwordConfirmation = t("Passwords don't match");
    }
    if (!_.isEmpty(data.picture) && !validator.isMimeType(String(data.picture))) {
      errors.picture = t('Invalid file format');
    }
    if (_.isEmpty(String(data.driverLicenseNumber))) {
      errors.driverLicenseNumber = t('This field is required');
    } else if (_.isEmpty(String(data.driverLicenseNumber.trim()))) {
      errors.driverLicenseNumber = t("This field can't be blank");
    } else if (!validator.isAlphanumeric(String(data.driverLicenseNumber))) {
      errors.driverLicenseNumber = t('Must only contain numbers and letters (0-9/A-Z)');
    } else if (String(data.driverLicenseNumber).length > 20) {
      errors.driverLicenseNumber = t('Must have ≤ 20 characters');
    }
    if (_.isEmpty(String(data.licenseIssuingState))) {
      errors.licenseIssuingState = t('This field is required');
    } else if (_.isEmpty(String(data.licenseIssuingState.trim()))) {
      errors.licenseIssuingState = t("This field can't be blank");
    } else if (String(data.licenseIssuingState).length !== 2) {
      errors.licenseIssuingState = t('Not a valid state');
    }

    if (_.isEmpty(String(data.licenseIssuingCountry))) {
      errors.licenseIssuingCountry = t('This field is required');
    } else if (_.isEmpty(String(data.licenseIssuingCountry.trim()))) {
      errors.licenseIssuingCountry = t("This field can't be blank");
    } else if (!['USA', 'Mexico', 'Canada', 'Other'].includes(data.licenseIssuingCountry)) {
      errors.licenseIssuingCountry = t("Issuing country can only be one of 'USA', 'Mexico', 'Canada' or 'Other'");
    }
    /*
    if (_.isEmpty(String(data.exemptDriverConfiguration))) {
      errors.exemptDriverConfiguration = 'This field is required';
    } else if (!['E', '0'].includes(this.exemptDriverConfiguration)) {
      errors.exemptDriverConfiguration = "Must be 'E', '0'";
    }
    */
    if (_.isEmpty(String(data.startingTime24HourPeriod))) {
      errors.startingTime24HourPeriod = t('This field is required');
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
      console.log('antes de enviar----', this.state);
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
    const { t } = this.props;
    return (
      <form className="ui form" onSubmit={this.submitHandler}>
        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('First name')}</Label>
            <FormGroup widths="equal">
              <Input
                type="text"
                name="firstName"
                placeholder={t('First name')}
                value={data.firstName}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.firstName}
                invalid={errors.firstName}
              />
              <FormFeedback>{errors.firstName}</FormFeedback>
            </FormGroup>
          </div>

          <div className="field">
            <Label>{t('Last name')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="lastName"
                placeholder={t('Last name')}
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
            <Label>{t('Username')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="username"
                placeholder={t('Username')}
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
          <Label>{t('Password')}</Label>
          <FormGroup>
            <Input
              placeholder={t('Password')}
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
          <Label>{t('Password confirmation')} </Label>
          <FormGroup>
            <Input
              placeholder={t('Password confirmation')}
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
          <Label for="image">{t('Image')}</Label>
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
            <Label>{t('Driver license number')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="driverLicenseNumber"
                placeholder={t('Driver license number')}
                value={data.driverLicenseNumber}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.driverLicenseNumber}
                invalid={errors.driverLicenseNumber}
              />
              <FormFeedback>{errors.driverLicenseNumber}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>{t('Licenses issuing country')}</Label>
            <FormGroup>
              <Input
                type="select"
                name="licenseIssuingCountry"
                placeholder={t('Licenses issuing country')}
                value={data.licenseIssuingCountry}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.licenseIssuingCountry}
                invalid={errors.licenseIssuingCountry}
              >
                <option value="">Select Country</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>USA</option>
                <option>Other</option>
              </Input>
              <FormFeedback>{errors.licenseIssuingCountry}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>{t('Licenses issuing state')}</Label>
            <FormGroup>
              <Input
                type="select"
                name="licenseIssuingState"
                placeholder={t('Licenses issuing state')}
                value={data.licenseIssuingState}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.licenseIssuingState}
                invalid={errors.licenseIssuingState}
                disabled={data.licenseIssuingCountry === ''}
              >
                <option value="">Select State</option>
                {data.licenseIssuingCountry !== '' ? (
                  states[data.licenseIssuingCountry].map(state => (
                    <option value={state.code}>
                      ({state.code}) {state.name}
                    </option>
                    ))
                ) : ''}
              </Input>
              <FormFeedback>{errors.licenseIssuingState}</FormFeedback>
            </FormGroup>
          </div>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('Time Zone Offset in UTC')}</Label>
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

          <div className="field">
            <Label>{t('Starting Time 24 Hour Period')}</Label>
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
        </div>
        <button className="ui button" type="submit">{t('Submit')}</button>
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

export default translate('translations')(DriverForm);
