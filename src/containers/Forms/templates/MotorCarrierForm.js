import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Button, Form, FormGroup, FormFeedback, Input } from 'reactstrap';
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
        USDOT_number: '',
        multiday_basis_used: '',
      },
      isLoading: false,
      redirectTo: false,
    };
    this.isValidCreate = this.isValidCreate.bind(this);
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
            USDOT_number: response.data.USDOT_number,
            multiday_basis_used: response.data.multiday_basis_used,
          };
          this.setState({ data: newData });
        } else {
          console.log('Error loading motor carrier info');
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

  validateInput(data) {
    const errors = {};
    if (_.isEmpty(String(data.name))) {
      errors.name = 'This field is required';
    } else if (String(data.name).length > 120 || String(data.name).length < 4) {
      errors.name = 'Name must be between 4-120 characters long';
    }
    if (_.isEmpty(String(data.USDOT_number))) {
      errors.USDOT_number = 'This field is required';
    } else if (!validator.isInt(String(this.USDOT_number), { min: 0, max: 999999999 })) {
      errors.USDOT_number = 'USDOT number must be between 0-999,999,999';
    }
    if (_.isEmpty(String(data.multiday_basis_used))) {
      errors.multiday_basis_used = 'This field is required';
    } else if (!validator.isInt(String(this.multiday_basis_used), { min: 7, max: 8 })) {
      errors.multiday_basis_used = 'Multiday basis used number must be 7 or 8';
    }
    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  submitHandler(event) {
    event.preventDefault(); // prevents reload of the page
    if (this.isValidData()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.submit(this.state.data);
    }
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  getMotorCarrierInfo() {
    return api.motorCarriers.getMotorCarrier(this.props.match.params.id);
  }

  isValidData() {
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  render() {
    const { errors, isLoading, data } = this.state;
    return (
      <Form onSubmit={this.submitHandler}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            placeholder="Name"
            value={data.name}
            valid={!this.emptyErrors() && !errors.name}
            invalid={errors.name}
          />
          <FormFeedback>{errors.Numberame}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="USDOT_number"
            min={0}
            value={data.USDOT_number}
            onChange={this.onChange}
            placeholder="USDOT Number"
            valid={!this.emptyErrors() && !errors.USDOT_number}
            invalid={errors.USDOT_number}
          />
          <FormFeedback>{errors.USDOT_number}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="multiday_basis_used"
            value={data.multiday_basis_used}
            onChange={this.onChange}
            placeholder="Multiday basis used"
            valid={!this.emptyErrors() && !errors.multiday_basis_used}
            invalid={errors.multiday_basis_used}
          />
          <FormFeedback>{errors.multiday_basis_used}</FormFeedback>
        </FormGroup>
        <Button type="submit" loading={isLoading}>Submit</Button>
      </Form>
    );
  }
}

MotorCarrierForm.propTypes = {
  isCreate: PropTypes.bool.isRequired,
  submit: PropTypes.func.isRequired,
  match: PropTypes.func.isRequired,
};

export default MotorCarrierForm;
