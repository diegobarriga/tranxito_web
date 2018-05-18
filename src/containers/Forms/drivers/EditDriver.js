import React from 'react';
import { connect } from 'react-redux';
import '../../../assets/styles/forms.css';
import DriverFormView from '../templates/DriverFormView';

class EditDriver extends React.Component {
  render() {
    return (
      <DriverFormView title="Edit Driver" isCreate={false} />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(EditDriver);
