import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
import api from '../../services/api';
import '../../assets/styles/trucks.css';

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
  render() {
  // if (this.state.vehicle === null) return <div><h2>Could not get the vehicle</h2></div>;

    return (
      <div className="vehicle-card">
        <h1>{`${this.props.vehicles[this.props.id].car_maker} ${this.props.vehicles[this.props.id].model}`}</h1>
        <Row style={styles.userProfile}>
          <img src={api.images.vehicleImageLink(this.props.vehicles[this.props.id].image)} alt="vehicleImg" />
          <div style={styles.userData}>
            <h5>Plaque: {this.props.vehicles[this.props.id].plaque}</h5>
            <h5>VIN: {this.props.vehicles[this.props.id].vin}</h5>
            <h5>ELD: {this.props.vehicles[this.props.id].IMEI_ELD}</h5>
            <h5>State: {this.props.vehicles[this.props.id].state}</h5>
          </div>
        </Row>
      </div>
    );
  }
}

VehicleInfo.propTypes = {
  vehicles: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
});

export default connect(mapStateToProps)(VehicleInfo);
