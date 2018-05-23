import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
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
        CMV_power_unit_number: '',
        model: '',
        car_maker: '',
        plaque: '',
        state: '',
        IMEI_ELD: '',
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
            CMV_power_unit_number: response.data.CMV_power_unit_number,
            model: response.data.model,
            car_maker: response.data.car_maker,
            plaque: response.data.plaque,
            state: response.data.state,
            IMEI_ELD: response.data.IMEI_ELD,
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
    const errors = {};
    if (data.vin.length > 18 || data.vin.length < 17) {
      errors.vin = 'Must be 17 or 18 characters long';
    } else if (data.vin.length === 18 && String(data.vin)[0] !== '-') {
      errors.vin = 'Must start with a dash (-) if VIN is 18 char long';
    }
    if (_.isEmpty(String(data.CMV_power_unit_number))) {
      errors.CMV_power_unit_number = 'This field is required';
    } else if (data.IMEI_ELD && !data.CMV_power_unit_number) {
      errors.CMV_power_unit_number = 'CMV Power Unit Number field is required';
    }
    /* fede pls
    if (_.isEmpty(String(data.model))) {
      errors.model = 'This field is required';
    } else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Input is not a valid email';
    }
    */
    if (_.isEmpty(String(data.model))) {
      errors.model = 'This field is required';
    }
    if (_.isEmpty(String(data.IMEI_ELD))) {
      errors.IMEI_ELD = 'This field is required';
    }
    if (_.isEmpty(String(data.car_maker))) {
      errors.car_maker = 'This field is required';
    }
    if (_.isEmpty(String(data.plaque))) {
      errors.plaque = 'This field is required';
    }
    if (_.isEmpty(String(data.state))) {
      errors.state = 'This field is required';
    } else if (String(data.state).length !== 2) {
      errors.state = 'Not a valid state';
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
      isLoading,
      data,
    } = this.state;
    return (
      <Form onSubmit={this.submitHandler}>
        <FormGroup>
          <Input
            type="text"
            name="vin"
            placeholder="VIN Number"
            onChange={this.onChange}
            value={data.vin}
            valid={!this.emptyErrors() && !errors.vin}
            invalid={errors.vin}
          />
          <FormFeedback>{errors.vin}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="CMV_power_unit_number"
            placeholder="CMV Power Unit Number"
            value={data.CMV_power_unit_number}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.CMV_power_unit_number}
            invalid={errors.CMV_power_unit_number}
          />
          <FormFeedback>{errors.CMV_power_unit_number}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="model"
            placeholder="Vehicle Model"
            value={data.model}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.model}
            invalid={errors.model}
          />
          <FormFeedback>{errors.model}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="car_maker"
            placeholder="Car Maker"
            value={data.car_maker}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.car_maker}
            invalid={errors.car_maker}
          />
          <FormFeedback>{errors.car_maker}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="plaque"
            placeholder="Plaque"
            value={data.plaque}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.plaque}
            invalid={errors.plaque}
          />
          <FormFeedback>{errors.plaque}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="state"
            placeholder="State"
            value={data.state}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.state}
            invalid={errors.state}
          />
          <FormFeedback>{errors.state}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            min={0}
            name="IMEI_ELD"
            placeholder="IMEI ELD"
            value={data.IMEI_ELD}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.IMEI_ELD}
            invalid={errors.IMEI_ELD}
          />
          <FormFeedback>{errors.IMEI_ELD}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="image">Image</Label>
          <Input type="file" name="picture" className="center-item" onChange={this.onChange} />
        </FormGroup>
        <Button type="submit" loading={isLoading}>Submit</Button>
      </Form>
    );
  }
}

VehicleForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default VehicleForm;
