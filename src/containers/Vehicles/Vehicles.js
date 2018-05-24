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
      currentPage: '0',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber - 1 });
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
        <h1> Vehicles </h1>
        <Container>
          <Row>
            <Col md="11">
              <VehiclesInfo vehicles={this.props.vehicles[this.state.currentPage]} />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col sm="12" md={{ size: 6, offset: 4 }}>
              <Pagination
                activePage={this.state.currentPage + 1}
                itemsCountPerPage={5}
                totalItemsCount={12}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}

Vehicles.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  vehicles: PropTypes.array.isRequired,
  error: PropTypes.object,
};

Vehicles.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  vehicles: state.auth.chunkedVehicles,
  isAuthenticated: state.auth.token !== null,
  error: state.auth.error,
});

export default connect(mapStateToProps)(Vehicles);
