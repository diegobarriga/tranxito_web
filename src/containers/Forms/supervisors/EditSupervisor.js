import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import SignupView from '../Sessions/Signup/SignupView';

class EditSupervisor extends React.Component {
  render() {
    return (
      <SignupView title="Edit Supervisor" isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default connect(mapStateToProps)(EditSupervisor);
