import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';
import DeviceFormView from '../templates/DeviceFormView';

class EditDevice extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <DeviceFormView title={t('Edit Device')} isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});
const translateFunc = translate('translations')(EditDevice);
export default connect(mapStateToProps)(translateFunc);
