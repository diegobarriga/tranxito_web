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
        <h1> Trucks </h1>
        <div className="buttons">
          <Link className="btn btn-sm green spacing" to="/vehicles/new_vehicle"><FontAwesomeIcon icon="car" color="white" /> Create vehicle</Link>
          <Link className="btn btn-sm green" to="/vehicles/new_vehicles"><FontAwesomeIcon icon="car" color="white" /><FontAwesomeIcon icon="car" color="white" /> Create multiple vehicles</Link>
        </div>
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
