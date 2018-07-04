import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import '../../../assets/styles/forms.css';
import DeviceFormView from '../templates/DeviceFormView';

class CreateDevice extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <DeviceFormView title={t('Create New Device')} isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

const translateFunc = translate('translations')(CreateDevice);
export default connect(mapStateToProps)(translateFunc);
