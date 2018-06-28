import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import TrailerFormView from '../templates/TrailerFormView';

class CreateTrailer extends React.Component {
  render() {
    return (
      <TrailerFormView title="Create New Trailer" isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(CreateTrailer);
