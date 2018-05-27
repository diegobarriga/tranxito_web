import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import VehiclesInfo from './VehiclesInfo';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import Alert from '../Alert/Alert';

class Vehicles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '1',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }


  render() {
    const totalVehicles = Object.keys(this.props.vehicles).length;
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
        <h1> Vehicles </h1>
        <Container>
          <Row>
            <Col md="11">
              <VehiclesInfo pageNumber={this.state.currentPage} />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            { totalVehicles !== '0' &&
            <Col sm="12" md={{ size: 6, offset: 4 }}>
              <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={5}
                totalItemsCount={totalVehicles}
                pageRangeDisplayed={4}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </Col>}
          </Row>
        </Container>
      </Aux>

    );
  }
}

Vehicles.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  vehicles: PropTypes.object.isRequired,
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

export default connect(mapStateToProps)(Vehicles);
