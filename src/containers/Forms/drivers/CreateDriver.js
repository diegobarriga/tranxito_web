import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';
import DriverFormView from '../templates/DriverFormView';

class CreateDriver extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <DriverFormView title={t('Create New Driver')} isCreate={true} />
    );
  }
}

CreateDriver.propTypes = {
  t: PropTypes.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});

const translateFunc = translate('translations')(CreateDriver);
export default connect(mapStateToProps)(translateFunc);
