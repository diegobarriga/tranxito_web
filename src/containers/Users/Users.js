import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import UsersInfo from './Users-info';
import '../../assets/styles/forms.css';

class Users extends React.Component {
  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <Aux>
        { authRedirect }
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
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Users);
