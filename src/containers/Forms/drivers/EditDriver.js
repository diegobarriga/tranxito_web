import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';
import DriverFormView from '../templates/DriverFormView';

class EditDriver extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <DriverFormView title={t('Edit Driver')} isCreate={false} />
    );
  }
}

EditDriver.propTypes = {
  t: PropTypes.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,

});
const translateFunc = translate('translations')(EditDriver);
export default connect(mapStateToProps)(translateFunc);
