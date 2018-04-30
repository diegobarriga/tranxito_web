import React, {Component} from "react";
import PropTypes from "prop-types";
import {Form, FormGroup, HelpBlock, FormControl, Button, Checkbox, Alert} from 'react-bootstrap';

class ResetPasswordForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        token: this.props.token,
        password: "",
        passwordConfirmation: ""
      },
      showPassword: false,
      isLoading: false,
      errors: {}
    }
    this.onTogglePassword = this.onTogglePassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onTogglePassword() {
    this.setState({ showPassword: !this.state.showPassword });
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
        .resetPaswordSubmit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, isLoading: false })
        );
    }
  }

  validate(data) {
    const errors = {};
    if (!data.password) errors.password = "Can't be blank";
    if (data.password !== data.passwordConfirmation)
      errors.passwordConfirmation = "Passwords must match";
    return errors;
  };

  render() {
    const { errors, isLoading } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        {!!errors.global && <Alert bsStyle="danger">{errors.global}</Alert>}
        <FormGroup
          controlId="passwordResetInput"
        >
          <FormControl
            type={!this.state.showPassword ? "password" : "text"}
            name="password"
            placeholder="New Password"
            inputRef={c => this.password = c}
            onChange={this.onChange}
          />
          {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
        </FormGroup>
        <FormGroup
          controlId="passwordConfirmationResetInput"
        >
          <FormControl
            type={!this.state.showPassword ? "password" : "text"}
            name="passwordConfirmation"
            placeholder="Confirm new password"
            inputRef={c => this.passwordConfirmation = c}
            onChange={this.onChange}
          />
          {errors.passwordConfirmation && <HelpBlock>{errors.passwordConfirmation}</HelpBlock>}
          <Checkbox ref="modalCheckbox" onClick={this.onTogglePassword}>
            Show
          </Checkbox>
        </FormGroup>
        <Button
          className="btn btn-7"
          bsSize="lg"
          type="submit"
          disabled={isLoading}
        >
          Reset
        </Button>
      </Form>
    );
  }
}

ResetPasswordForm.propTypes = {
  resetPaswordSubmit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
