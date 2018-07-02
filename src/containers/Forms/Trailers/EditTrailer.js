import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import '../../../assets/styles/forms.css';
import TrailerFormView from '../templates/TrailerFormView';

class EditTrailer extends React.Component {
  render() {
    const { t } = this.props; // eslint-disable-line no-use-before-define
    return (
      <TrailerFormView title={t('Edit Trailer')} isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});


const translateFunc = translate('translations')(EditTrailer);
export default withRouter(connect(mapStateToProps)(translateFunc));
