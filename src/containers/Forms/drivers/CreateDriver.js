import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import DriverFormView from '../templates/DriverFormView';

class CreateDriver extends React.Component {
  render() {
    return (
      <DriverFormView title="Create New Driver" isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(CreateDriver);
