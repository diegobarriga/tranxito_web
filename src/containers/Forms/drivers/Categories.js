import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';

const _ = require('lodash');

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data: {
        moveYardsUse: props.user.moveYardsUse,
        personalUse: props.user.personalUse,
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
    if (_.isEmpty(String(data.personalUse))) {
      errors.personalUse = t('This field is required');
    }
    if (_.isEmpty(String(data.moveYardsUse))) {
      errors.moveYardsUse = t('This field is required');
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
      console.log('sneding-----', this.state);
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
    console.log('data----', data);
    const { t } = this.props;
    return (
      <form className="ui form" onSubmit={this.submitHandler}>
        <div className="unstackable two fields">
          <div className="field">
            <Label>{t('Move Yards Use')}</Label>
            <FormGroup>
              <Input
                type="select"
                name="moveYardsUse"
                value={data.moveYardsUse}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.moveYardsUse}
                invalid={errors.moveYardsUse}
              >
                <option key={0} value={false}>{t('No')}</option>
                <option key={1} value={true}>{t('Yes')}</option>
              </Input>
              <FormFeedback>{errors.moveYardsUse}</FormFeedback>
            </FormGroup>
          </div>
          <div className="field">
            <Label>{t('Personal Use')}</Label>
            <FormGroup>
              <Input
                type="select"
                name="personalUse"
                value={data.personalUse}
                onChange={this.onChange}
                valid={!this.emptyErrors() && !errors.personalUse}
                invalid={errors.personalUse}
              >
                <option key={0} value={false}>{t('No')}</option>
                <option key={1} value={true}>{t('Yes')}</option>
              </Input>
              <FormFeedback>{errors.personalUse}</FormFeedback>
            </FormGroup>
          </div>
        </div>
        <button className="ui button" type="submit">{t('Submit')}</button>
      </form>
    );
  }
}

Categories.propTypes = {
  user: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

export default translate('translations')(Categories);
