import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import '../../assets/styles/trucks.css';
import * as actions from '../../store/actions/index';
import api from '../../services/api';

class VehicleRow extends React.Component {
  onDeleteBtnClick(userId, token) {
    const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');
    if (confirmDelete) {
      this.props.deleteVehicle(userId, token);
    }
  }

  render() {
    const pStyle = {
      justifyContent: 'flex-end',
    };

    return (
      <div className="item">
        <div className="truck_wrapper">
          <figure className="left">
            <Link to={`/vehicles/${this.props.id}`}>
              <img style={{ borderRadius: '50%' }} className="media-object" alt="vehicle-img" width="70" src={api.images.vehicleImageLink(this.props.image)} />
            </Link>
          </figure>
          <div className="right">
            <ul>
              <li><Link to={`/vehicles/${this.props.id}`}>{this.props.car_maker} {this.props.model} - {this.props.plaque}</Link></li>
              <li>State: {this.props.state}</li>
              <li>VIN: {this.props.vin}</li>
            </ul>
          </div>
        </div>
        <div style={pStyle}>
          <Link className="btn btn-secondary btn-sm" to={`/vehicles/${this.props.id}/edit`}><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteVehicle: (vehicleId, token) => dispatch(actions.onVehicleDelete(vehicleId, token)),
});


VehicleRow.propTypes = {
  vin: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  car_maker: PropTypes.string.isRequired,
  plaque: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  deleteVehicle: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleRow);
