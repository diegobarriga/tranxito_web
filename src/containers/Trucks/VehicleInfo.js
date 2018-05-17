import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Avatar from '../../components/Avatar';
import * as actions from '../../store/actions/vehicle';
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
  componentDidMount() {
    console.log('didmount');
    this.props.getVehicle(this.props.token, this.props.id);
    console.log(this.props.vehicle);
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;
    console.log(this.props.vehicle);
    return (
      <Aux>
        <h1>{`${this.props.vehicle.car_maker} ${this.props.vehicle.model}`}</h1>
        <Row style={styles.userProfile}>
          <Avatar src={api.images.vehicleImageLink(this.props.vehicle.image)} />
          <div style={styles.userData}>
            <div>Plaque: {this.props.vehicle.palque}</div>
            <div>VIN: {this.props.vehicle.vin}</div>
            <div>ELD: {this.props.vehicle.IMEI_ELD}</div>
            <div>State: {this.props.vehicle.state}</div>
          </div>
        </Row>
      </Aux>
    );
  }
}

VehicleInfo.propTypes = {
  vehicle: PropTypes.object,
  getVehicle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

VehicleInfo.defaultProps = {
  vehicle: null,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  isLoading: state.vehicle.loading,
  vehicle: state.vehicle.vehicle,
});

const mapDispatchToProps = dispatch => ({
  getVehicle: (token, vehicleId) => dispatch(actions.getVehicle(token, vehicleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfo);
