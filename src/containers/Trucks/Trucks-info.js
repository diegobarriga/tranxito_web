import React from 'react';
import { ListGroup } from 'reactstrap';
import TruckRow from './Truck-row';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/vehicles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TrucksInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getVehicles(this.props.token, this.props.motorCarrierId);

  }



  render() {
    return (
      <div>
        {this.props.loading && <Loader />}
        {console.log(this.props.vehicles)}
        <ListGroup>
          {
              this.props.vehicles.map(truck => (<TruckRow
                key={truck.id}
                vin={truck.vin}
                CMV_power_unit_number={truck.CMV_power_unit_number}
                model={truck.model}
                car_maker={truck.car_maker}
                plaque={truck.plaque}
                state={truck.state}
                IMEI_ELD={truck.IMEI_ELD}
                picture="https://wsa1.pakwheels.com/assets/default-display-image-car-638815e7606c67291ff77fd17e1dbb16.png"
              />))
            }
        </ListGroup>
      </div>
    );
  }
}





const mapStateToProps = state => {
    return {
        token: state.auth.token,
        motorCarrierId: state.auth.motorCarrierId,
        vehicles: state.vehicles.vehicles,
        loading: state.vehicles.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getVehicles: ( token, motorCarrierId ) => dispatch(actions.getVehicles(token, motorCarrierId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrucksInfo);
