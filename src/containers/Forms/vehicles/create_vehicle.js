import React from 'react';
import { connect } from 'react-redux';
import { Label, Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import axios, { post } from 'axios';
import TemplateCSV from '../templates/template_csv';
import '../../../assets/styles/forms.css';
import VehicleForm from '../templates/vehicle_form';

class CreateVehicle extends React.Component {
  render() {
    return (
      <VehicleForm title="Create New Vehicle" isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(CreateVehicle);
