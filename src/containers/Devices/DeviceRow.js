import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap';
import { translate } from 'react-i18next';
import '../../assets/styles/trucks.css';
import * as actions from '../../store/actions/index';

class DeviceRow extends React.Component {
  onDeleteBtnClick(motorCarrierId, deviceId, token) {
    const confirmDelete = window.confirm('Are you sure you want to delete this device?');
    if (confirmDelete) {
      this.props.deleteDevice(motorCarrierId, deviceId, token);
    }
  }

  render() {
    const pStyle = {
      justifyContent: 'flex-end',
    };
    const { t } = this.props;
    return (
      <div className="item no-padding">
        <div className="truck_wrapper">
          <div className="right">
            <ul>
              <li>Syrus MAC: {this.props.bluetoothMac}</li>
              <li>{t('IMEI')}: {this.props.imei}</li>
            </ul>
          </div>
        </div>
        <div style={pStyle}>
          <Link className="btn btn-secondary btn-sm" style={{ backgroundColor: 'orange', border: 'orange' }} to={`/devices/${this.props.id}/script`}><FontAwesomeIcon icon="cog" /></Link>{' '}
          <Link className="btn btn-secondary btn-sm" to={`/devices/${this.props.id}/edit`}><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
          <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(this.props.motorCarrierId, this.props.id, this.props.token)}><FontAwesomeIcon icon="trash" color="white" /></Button>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  deleteDevice: (motorCarrierId, deviceId, token) =>
    dispatch(actions.onDeviceDelete(motorCarrierId, deviceId, token)),
});


DeviceRow.propTypes = {
  id: PropTypes.number.isRequired,
  bluetoothMac: PropTypes.string.isRequired,
  imei: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  motorCarrierId: PropTypes.number.isRequired,

};

const translateFunc = translate('translations')(DeviceRow);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
