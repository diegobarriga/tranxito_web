import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import TrailerFormView from '../templates/TrailerFormView';

class EditTrailer extends React.Component {
  render() {
    return (
      <TrailerFormView title="Edit Trailer" isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(EditTrailer);
