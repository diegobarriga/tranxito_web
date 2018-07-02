import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import '../../../assets/styles/forms.css';
import TrailerFormView from '../templates/TrailerFormView';


class CreateTrailer extends React.Component {
  render() {
    const { t } = this.props; // eslint-disable-line no-use-before-define

    return (
      <TrailerFormView title={t('Create New Trailer')} isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});


const translateFunc = translate('translations')(CreateTrailer);
export default withRouter(connect(mapStateToProps)(translateFunc));
