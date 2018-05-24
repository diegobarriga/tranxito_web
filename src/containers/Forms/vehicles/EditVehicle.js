import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import VehicleFormView from '../templates/VehicleFormView';

class EditVehicle extends React.Component {
  render() {
    return (
      <VehicleFormView title="Edit Vehicle" isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(EditVehicle);
