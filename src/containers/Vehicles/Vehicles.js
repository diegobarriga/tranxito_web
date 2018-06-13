import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import VehiclesInfo from './VehiclesInfo';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import Alert from '../Alert/Alert';
import * as actions from '../../store/actions/index';

class Vehicles extends React.Component {
  componentDidMount() {
    const auxArray = this.props.location.pathname.split('/');
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    this.props.addBreadCrumb(newCrumb, false, crumbUrl);
  }

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
      msg = 'The vehicle was deleted successfully';
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = 'Error the vehicle was not deleted';
      alert = (<Alert alertType="FAIL" message={msg} />);
    }

    return (
      <Aux>
        { authRedirect }
        { alert }
        <Container>
          <Row>
            <Col md="11">
              <VehiclesInfo />
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}

Vehicles.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  error: PropTypes.object,
};

Vehicles.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  isAuthenticated: state.auth.token !== null,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vehicles));
