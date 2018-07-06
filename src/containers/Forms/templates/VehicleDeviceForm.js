import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';

const _ = require('lodash');

class VehicleDeviceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        deviceId: 0,
      },
      isLoading: false,
    };
    this.validateInput = this.validateInput.bind(this);
    this.isValidData = this.isValidData.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.emptyErrors = this.emptyErrors.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
  }

  isValidData() {
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  // TODO Complete with defined validations
  // https://docs.google.com/document/d/1xpVsXXotppyoR2_pqqleRZp6-cvYGC78tZzaVFZrVcA/edit
  validateInput(data) {
    const { t } = this.props;
    const errors = {};

    if (_.isEmpty(String(data.deviceId))) {
      errors.deviceId = t('This field is required');
    } else if (_.isEmpty(String(data.deviceId.trim()))) {
      errors.deviceId = t("This field can't be blank");
    }

    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  submitHandler(event) {
    event.preventDefault(); // prevents reload of the page
    if (this.isValidData()) {
      this.setState({ errors: {}, isLoading: true });
      
      try {
        this.props.submit(this.state.data);
      } catch (error) {
        this.setState({ errors: error, isLoading: false });
      }
    }
  }

  render() {
    const { errors } = this.state;
    const { t, devices } = this.props;

    const unlinkedDevices = Object.values(devices).filter(device => device.vehicleId !== null);

    return (
      <Form onSubmit={this.submitHandler}>
        <div className="field">
          <Label>{t('Devices')}</Label>
          <FormGroup>
            <Input
              type="select"
              name="deviceId"
              placeholder={t('Link device')}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.deviceId}
              invalid={errors.deviceId}
            >
              <option value="">Select Device</option>
              {unlinkedDevices.length > 0 ? (
                unlinkedDevices.map(dev => (
                  <option value={dev.id}>
                    IMEI: {dev.imei}
                  </option>
                  ))
              ) : ''}
            </Input>
            <FormFeedback>{errors.deviceId}</FormFeedback>
          </FormGroup>
        </div>
        <Button type="submit">{t('Submit')}</Button>
      </Form>
    );
  }
}

VehicleDeviceForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  devices: state.auth.devices,
  motorCarrierId: state.auth.motorCarrierId,
});

const translateFunc = translate('translations')(VehicleDeviceForm);
export default connect(mapStateToProps)(translateFunc);
