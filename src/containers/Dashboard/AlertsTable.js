import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Loader from '../../components/Loader/Loader';
// import { DUTY_STATUS } from '../../utils/eventTypes';
// import * as functions from './functions';
import '../../assets/styles/buttons.css';

const styles = {
  container: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
    marginTop: '20px',
  },
  badge: {
    width: '40px',
  },
};

class AlertsTable extends React.Component {
  render() {
    Object.entries(this.props.stats.driversAlerts).forEach(([key, value]) => {
      console.log(key, value);
    });

    return (
      <Container style={styles.container}>
        <Table striped>
          <thead>
            <tr>
              <th>Driver</th>
              <th><span className="speedButton">Amount of Excess Speed</span></th>
              <th><span className="timeButton">Amount of Excess Hours of Driving</span></th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(this.props.stats.driversAlerts).map(key => (
                <tr key={key}>
                  <td><Link to={`/drivers/${this.props.users[key].id}`}>{this.props.users[key].first_name} {this.props.users[key].last_name}</Link></td>
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
};

const mapStateToProps = state => ({
  users: state.auth.users,
});

export default connect(mapStateToProps)(AlertsTable);
