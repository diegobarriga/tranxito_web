import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import VehicleFormView from '../templates/VehicleFormView';

class CreateVehicle extends React.Component {
  render() {
    return (
      <VehicleFormView title="Create New Vehicle" isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(CreateVehicle);
