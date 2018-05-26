import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
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
  render() {
  // if (this.state.vehicle === null) return <div><h2>Could not get the vehicle</h2></div>;

    return (
      <Aux>
        <h1>{`${this.props.vehicles[this.props.id].car_maker} ${this.props.vehicles[this.props.id].model}`}</h1>
        <Row style={styles.userProfile}>
          <img src={api.images.vehicleImageLink(this.props.vehicles[this.props.id].image)} alt="vehicleImg" />
          <div style={styles.userData}>
            <div>Plaque: {this.props.vehicles[this.props.id].plaque}</div>
            <div>VIN: {this.props.vehicles[this.props.id].vin}</div>
            <div>ELD: {this.props.vehicles[this.props.id].IMEI_ELD}</div>
            <div>State: {this.props.vehicles[this.props.id].state}</div>
          </div>
        </Row>
      </Aux>
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
