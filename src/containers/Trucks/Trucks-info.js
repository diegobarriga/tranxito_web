import React from 'react';
import { ListGroup } from 'reactstrap';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TruckRow from './Truck-row';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/vehicles';
import '../../assets/styles/forms.css';

class TrucksInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    this.props.getVehicles(this.props.token, this.props.motorCarrierId);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }


  render() {
    if (this.props.isLoading === true) return <Loader />;

    const filteredVehicles = this.props.vehicles.filter(vehicle => (
      vehicle.vin.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.model.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.car_maker.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.plaque.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1));

    return (
      <div>

        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/vehicles/new_vehicle"><FontAwesomeIcon icon="car" color="white" /> Create vehicle</Link>
            <Link className="btn btn-sm green" to="/vehicles/new_vehicles"><FontAwesomeIcon icon="car" color="white" /><FontAwesomeIcon icon="car" color="white" /> Create multiple vehicles</Link>
          </div>
        </div>

        <ListGroup>
          {
              filteredVehicles.sort((a, b) => a.car_maker > b.car_maker).map(truck => (<TruckRow
                key={truck.id}
                id={truck.id}
                vin={truck.vin}
                CMV_power_unit_number={truck.CMV_power_unit_number}
                model={truck.model}
                car_maker={truck.car_maker}
                plaque={truck.plaque}
                state={truck.state}
                IMEI_ELD={truck.IMEI_ELD}
                image={truck.image}
              />))
            }
        </ListGroup>
      </div>
    );
  }
}

TrucksInfo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  vehicles: PropTypes.array.isRequired,
  getVehicles: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

TrucksInfo.defaultProps = {

};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
  vehicles: state.vehicles.vehicles,
  isLoading: state.vehicles.loading,
});

const mapDispatchToProps = dispatch => ({
  getVehicles: (token, motorCarrierId) => dispatch(actions.getVehicles(token, motorCarrierId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrucksInfo);
