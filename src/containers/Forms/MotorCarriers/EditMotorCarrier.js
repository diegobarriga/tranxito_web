import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import MotorCarrierFormView from '../templates/MotorCarrierFormView';

class EditMotorCarrier extends React.Component {
  render() {
    return (
      <MotorCarrierFormView title="Edit Motor Carrier" isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(EditMotorCarrier);
