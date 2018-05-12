import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import UsersInfo from './Users-info';
import '../../assets/styles/forms.css';
import Alert from '../Alert/Alert';

class Users extends React.Component {
  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    /* Alert */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = 'The driver was deleted successfully';
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = 'Error the driver was not deleted';
      alert = (<Alert alertType="FAIL" message={msg} />);
    }

    return (
      <Aux>
        { authRedirect }
        { alert }
        <h1> Drivers </h1>
        <Container>
          <UsersInfo />
        </Container>
      </Aux>

    );
  }
}
Users.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

Users.defaultProps = {
  error: null,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  error: state.users.error,
});

export default connect(mapStateToProps)(Users);
