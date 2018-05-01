import React from 'react';
import { connect } from 'react-redux';
import { Label, Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import axios, { post } from 'axios';
import TemplateCSV from '../templates/template_csv';
import '../../../assets/styles/forms.css';
import DriverForm from '../templates/driver_form';

class CreateDriver extends React.Component {
  render() {
    return (
      <DriverForm title="Create New Driver" isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(CreateDriver);
