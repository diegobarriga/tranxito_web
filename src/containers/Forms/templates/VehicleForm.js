import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';

const _ = require('lodash');

class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        vin: '',
        CmvPowerUnitNumber: '',
        model: '',
        carMaker: '',
        plaque: '',
        state: '',
        imeiEld: '',
      },
      picture: '',
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
      this.getVehicleInfo().then((response) => {
        if (response.status === 200) {
          const newData = {
            vin: response.data.vin,
            CmvPowerUnitNumber: response.data.CmvPowerUnitNumber,
            model: response.data.model,
            carMaker: response.data.carMaker,
            plaque: response.data.plaque,
            state: response.data.state,
            imeiEld: response.data.imeiEld,
            image: response.data.image,
          };
          this.setState({ data: newData });
        } else {
          console.log('Error loading vehicle info');
        }
      });
    }
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

  getVehicleInfo() {
    return api.vehicles.getVehicle(this.props.match.params.id, this.props.token);
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
    if (data.vin.trim().length > 18 || data.vin.trim().length < 17) {
      errors.vin = t('Must be 17 or 18 characters long');
    } else if (data.vin.trim().length === 18 && String(data.vin.trim())[0] !== '-') {
      errors.vin = t('Must start with a dash (-) if VIN is 18 char long');
    }
    if (_.isEmpty(String(data.CmvPowerUnitNumber))) {
      errors.CmvPowerUnitNumber = t('This field is required');
    } else if (_.isEmpty(String(data.CmvPowerUnitNumber.trim()))) {
      errors.CmvPowerUnitNumber = t("This field can't be blank");
    } else if (data.imeiEld && !data.CmvPowerUnitNumber) {
      errors.CmvPowerUnitNumber = t('This field is required');
    }
    /* fede pls
    if (_.isEmpty(String(data.model))) {
      errors.model = 'This field is required';
    } else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Input is not a valid email';
    }
    */
    if (_.isEmpty(String(data.model))) {
      errors.model = t('This field is required');
    } else if (_.isEmpty(String(data.model.trim()))) {
      errors.model = t("This field can't be blank");
    }
    if (_.isEmpty(String(data.imeiEld))) {
      errors.imeiEld = t('This field is required');
    }
    if (_.isEmpty(String(data.carMaker))) {
      errors.carMaker = t('This field is required');
    } else if (_.isEmpty(String(data.carMaker.trim()))) {
      errors.carMaker = t("This field can't be blank");
    }
    if (_.isEmpty(String(data.plaque))) {
      errors.plaque = t('This field is required');
    } else if (_.isEmpty(String(data.plaque.trim()))) {
      errors.plaque = t("This field can't be blank");
    }
    if (_.isEmpty(String(data.state))) {
      errors.state = t('This field is required');
    } else if (_.isEmpty(String(data.state.trim()))) {
      errors.state = t("This field can't be blank");
    } else if (String(data.state.trim()).length !== 2) {
      errors.state = t('Not a valid state');
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
    event.preventDefault(); // prevents reload of the page
    if (this.isValidData()) {
      this.setState({ errors: {}, isLoading: true });
      // verify credentials
      console.log('submited');
      try {
        console.log(this.state);
        await this.props.submit(this.state);
      } catch (error) {
        this.setState({ errors: error.response.data.errors, isLoading: false });
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
          <Label>{t('VIN number')}</Label>
          <FormGroup>
            <Input
              type="text"
              name="vin"
              placeholder={t('VIN number')}
              onChange={this.onChange}
              value={data.vin}
              valid={!this.emptyErrors() && !errors.vin}
              invalid={errors.vin}
            />
            <FormFeedback>{errors.vin}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>{t('CMV Power Unit Number')}</Label>
          <FormGroup>
            <Input
              type="text"
              name="CmvPowerUnitNumber"
              placeholder={t('CMV Power Unit Number')}
              value={data.CmvPowerUnitNumber}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.CmvPowerUnitNumber}
              invalid={errors.CmvPowerUnitNumber}
            />
            <FormFeedback>{errors.CmvPowerUnitNumber}</FormFeedback>
          </FormGroup>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('Vehicle Model')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="model"
                placeholder={t('Vehicle Model')}
                value={data.model}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.model}
                invalid={errors.model}
              />
              <FormFeedback>{errors.model}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>{t('Car Maker')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="carMaker"
                placeholder={t('Car Maker')}
                value={data.carMaker}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.carMaker}
                invalid={errors.carMaker}
              />
              <FormFeedback>{errors.carMaker}</FormFeedback>
            </FormGroup>
          </div>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('Plaque')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="plaque"
                placeholder={t('Plaque')}
                value={data.plaque}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.plaque}
                invalid={errors.plaque}
              />
              <FormFeedback>{errors.plaque}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>{t('State')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="state"
                placeholder={t('State')}
                value={data.state}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.state}
                invalid={errors.state}
              />
              <FormFeedback>{errors.state}</FormFeedback>
            </FormGroup>
          </div>
        </div>
        <div className="field">
          <Label>IMEI ELD</Label>
          <FormGroup>
            <Input
              type="number"
              min={0}
              name="imeiEld"
              placeholder="IMEI ELD"
              value={data.imeiEld}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.imeiEld}
              invalid={errors.imeiEld}
            />
            <FormFeedback>{errors.imeiEld}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label for="image">{t('Image')}</Label>
          <FormGroup>
            <Input type="file" name="picture" className="center-item" onChange={this.onChange} />
          </FormGroup>
        </div>
        <button className="ui button" type="submit">{t('Submit')}</button>
      </form>
    );
  }
}

VehicleForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default translate('translations')(VehicleForm);
