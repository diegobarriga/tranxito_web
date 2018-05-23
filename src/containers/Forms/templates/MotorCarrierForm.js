import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import validator from 'validator';
import { Button, Label, Form, FormGroup, FormFeedback, Input } from 'reactstrap';
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
        multiday_basis_used: '7',
      },
      isLoading: false,
      redirectTo: false,
    };
    // this.isValidCreate = this.isValidCreate.bind(this);
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
          console.log(response);
          const newData = {
            name: response.data.name,
            USDOT_number: response.data.USDOT_number,
            multiday_basis_used: response.data.multiday_basis_used,
          };
          this.setState({ ...this.state, data: newData });
        } else {
          console.log('Error loading mcinfo info');
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
    const errors = {};
    if (_.isEmpty(String(data.name))) {
      errors.name = 'This field is required';
    } else if (String(data.name).length > 120 || String(data.name).length < 4) {
      errors.name = 'Name must be between 4-120 characters long';
    }
    /* NEED FIX */
    if (_.isEmpty(String(data.USDOT_number))) {
      errors.USDOT_number = 'This field is required';
    } else if (Number(this.USDOT_number) < 0 || Number(this.USDOT_number) > 999999999) {
      errors.USDOT_number = 'USDOT number must be between 0-999,999,999';
    }
    if (_.isEmpty(String(data.multiday_basis_used))) {
      errors.multiday_basis_used = 'This field is required';
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
    const { errors, isLoading, data } = this.state;
    return (
      <Form onSubmit={this.submitHandler}>
        <FormGroup>
          <Label>Name</Label>
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
          <Label>USDOT Number</Label>
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
          <Label>Multiday basis used</Label>
          <Input
            type="select"
            name="multiday_basis_used"
            value={data.multiday_basis_used}
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.multiday_basis_used}
            invalid={errors.multiday_basis_used}
          >
            <option value="7">7</option>
            <option value="8">8</option>
          </Input>
          <FormFeedback>{errors.multiday_basis_used}</FormFeedback>
        </FormGroup>

        <Button type="submit" loading={isLoading}>Submit</Button>
      </Form>
    );
  }
}

MotorCarrierForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
};

export default MotorCarrierForm;
