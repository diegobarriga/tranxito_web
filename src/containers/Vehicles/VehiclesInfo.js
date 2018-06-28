
import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Pagination from 'react-js-pagination';
import VehicleRow from './VehicleRow';
import '../../assets/styles/forms.css';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/index';
import getLastMod from '../../utils/updateStoreFunctions';

class VehiclesInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pages: '5',
      currentPage: '1',
      checking: false,
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.checkLastMod();
  }

  async checkLastMod() {
    this.setState({ checking: true });
    const lastMod = await getLastMod(this.props.motorCarrierId, this.props.token);

    if (lastMod.vehicles !== this.props.lastMod.vehicles) {
      this.props.updateVehicles(this.props.motorCarrierId, this.props.token);
      this.props.updateLastMod(lastMod);
    }
    this.setState({ checking: false });
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.state.checking || this.props.isLoading) return <Loader />;

    const filteredVehicles = Object.values(this.props.vehicles).filter(vehicle => (
      vehicle.vin.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.model.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.carMaker.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.plaque.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1));

    const totalVehicles = filteredVehicles.length;

    return (
      <div>

        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" placeholder="Search" value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/vehicles/new_vehicle"><FontAwesomeIcon icon="car" color="white" /> Create vehicle</Link>
            <Link className="btn btn-sm green" to="/vehicles/new_vehicles"><FontAwesomeIcon icon="car" color="white" /><FontAwesomeIcon icon="car" color="white" /> Create multiple vehicles</Link>
          </div>
        </div>

        <div className="ui divided items">
          {
              filteredVehicles.sort((a, b) => a.carMaker.localeCompare(b.carMaker))
              .slice(
              ((this.state.currentPage * this.state.pages) - 5),
               this.state.currentPage * this.state.pages,
              )
              .map(truck => (<VehicleRow
                key={truck.id}
                id={truck.id}
                vin={truck.vin}
                CmvPowerUnitNumber={truck.CmvPowerUnitNumber}
                model={truck.model}
                carMaker={truck.carMaker}
                plaque={truck.plaque}
                state={truck.state}
                imeiEld={truck.imeiEld}
                image={truck.image}
              />))
            }
        </div>
        <Col sm="12" md={{ size: 5, offset: 4 }}>
          { totalVehicles > 5 &&
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={5}
              totalItemsCount={totalVehicles}
              pageRangeDisplayed={4}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />}
        </Col>

      </div>
    );
  }
}

VehiclesInfo.propTypes = {
  vehicles: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  updateVehicles: PropTypes.func.isRequired,
  updateLastMod: PropTypes.func.isRequired,
  lastMod: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  isLoading: state.auth.loading,
  lastMod: state.auth.lastMod,
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

const mapDispatchToProps = dispatch => ({
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
  updateVehicles: (motorCarrierId, token) =>
    dispatch(actions.updateVehicles(motorCarrierId, token)),
});


export default connect(mapStateToProps, mapDispatchToProps)(VehiclesInfo);
