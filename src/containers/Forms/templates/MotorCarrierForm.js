import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import validator from 'validator';
import { Label, FormGroup, FormFeedback, Input } from 'reactstrap';
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
        usdotNumber: '',
        multidayBasisUsed: '7',
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
            usdotNumber: response.data.usdotNumber,
            multidayBasisUsed: response.data.multidayBasisUsed,
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
    } else if (_.isEmpty(String(data.name.trim()))) {
      errors.name = "This field can't be blank";
    } else if (String(data.name.trim()).length > 120 || String(data.name.trim()).length < 4) {
      errors.name = 'Name must be between 4-120 characters long';
    }
    /* NEED FIX */
    if (_.isEmpty(String(data.usdotNumber))) {
      errors.usdotNumber = 'This field is required';
    } else if (Number(this.usdotNumber) < 0 || Number(this.usdotNumber) > 999999999) {
      errors.usdotNumber = 'USDOT number must be between 0-999,999,999';
    }
    if (_.isEmpty(String(data.multidayBasisUsed))) {
      errors.multidayBasisUsed = 'This field is required';
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
    const { errors, data } = this.state;
    return (
      <form className="ui form" onSubmit={this.submitHandler}>

        <div className="field">
          <Label>Name</Label>
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
        </div>
        <div className="field">
          <Label>USDOT Number</Label>
          <FormGroup>
            <Input
              type="number"
              name="usdotNumber"
              min={0}
              value={data.usdotNumber}
              onChange={this.onChange}
              placeholder="USDOT Number"
              valid={!this.emptyErrors() && !errors.usdotNumber}
              invalid={errors.usdotNumber}
            />
            <FormFeedback>{errors.usdotNumber}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>Multiday basis used</Label>
          <FormGroup>
            <Input
              type="select"
              name="multidayBasisUsed"
              value={data.multidayBasisUsed}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.multidayBasisUsed}
              invalid={errors.multidayBasisUsed}
            >
              <option value="7">7</option>
              <option value="8">8</option>
            </Input>
            <FormFeedback>{errors.multidayBasisUsed}</FormFeedback>
          </FormGroup>
        </div>

        <button className="ui button" type="submit">Submit</button>
      </form>
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
