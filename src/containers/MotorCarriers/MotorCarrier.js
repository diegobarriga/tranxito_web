import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../assets/styles/forms.css';
import Aux from '../../hoc/Aux';
import Loader from '../../components/Loader/Loader';


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

    if (this.props.loading === true) return <Loader />;

    return (
      <Aux>
        { authRedirect }
        <h1> {this.props.mCarrierName} </h1>
        <div className="buttons">
          <Link className="btn btn-sm green spacing" to="/drivers/new_driver"><FontAwesomeIcon icon="user" color="white" /> Create Supervisor</Link>
        </div>
        <Link className="btn btn-sm green spacing" to="/dashboard"> Go to dashboard</Link>
        <Link className="btn btn-sm green spacing" to="/drivers"> Go to drivers</Link>
        <Link className="btn btn-sm green spacing" to="/vehicles"> Go to vehicles</Link>
      </Aux>

    );
  }
}

MotorCarrier.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  mCarrierName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  loading: state.auth.loading,
  mCarrierName: state.auth.mcName,
});

export default connect(mapStateToProps)(MotorCarrier);
