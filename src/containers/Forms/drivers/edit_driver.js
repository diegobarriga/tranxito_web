import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import DriverForm from '../templates/driver_form';

class EditDriver extends React.Component {
  render() {
    return (
      <DriverForm title="Edit Driver" isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(EditDriver);
