import React from 'react';
import { connect } from 'react-redux';
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
