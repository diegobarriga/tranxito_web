import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';

const styles = {
  userProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '24px 12px',
  },
  userData: {
    flexDirection: 'column',
    marginLeft: '12px',
  },
};

class VehicleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.getVehicle()
      .then((response) => {
        if (response.status === 200) {
          this.setState({ vehicle: response.data, loading: false });
        } else {
          this.setState({ loading: false });
        }
      });
  }

  getVehicle() {
    return api.vehicles.getVehicle(this.props.id, this.props.token);
  }

  render() {
    if (this.state.loading === true) return <Loader />;

    if (this.state.vehicle === null) return <div><h2>Could not get the vehicle</h2></div>;

    return (
      <Aux>
        <h1>{`${this.state.vehicle.car_maker} ${this.state.vehicle.model}`}</h1>
        <Row style={styles.userProfile}>
          <img src={api.images.vehicleImageLink(this.state.vehicle.image)} alt="vehicleImg" />
          <div style={styles.userData}>
            <div>Plaque: {this.state.vehicle.palque}</div>
            <div>VIN: {this.state.vehicle.vin}</div>
            <div>ELD: {this.state.vehicle.IMEI_ELD}</div>
            <div>State: {this.state.vehicle.state}</div>
          </div>
        </Row>
      </Aux>
    );
  }
}

VehicleInfo.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(VehicleInfo);
