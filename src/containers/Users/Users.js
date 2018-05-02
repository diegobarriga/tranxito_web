import React from 'react';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import UsersInfo from './Users-info';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../assets/styles/forms.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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
          <UsersInfo motor_carrier_id={0} />
        </Container>
      </Aux>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Users);
