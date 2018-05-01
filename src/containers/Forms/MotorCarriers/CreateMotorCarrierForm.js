import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { Button, Form, Input } from 'semantic-ui-react';
var _ = require('lodash');


class CreateMotorCarrierForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        name: '',
        USDOT_number: '',
        multiday_basis_used: ''
      },
      isLoading: false,
      redirectTo: false
    }
    this.isValidCreate = this.isValidCreate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  validateInput(data) {
    let errors = {};
    if (_.isEmpty(String(data.name))) {
      errors.name = 'This field is required';
    }
    else if (String(data.name).length > 120 || String(data.name).length < 4) {
      errors.name = 'Name must be between 4-120 characters long';
    }
    if (_.isEmpty(String(data.USDOT_number))) {
      errors.USDOT_number = 'This field is required';
    }
    else if (!validator.isInt(String(this.USDOT_number), {min: 0, max: 999999999})) {
      errors.USDOT_number = 'USDOT number must be between 0-999,999,999';
    }
    if (_.isEmpty(String(data.multiday_basis_used))) {
      errors.multiday_basis_used = 'This field is required';
    }
    else if (!validator.isInt(String(this.multiday_basis_used), {min: 7, max: 8})) {
      errors.multiday_basis_used = 'Multiday basis used number must be 7 or 8';
    }
    return {
      errors,
      isValid: _.isEmpty(errors)
    }
  }

  submitHandler(event){
    event.preventDefault(); // prevents reload of the page
    if (this.isValidCreate()) {
      this.setState({ errors: {}, isLoading: true});
      this.props.submit(this.state.data);
      // .catch(
      //   (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
      // );
    }
  }

  isValidCreate(){
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
        <Form onSubmit={this.submitHandler}>
          <Form.Group>
            <Form.Input
              type="text"
              name="name"
              onChange={this.onChange}
              placeholder="Name"
              error={errors.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              type="number"
              name="USDOT_number"
              onChange={this.onChange}
              placeholder="USDOT Number"
              error={errors.USDOT_number}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
            type="text"
            name="multiday_basis_used"
            onChange={this.onChange}
            placeholder="Multiday basis used"
            error={errors.multiday_basis_used}
            />
          </Form.Group>
          <Button type="submit" loading={isLoading}>Submit</Button>
        </Form>
    );
  }
}

CreateMotorCarrierForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default CreateMotorCarrierForm;
