import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';

import VehicleForm from '../templates/vehicle_form';

class EditVehicle extends React.Component {
  render() {
    return (
      <VehicleForm title="Edit Vehicle" isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(EditVehicle);
