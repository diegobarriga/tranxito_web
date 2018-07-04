import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';

const _ = require('lodash');

class DeviceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        bluetoothMac: '',
        imei: '',
        configScript: '',
        configStatus: false,
        state: true,
        sequenceId: 0,
      },
      isLoading: false,
      redirectTo: false,
    };
    this.validateInput = this.validateInput.bind(this);
    this.isValidData = this.isValidData.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.emptyErrors = this.emptyErrors.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    // Si estamos editando el documento cargamos los datos del usuario para completar el form
    if (!this.props.isCreate) {
      this.getDeviceInfo().then((response) => {
        if (response.status === 200) {
          const newData = {
            bluetoothMac: response.data.bluetoothMac,
            imei: response.data.imei,
            state: response.data.state,
            configScript: response.data.configScript,
            configStatus: response.data.configStatus,
          };
          this.setState({ data: newData });
        } else {
          console.log('Error loading device info');
        }
      });
    }
  }

  onChange(event) {
    console.log('onChange');
    console.log(this.state);
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
  }

  getDeviceInfo() {
    console.log('GET DEVICE INFO');
    return api.motorCarriers.getMotorCarrierDevice(
      this.props.motorCarrierId,
      this.props.match.params.id,
      this.props.token,
    );
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

    if (_.isEmpty(String(data.bluetoothMac))) {
      errors.bluetoothMac = t('This field is required');
    } else if (_.isEmpty(String(data.bluetoothMac.trim()))) {
      errors.bluetoothMac = t("This field can't be blank");
    }
    if (_.isEmpty(String(data.imei))) {
      errors.imei = t('This field is required');
      console.log(errors.imei);
    } else if (_.isEmpty(String(data.imei.trim()))) {
      errors.imei = t("This field can't be blank");
    }
    if (_.isEmpty(String(data.configScript))) {
      errors.configScript = t('This field is required');
    } else if (_.isEmpty(String(data.configScript.trim()))) {
      errors.configScript = t("This field can't be blank");
    }

    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  async submitHandler(event) {
    console.log('submitHandler');
    event.preventDefault(); // prevents reload of the page
    console.log(this.isValidData());
    if (this.isValidData()) {
      this.setState({ errors: {}, isLoading: true });
      // verify credentials
      console.log('submited');
      console.log(this.state);
      try {
        console.log(this.props.submit(this.state));
        await this.props.submit(this.state);
      } catch (error) {
        console.log(error);
        this.setState({ errors: error, isLoading: false });
      }
    }
  }

  render() {
    const {
      errors,
      data,
    } = this.state;
    const { t } = this.props;
    return (
      <form className="ui form" onSubmit={this.submitHandler}>
        <div className="field">
          <Label>{t('Bluetooth Mac')}</Label>
          <FormGroup>
            <Input
              type="text"
              name="bluetoothMac"
              placeholder={t('Bluetooth Mac')}
              onChange={this.onChange}
              value={data.bluetoothMac}
              valid={!this.emptyErrors() && !errors.bluetoothMac}
              invalid={errors.bluetoothMac}
            />
            <FormFeedback>{errors.bluetoothMac}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>{t('IMEI')}</Label>
          <FormGroup>
            <Input
              type="text"
              name="imei"
              placeholder={t('IMEI')}
              value={data.imei}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.imei}
              invalid={errors.imei}
            />
            <FormFeedback>{errors.imei}</FormFeedback>
          </FormGroup>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('Configuration Script')}</Label>
            <FormGroup>
              <Input
                type="textarea"
                name="configScript"
                placeholder={t('Configuration Script')}
                value={data.configScript}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.configScript}
                invalid={errors.configScript}
              />
              <FormFeedback>{errors.configScript}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>{t('Configuration Status')}</Label>
            <FormGroup>
              <select
                name="configStatus"
                value={data.configStatus}
                onChange={this.onChange}
              >
                <option value={false}>No</option>
                <option value={true}>{t('Yes')}</option>
              </select>

              <FormFeedback>{errors.configStatus}</FormFeedback>
            </FormGroup>
          </div>
        </div>
        <button className="ui button" type="submit">{t('Submit')}</button>
      </form>
    );
  }
}

DeviceForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

const translateFunc = translate('translations')(DeviceForm);
export default connect(mapStateToProps)(translateFunc);
