import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';
import DeviceScriptFormView from '../templates/DeviceScriptFormView';

class EditDevice extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <DeviceScriptFormView title={t('Configure Device')} isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});
const translateFunc = translate('translations')(EditDevice);
export default connect(mapStateToProps)(translateFunc);
