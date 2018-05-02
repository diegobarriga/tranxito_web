import React from 'react';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import TrucksInfo from './Trucks-info';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styles from '../../assets/styles/forms.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

class Trucks extends React.Component {
  onDeleteBtnClick() {
  }

  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <Aux>
        { authRedirect }
        <h1> Vehicles </h1>
        <Container>
          <TrucksInfo motor_carrier_id={0} />
        </Container>
      </Aux>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Trucks);
