import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, Button } from 'reactstrap';
import styles from '../../assets/styles/trucks.css';
import PropTypes from 'prop-types';


class VehicleRow extends React.Component {
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
            <img className="media-object" width="100px" src={this.props.picture} />
          </figure>
          <div className="right">
            <ul>
              <li><Link to="/">{this.props.car_maker} {this.props.model} - {this.props.plaque}</Link></li>
              <li>State: {this.props.state}</li>
              <li>VIN: {this.props.vin}</li>
            </ul>
          </div>
        </div>
        <div style={pStyle}>
          <Link className="btn btn-secondary btn-sm" to="/">Edit</Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick()}>Delete</Button>
        </div>
      </ListGroupItem>
    );
  }
}

VehicleRow.propTypes = {
  vin: PropTypes.string.isRequired,
  CMV_power_unit_number: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  car_maker: PropTypes.string.isRequired,
  plaque: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  IMEI_ELD: PropTypes.number.isRequired,
};

export default VehicleRow;
