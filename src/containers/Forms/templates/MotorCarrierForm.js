import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label, FormGroup, FormFeedback, Input } from 'reactstrap';
import { translate } from 'react-i18next';
import api from '../../../services/api';
import '../../../assets/styles/forms.css';

const _ = require('lodash');


class MotorCarrierForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        name: '',
        usdotNumber: '',
        multidayBasisUsed: '7',
        createDevices: false,
      },
      isLoading: false,
      redirectTo: false,
    };
    this.onChange = this.onChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.emptyErrors = this.emptyErrors.bind(this);
  }

  componentDidMount() {
    // Si estamos editando el documento cargamos los datos del usuario para completar el form
    if (!this.props.isCreate) {
      this.getMotorCarrierInfo().then((response) => {
        if (response.status === 200) {
          const newData = {
            name: response.data.name,
            usdotNumber: response.data.usdotNumber,
            multidayBasisUsed: response.data.multidayBasisUsed,
            createDevices: response.data.createDevices,
          };
          this.setState({ ...this.state, data: newData });
        }
      });
    }
  }

  onChange(event) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
  }

  getMotorCarrierInfo() {
    return api.motorCarriers.getMotorCarrier(this.props.id, this.props.token);
  }

  validateInput(data) {
    const { t } = this.props;
    const errors = {};
    if (_.isEmpty(String(data.name))) {
      errors.name = t('This field is required');
    } else if (_.isEmpty(String(data.name.trim()))) {
      errors.name = t("This field can't be blank");
    } else if (String(data.name.trim()).length > 120 || String(data.name.trim()).length < 4) {
      errors.name = 'Name must be between 4-120 characters long';
    }
    /* NEED FIX */
    if (_.isEmpty(String(data.usdotNumber))) {
      errors.usdotNumber = t('This field is required');
    } else if (Number(this.usdotNumber) < 0 || Number(this.usdotNumber) > 999999999) {
      errors.usdotNumber = t('USDOT number must be between 0-999,999,999');
    }
    if (_.isEmpty(String(data.multidayBasisUsed))) {
      errors.multidayBasisUsed = t('This field is required');
    }
    if (_.isEmpty(String(data.createDevices))) {
      errors.createDevices = t('This field is required');
    }
    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  submitHandler(event) {
    event.preventDefault(); // prevents reload of the page
    if (this.isValidCreate()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.submit(this.state.data);
    }
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  isValidCreate() {
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  render() {
    const { errors, data } = this.state;
    const { t } = this.props;
    return (
      <form className="ui form" onSubmit={this.submitHandler}>
        <div className="field">
          <Label>{t('Name')}</Label>
          <FormGroup>
            <Input
              type="text"
              name="name"
              onChange={this.onChange}
              placeholder={t('Name')}
              value={data.name}
              valid={!this.emptyErrors() && !errors.name}
              invalid={errors.name}
            />
            <FormFeedback>{errors.name}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>{t('USDOT Number')}</Label>
          <FormGroup>
            <Input
              type="number"
              name="usdotNumber"
              min={0}
              value={data.usdotNumber}
              onChange={this.onChange}
              placeholder={t('USDOT Number')}
              valid={!this.emptyErrors() && !errors.usdotNumber}
              invalid={errors.usdotNumber}
            />
            <FormFeedback>{errors.usdotNumber}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>{t('Multiday basis used')}</Label>
          <FormGroup>
            <Input
              type="select"
              name="multidayBasisUsed"
              value={data.multidayBasisUsed}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.multidayBasisUsed}
              invalid={errors.multidayBasisUsed}
            >
              <option value="7">7</option>
              <option value="8">8</option>
            </Input>
            <FormFeedback>{errors.multidayBasisUsed}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>{t('Allow creation of devices')}</Label>
          <FormGroup>
            <Input
              type="select"
              name="createDevices"
              value={data.createDevices}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.createDevices}
              invalid={errors.createDevices}
            >
              <option key={0} value={false}>{t('No')}</option>
              <option key={1} value={true}>{t('Yes')}</option>
            </Input>
            <FormFeedback>{errors.createDevices}</FormFeedback>
          </FormGroup>
        </div>
        <button className="ui button" type="submit">{t('Submit')}</button>
      </form>
    );
  }
}

MotorCarrierForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
};

export default translate('translations')(MotorCarrierForm);
