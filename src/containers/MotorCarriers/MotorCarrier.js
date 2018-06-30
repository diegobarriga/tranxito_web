import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import '../../assets/styles/forms.css';
import Aux from '../../hoc/Aux';
import Loader from '../../components/Loader/Loader';
import dashboardImg from '../../assets/images/statistics.svg';
import driverImg from '../../assets/images/delivery-man.svg';
import truckImg from '../../assets/images/delivery-truck.svg';
import syrusImg from '../../assets/images/syrus.svg';


class MotorCarrier extends React.Component {
  render() {
    const { id } = this.props.match.params;
    const { t } = this.props;
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (!this.props.isAdmin) {
        authRedirect = <Redirect to="/dashboard" />;
      }
    } else {
      authRedirect = <Redirect to="/" />;
    }

    if (this.props.loading === true) return <Loader />;

    return (
      <Aux>
        { authRedirect }
        <h1> {this.props.mCarrierName} </h1>
        <div className="buttons">
          <Link className="btn btn-sm green spacing" to={`/supervisors/${id}/new_supervisor`}><FontAwesomeIcon icon="user" color="white" /> {t('Create Supervisor')}</Link>
        </div>

        <div className="ui link cards">
          <Link className="card" to="/dashboard">
            <img src={dashboardImg} alt="Dashboard" />
            <div className="content">
              <span className="header">{t('Dashboard')}</span>
              <div className="meta">
                <span className="date">{t('Map, stats and more')}</span>
              </div>
            </div>
          </Link>
          <Link className="card" to="/drivers">
            <img src={driverImg} alt="Drivers" />
            <div className="content">
              <span className="header">{t('Drivers')}</span>
              <div className="meta">
                <span className="date">{t('List and profiles')}</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="ui link cards">
          <Link className="card" to="/vehicles">
            <img src={truckImg} alt="Vehicles" />
            <div className="content">
              <span className="header">{t('Vehicles')}</span>
              <div className="meta">
                <span className="date">{t('List and profiles')}</span>
              </div>
            </div>
          </Link>
          <Link className="card" to="/vehicles">
            <img src={syrusImg} alt="Devices" />
            <div className="content">
              <span className="header">{t('Devices')}</span>
              <div className="meta">
                <span className="date">{t('List and profiles')}</span>
              </div>
            </div>
          </Link>
        </div>
      </Aux>

    );
  }
}

MotorCarrier.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  mCarrierName: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
};

MotorCarrier.defaultProps = {
  mCarrierName: null,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  loading: state.auth.loading,
  mCarrierName: state.auth.mcName,
});

const translateFunc = translate('translations')(MotorCarrier);
export default connect(mapStateToProps)(translateFunc);
