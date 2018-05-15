import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import MotorCarrierFormView from '../templates/MotorCarrierFormView';

class CreateMotorCarrier extends React.Component {
  render() {
    return (
      <MotorCarrierFormView title="Create New Motor Carrier" isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(CreateMotorCarrier);
