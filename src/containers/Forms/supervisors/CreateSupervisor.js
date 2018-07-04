import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import SignupView from '../Sessions/Signup/SignupView';

class CreateSupervisor extends React.Component {
  render() {
    return (
      <SignupView title="Create Supervisor" isCreate={true} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(CreateSupervisor);
