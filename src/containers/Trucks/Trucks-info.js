import React from 'react';
import { ListGroup } from 'reactstrap';
import TruckRow from './Truck-row';
import Loader from '../../components/Loader/Loader';
import trucksService from '../../services/trucks';
import PropTypes from 'prop-types';

class TrucksInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          trucks: [],
          loading: false,
          loggedUser: null,
         }
    }

    componentDidMount() {
      this.fetchTrucks();
    }

    async fetchTrucks() {
      this.setState({ loading: true });
      const trucks = await trucksService.getTrucks(this.props.motor_carrier_id);
      this.setState({ loading: false, trucks });
    }

    render() {
      return (
        <div>
          {this.state.loading && <Loader />}

        <ListGroup>
            {
              this.state.trucks.map((truck) => {
                return <TruckRow key={ truck.id }
                                    vin={ truck.vin }
                                    CMV_power_unit_number={ truck.CMV_power_unit_number }
                                    model={ truck.model }
                                    car_maker={ truck.car_maker }
                                    plaque={ truck.plaque }
                                    state={ truck.state }
                                    IMEI_ELD={ truck.IMEI_ELD }
                                    picture='https://wsa1.pakwheels.com/assets/default-display-image-car-638815e7606c67291ff77fd17e1dbb16.png'/>
              })
            }
        </ListGroup>
        </div>
      )
  }
}

export default TrucksInfo;

TrucksInfo.propTypes = {
  motor_carrier_id: PropTypes.number.isRequired,
};
