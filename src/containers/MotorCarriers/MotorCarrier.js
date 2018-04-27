import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../assets/styles/forms.css';
import Aux from '../../hoc/Aux';


class MotorCarrier extends React.Component {
  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (!this.props.isAdmin) {
        authRedirect = <Redirect to="/dashboard" />;
      }
    } else {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <Aux>
        { authRedirect }
        <h1> MotorCarrier </h1>
        <div className="buttons">
          <Link className="btn btn-sm green spacing" to="/drivers/new_driver"><FontAwesomeIcon icon="user" color="white" /> Create Supervisor</Link>
        </div>
      </Aux>

    );
  }
}

MotorCarrier.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
});

export default connect(mapStateToProps)(MotorCarrier);
