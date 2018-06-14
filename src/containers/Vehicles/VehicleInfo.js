import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import api from '../../services/api';
import * as actions from '../../store/actions/index';
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
  pStyle: {
    justifyContent: 'flex-start',
    flexGrow: 2,
  },
};

class VehicleInfo extends React.Component {
  onDeleteBtnClick(userId, token) {
    const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');
    if (confirmDelete) {
      this.props.deleteVehicle(userId, token);
    }
  }

  render() {
    return (
      <div className="vehicle-card">
        <Row style={styles.userProfile} className="profile-info">
          <div className="profile-image">
            <img src={api.images.vehicleImageLink(this.props.vehicles[this.props.id].image)} alt="vehicleImg" />
          </div>
          <div style={styles.userData}>
            <h4>{`${this.props.vehicles[this.props.id].carMaker} ${this.props.vehicles[this.props.id].model}`}</h4>
            <p><strong>Plaque:</strong> {this.props.vehicles[this.props.id].plaque}</p>
            <p><strong>State:</strong> {this.props.vehicles[this.props.id].state}</p>
            <p><strong>VIN:</strong> {this.props.vehicles[this.props.id].vin}</p>
            <p><strong>ELD:</strong> {this.props.vehicles[this.props.id].imeiEld}</p>
          </div>
          <div style={styles.pStyle}>
            <Link className="btn btn-secondary btn-sm" to={`/vehicles/${this.props.id}/edit`}><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
            <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
          </div>
        </Row>
      </div>
    );
  }
}

VehicleInfo.propTypes = {
  vehicles: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteVehicle: (vehicleId, token) => dispatch(actions.onVehicleDelete(vehicleId, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleInfo);
