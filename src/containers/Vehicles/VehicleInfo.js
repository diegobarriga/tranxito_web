import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
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
        <Row style={styles.userProfile} className="profile-info">
          <div className="profile-image">
            <img src={api.images.vehicleImageLink(this.props.vehicles[this.props.id].image)} alt="vehicleImg" />
          </div>
          <div style={styles.userData}>
            <h4>{`${this.props.vehicles[this.props.id].car_maker} ${this.props.vehicles[this.props.id].model}`}</h4>
            <p><strong>Plaque:</strong> {this.props.vehicles[this.props.id].plaque}</p>
            <p><strong>State:</strong> {this.props.vehicles[this.props.id].state}</p>
            <p><strong>VIN:</strong> {this.props.vehicles[this.props.id].vin}</p>
            <p><strong>ELD:</strong> {this.props.vehicles[this.props.id].IMEI_ELD}</p>
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
