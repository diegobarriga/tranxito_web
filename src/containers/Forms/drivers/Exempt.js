import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';

const _ = require('lodash');

class Exempt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        exemptDriverConfiguration: props.user.exemptDriverConfiguration,
        comment: props.user.comment,
      },
      isLoading: false,
    };
    this.isValidData = this.isValidData.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onChange = this.onChange.bind(this);
    this.emptyErrors = this.emptyErrors.bind(this);
  }

  onChange(event) {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });
  }

  validateInput(data) {
    const errors = {};
    const { t } = this.props;
    if (_.isEmpty(String(data.exemptDriverConfiguration))) {
      errors.exemptDriverConfiguration = t('This field is required');
    }
    if (!data.comment || _.isEmpty(String(data.comment))) {
      errors.comment = 'This field is required';
    } else if (_.isEmpty(String(data.comment.trim()))) {
      errors.comment = t("This field can't be blank");
    } else if (String(data.comment).length > 60) {
      errors.comment = t('Must have ≤ 60 characters');
    }

    return {
      errors,
      isValid: _.isEmpty(errors),
    };
  }

  isValidData() {
    const { errors, isValid } = this.validateInput(this.state.data);
    if (!isValid) this.setState({ errors });
    return isValid;
  }

  async submitHandler(event) {
    event.preventDefault(); // prevents reload of the page
    if (this.isValidData()) {
      this.setState({ errors: {}, isLoading: true });
      // verify credentials
      try {
        await this.props.submit(this.state);
      } catch (error) {
        this.setState({ errors: error.response.data.errors, isLoading: false });
      }
    }
  }

  emptyErrors() {
    return Object.keys(this.state.errors).length === 0;
  }

  render() {
    const {
      errors,
      data,
    } = this.state;
    
    const { t } = this.props;
    return (
      <form className="ui form" onSubmit={this.submitHandler}>
        <div className="field">
          <Label>{t('Exempt driver configuration')}</Label>
          <FormGroup>
            <Input
              label="Exempt Driver Configuration"
              type="select"
              name="exemptDriverConfiguration"
              value={data.exemptDriverConfiguration}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.exemptDriverConfiguration}
              invalid={errors.exemptDriverConfiguration}
            >
              <option value="0">{t('No')}</option>
              <option value="E">{t('Yes')}</option>
            </Input>
            <FormFeedback>{errors.exemptDriverConfiguration}</FormFeedback>
          </FormGroup>
        </div>
        <div className="field">
          <Label>{t('Explanation for the configuration of exemption')}</Label>
          <FormGroup>
            <Input
              type="text"
              name="comment"
              placeholder={t('Annotation')}
              value={data.comment}
              onChange={this.onChange}
              valid={!this.emptyErrors() && !errors.comment}
              invalid={errors.comment}
            />
            <FormFeedback>{errors.comment}</FormFeedback>
          </FormGroup>
        </div>
        <button className="ui button" type="submit">{t('Submit')}</button>
      </form>
    );
  }
}

Exempt.propTypes = {
  user: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default translate('translations')(Exempt);
