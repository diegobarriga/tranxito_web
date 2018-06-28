import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { translate } from 'react-i18next';
import validator from 'validator';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';

const _ = require('lodash');

const now = new Date();
const thisYear = now.getUTCFullYear();

class TrailerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        vin: '',
        manufacturer: '',
        model: '',
        number: '',
        year: null,
        gvw: null,
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
      this.getTrailerInfo().then((response) => {
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
          console.log('Error loading Trailer info');
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

  getTrailerInfo() {
    return api.trailers.getTrailer(this.props.match.params.id, this.props.token);
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

    if (_.isEmpty(String(data.manufacturer))) {
      errors.manufacturer = t('This field is required');
    } else if (_.isEmpty(String(data.manufacturer.trim()))) {
      errors.manufacturer = t("This field can't be blank");
    }

    if (_.isEmpty(String(data.number))) {
      errors.number = t('This field is required');
    } else if (_.isEmpty(String(data.number.trim()))) {
      errors.number = t("This field can't be blank");
    } else if (this.number.trim().length > 10) {
      errors.number = t('Must be between 0-10 characters long');
    }

    if (_.isEmpty(String(data.model))) {
      errors.model = t('This field is required');
    } else if (_.isEmpty(String(data.model.trim()))) {
      errors.model = t("This field can't be blank");
    }

    if (_.isEmpty(String(data.year))) {
      errors.year = t('This field is required');
    } else if (!validator.isInt(String(this.year, { min: 1900, max: thisYear + 1 }))) {
      errors.year = t('Invalid trailer year');
    }

    if (_.isEmpty(String(data.gvw))) {
      errors.gvw = t('This field is required');
    } else if (!validator.isInt(String(this.gvw), { min: 0 })) {
      errors.gvw = t("GVW value can't be less than 0");
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
          <Label>{t('Trailer Number')}</Label>
          <FormGroup>
            <Input
              type="text"
              name="number"
              placeholder={t('Trailer Number')}
              value={data.number}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.number}
              invalid={errors.number}
            />
            <FormFeedback>{errors.number}</FormFeedback>
          </FormGroup>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('Trailer Model')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="model"
                placeholder={t('Trailer Model')}
                value={data.model}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.model}
                invalid={errors.model}
              />
              <FormFeedback>{errors.model}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>{t('Trailer Manufacturer')}</Label>
            <FormGroup>
              <Input
                type="text"
                name="manufacturer"
                placeholder={t('Manufacturer')}
                value={data.manufacturer}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.manufacturer}
                invalid={errors.manufacturer}
              />
              <FormFeedback>{errors.manufacturer}</FormFeedback>
            </FormGroup>
          </div>
        </div>

        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('Year')}</Label>
            <FormGroup>
              <Input
                type="number"
                min={1900}
                max={thisYear + 1}
                name="year"
                placeholder={t('Year')}
                value={data.year || thisYear}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.year}
                invalid={errors.year}
              />
              <FormFeedback>{errors.plaque}</FormFeedback>
            </FormGroup>
          </div>
        </div>
        <div className="field">
          <Label>{t('Gross vehicle weight')}</Label>
          <FormGroup>
            <Input
              type="number"
              min={0}
              name="gvw"
              placeholder="Gross vehicle weight"
              value={data.gvw}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.gvw}
              invalid={errors.gvw}
            />
            <FormFeedback>{errors.gvw}</FormFeedback>
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

TrailerForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default translate('translations')(TrailerForm);
