import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
// import Loader from '../../components/Loader/Loader';
// import { DUTY_STATUS } from '../../utils/eventTypes';
// import * as functions from './functions';
import '../../assets/styles/buttons.css';

const styles = {
  badge: {
    width: '40px',
  },
};

class AlertsTable extends React.Component {
  render() {
    Object.entries(this.props.stats.driversAlerts).forEach(([key, value]) => {
      console.log(key, value);
    });
    const { t } = this.props;
    return (
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>{t('Driver')}</th>
              <th><span className="speedButton">{t('Amount of Excess Speed')}</span></th>
              <th><span className="timeButton">{t('Amount of Excess Hours of Driving')}</span></th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(this.props.stats.driversAlerts).map(key => (
                <tr key={key}>
                  <td><Link to={`/drivers/${this.props.users[key].id}`}>{this.props.users[key].firstName} {this.props.users[key].lastName}</Link></td>
                  <td>{this.props.stats.driversAlerts[key].speedLimit}</td>
                  <td>{this.props.stats.driversAlerts[key].timeLimit}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>

    );
  }
}

AlertsTable.propTypes = {
  stats: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  t: PropTypes.isRequired,
};

const mapStateToProps = state => ({
  users: state.auth.users,
});
const translateFunc = translate('translations')(AlertsTable);
export default connect(mapStateToProps)(translateFunc);
