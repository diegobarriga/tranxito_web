import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';
import '../../assets/styles/trucks.css';
import * as actions from '../../store/actions/index';


class TruckRow extends React.Component {



  onDeleteBtnClick(userId, token){
    console.log(userId);
    console.log(token);
    this.props.deleteVehicle(userId, token);
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
            <img className="media-object" width="100px" src={`https://e2e-eld-test.herokuapp.com/api/imageContainers/Vehicles/download/${this.props.image}`} />
          </figure>
          <div className="right">
            <ul>
              <li>{this.props.car_maker} {this.props.model} - {this.props.plaque}</li>
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
  deleteVehicle: (vehicleId, token) => dispatch(actions.onVehicleDelete(vehicleId, token))
});



TruckRow.propTypes = {
  vin: PropTypes.string.isRequired,
  CMV_power_unit_number: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  car_maker: PropTypes.string.isRequired,
  plaque: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  IMEI_ELD: PropTypes.number.isRequired,
  
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckRow);