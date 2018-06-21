import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import { translate } from 'react-i18next';
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
    const { t } = this.props;
    return (
      <div className="vehicle-card">
        <Row style={styles.userProfile} className="profile-info">
          <div className="profile-image">
            <img src={api.images.vehicleImageLink(this.props.vehicles[this.props.id].image)} alt="vehicleImg" />
          </div>
          <div style={styles.userData}>
            <h4>{`${this.props.vehicles[this.props.id].carMaker} ${this.props.vehicles[this.props.id].model}`}</h4>
            <p><strong>{t('Plaque')}:</strong> {this.props.vehicles[this.props.id].plaque}</p>
            <p><strong>{t('State')}:</strong> {this.props.vehicles[this.props.id].state}</p>
            <p><strong>{t('VIN')}:</strong> {this.props.vehicles[this.props.id].vin}</p>
            <p><strong>{t('ELD')}:</strong> {this.props.vehicles[this.props.id].imeiEld}</p>
          </div>
        </Row>
      </div>
    );
  }
}

VehicleInfo.propTypes = {
  vehicles: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.isRequired,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
});
const translateFunc = translate('translations')(VehicleInfo);
export default connect(mapStateToProps)(translateFunc);
