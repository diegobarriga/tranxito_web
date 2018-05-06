import React from 'react';
import validator from 'validator';
import TemplateCSV from '../templates/template_csv';
import { Button, Checkbox, Form } from 'semantic-ui-react';
var _ = require('lodash');

class EditVehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        vin: this.props.data.vin,
        CMV_power_unit_number: this.props.data.CMV_power_unit_number,
        model: this.props.data.model,
        car_maker: this.props.data.car_maker,
        plaque: this.props.data.plaque,
        state: this.props.data.state,
        IMEI_EL: this.props.data.IMEI_EL,
      }
      isLoading: false,
      redirectTo: false
    };
    this.isValidEdit = this.isValidEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
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
    if (data.vin.length > 18 || data.vin.length < 17) {
      errors.vin = 'Must be 17 or 18 characters long';
    }
    else if (data.vin.length == 18 && String(data.vin)[0] !== '-') {
      errors.vin = "Must start with a dash (-) if VIN is 18 char long";
    }
    if (_.isEmpty(String(data.CMV_power_unit_number))) {
      errors.CMV_power_unit_number = 'This field is required';
    }
    else if (data.IMEI_ELD && !data.CMV_power_unit_number) {
      errors.CMV_power_unit_number = 'CMV Power Unit Number field is required';
    }
    if (_.isEmpty(String(data.model))) {
      errors.model = 'This field is required';
    }
    else if (!validator.isEmail(String(data.email))) {
      errors.email = 'Input is not a valid email';
    }
    if (_.isEmpty(String(data.car_maker))) {
      errors.car_maker = 'This field is required';
    }
    if (_.isEmpty(String(data.plaque))) {
      errors.plaque = 'This field is required';
    }
    if (_.isEmpty(String(data.state))) {
      errors.state = 'This field is required';
    }
    else if (String(data.state).length != 2)) {
      errors.state = 'Not a valid state';
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  isValidEdit(){
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  submitHandler(event){
    event.preventDefault(); // prevents reload of the page
    if (this.isValidEdit()) {
      this.setState({ errors: {}, isLoading: true});
      // verify credentials
      this.props.submit(this.state.data).catch(
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      );
    }
  }

  render() {
    const { errors, isLoading, redirectTo, data } = this.state;
    // Change redirect link
    if (redirectTo) {
      this.setState({redirectTo: false});
      return <Redirect to='/dashboard'/>;
    }
    return (
      <Form onSubmit={this.submitHandler}>
        <FormGroup>
          <Input
            type="text"
            name="vin"
            placeholder="VIN Number"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.vin}
            invalid={errors.vin}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="CMV_power_unit_number"
            value={data.CMV_power_unit_number}
            placeholder="CMV Power Unit Number"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.CMV_power_unit_number}
            invalid={errors.CMV_power_unit_number}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="model"
            placeholder="Vehicle Model"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.model}
            invalid={errors.model}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="car_maker"
            placeholder="Car Maker"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.car_maker}
            invalid={errors.car_maker}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="plaque"
            placeholder="Plaque"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.plaque}
            invalid={errors.plaque}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="state"
            placeholder="State"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.state}
            invalid={errors.state}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="IMEI_ELD"
            placeholder="IMEI ELD"
            min={0}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.IMEI_ELD}
            invalid={errors.IMEI_ELD}
          />
        </FormGroup>
        <Button type='submit' loading={isLoading}>Update</Button>
      </Form>
    );
  }
}


export default EditVehicleForm;
