import React, {Component} from "react";
import PropTypes from "prop-types";
import { Button, Form, FormGroup, FormFeedback, Input} from 'reactstrap';

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
    this.validateInput = this.validateInput.bind(this);
    this.emptyErrors = this.emptyErrors.bind(this);
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
    const errors = this.validateInput(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ isLoading: true });
      this.props
        .resetPaswordSubmit(this.state.data)
        // .catch(err =>
        //   this.setState({ errors: err.response.data.errors, isLoading: false })
        // );
    }
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  validateInput(data) {
    const errors = {};
    if (!data.password) errors.password = "This field can't be blank";
    if (!data.passwordConfirmation) errors.passwordConfirmation = "This field can't be blank";
    else if (data.password !== data.passwordConfirmation)
      errors.passwordConfirmation = "Passwords must match";
    return errors;
  };

  render() {
    const { errors, isLoading, showPassword} = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup
          controlId="passwordResetInput"
        >
          <Input
            type={!showPassword ? "password" : "text"}
            name="password"
            placeholder="New Password"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.password}
            invalid={errors.password}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </FormGroup>
        <FormGroup
          controlId="passwordConfirmationResetInput"
        >
          <Input
            type={!showPassword ? "password" : "text"}
            name="passwordConfirmation"
            placeholder="Confirm new password"
            onChange={this.onChange}
            valid={!this.emptyErrors() && !errors.passwordConfirmation}
            invalid={errors.passwordConfirmation}
          />
          <FormFeedback>{errors.passwordConfirmation}</FormFeedback>
          <Checkbox ref="modalCheckbox" onClick={this.onTogglePassword}>
            Show
          </Checkbox>
        </FormGroup>
        <Button
          type="submit"
          loading={isLoading}
        >
          Reset Password
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
