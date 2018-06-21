import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';
import MotorCarrierFormView from '../templates/MotorCarrierFormView';

class CreateMotorCarrier extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <MotorCarrierFormView title={t('Create MotorCarrier')} isCreate={true} />
    );
  }
}

CreateMotorCarrier.propTypes = {
  t: PropTypes.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const translateFunc = translate('translations')(CreateMotorCarrier);
export default connect(mapStateToProps)(translateFunc);
