import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import '../../../assets/styles/forms.css';
import MotorCarrierFormView from '../templates/MotorCarrierFormView';

class EditMotorCarrier extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <MotorCarrierFormView title={t('Edit MotorCarrier')} isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

EditMotorCarrier.propTypes = {
  t: PropTypes.isRequired,
};

const translateFunc = translate('translations')(EditMotorCarrier);
export default connect(mapStateToProps)(translateFunc);
