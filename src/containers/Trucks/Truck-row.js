import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroupItem, Button } from 'reactstrap';
import '../../assets/styles/trucks.css';
import * as actions from '../../store/actions/index';
import api from '../../services/api';

class TruckRow extends React.Component {
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

    const divStyle = {
      display: 'flex',
      flexDirection: 'row',
    };

    return (
      <ListGroupItem style={divStyle} className="justify-content-between">
        <div className="truck_wrapper">
          <figure className="left">
            <img className="media-object" alt="vehicle-img" width="100px" src={api.images.vehicleImageLink(this.props.image)} />
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
          <Link className="btn btn-secondary btn-sm" to={`/vehicles/${this.props.id}/edit`}>Edit</Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.id, this.props.token)}>Delete</Button>
        </div>
      </ListGroupItem>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteVehicle: (vehicleId, token) => dispatch(actions.onVehicleDelete(vehicleId, token)),
});


TruckRow.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TruckRow);
