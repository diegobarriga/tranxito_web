import React, { Component } from "react";
import PropTypes from "prop-types";
import { HelpBlock } from 'react-bootstrap';
import isEmail from "validator/lib/isEmail";


class ForgotPasswordForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: {
        email: ""
      },
      isLoading: false,
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ isLoading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, isLoading: false })
        );
    }
  };

  validate(data) {
    const errors = {};
    if (!data.email) errors.email = "This field is required";
    else if (!isEmail(String(data.email))) errors.email = "Invalid email";
    return errors;
  };

  render() {
    const { errors, isLoading } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        {!!errors.global && <Alert bsStyle="danger">{errors.global}</Alert>}
        <Form.Group
          controlId="username"
        >
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            inputRef={c => this.email = c}
            onChange={this.onChange}
          />
          {errors.email && <HelpBlock>{errors.email}</HelpBlock>}
        </Form.Group>
        <Button
          className="btn btn-7"
          bsSize="lg"
          type="submit"
          disabled={isLoading}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
