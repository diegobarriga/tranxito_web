import React from 'react';
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

const mapStateToProps = state => ({
  token: state.auth.token,

});
const translateFunc = translate('translations')(EditDriver);
export default connect(mapStateToProps)(translateFunc);
