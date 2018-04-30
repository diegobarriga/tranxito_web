import React from 'react';
import axios, { post } from 'axios';
import TemplateCSV from '../templates/template_csv';
import styles from '../../../assets/styles/forms.css';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';

class CreateVehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        vin: '',
        CMV_power_unit_number: '',
        model: '',
        car_maker: '',
        plaque: '',
        state: '',
        IMEI_EL: '',
      }

    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.postData = this.postData.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.postData(this.state.data).then((response) => {
      console.log(response.data);
      console.log(response.status);
      if (response.status === 201) {
        this.setState({ type: 'success', message: 'We have created all the new vehicles. You will be able to see them shortly in the application.' });
      } else {
        this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      }
    });
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
    if (_.isEmpty(String(data.firstName))) {
      errors.firstName = 'This field is required';
    }
    
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  render() {
    if (this.state.type && this.state.message) {
      const classString = `alert alert-${this.state.type}`;
      var status = (<div id="status" className={classString} ref="status">
        {this.state.message}
      </div>);
    }

    return (
      <Form onSubmit={this.onFormSubmit}>
        <FormGroup>
          <Input type="string" name="vin" placeholder="VIN Number" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Input type="string" name="CMV_power_unit_number" placeholder="CMV Power Unit Number" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Input type="string" name="model" placeholder="Vehicle Model" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Input type="string" name="car_maker" placeholder="Car Maker" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Input type="string" name="plaque" placeholder="Plaque" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Input type="string" name="state" placeholder="State" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Input type="number" name="IMEI_ELD" placeholder="IMEI ELD" onChange={this.onChange} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}


export default CreateVehicleForm;
