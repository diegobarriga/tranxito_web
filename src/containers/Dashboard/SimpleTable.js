import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
// import Loader from '../../components/Loader/Loader';
import { DUTY_STATUS } from '../../utils/eventTypes';
import * as functions from './functions';
import '../../assets/styles/buttons.css';

const styles = {
  container: {
    marginTop: '20px',
  },
  table: {
    width: '19.8%',
    float: 'left',
  },
  badge: {
    width: '40px',
  },
};

class SimpleTable extends React.Component {
  render() {
    Object.entries(this.props.stats).forEach(([key, value]) => {
      console.log(key, value);
    });
    const { t } = this.props;
    return (
      <Container style={styles.container}>
        <Table striped>
          <thead>
            <tr>
              <th style={styles.table}>{t(this.props.type)}</th>
              <th style={styles.table}>
                <Badge className="event1" style={styles.badge}>
                  {DUTY_STATUS[1]}
                </Badge>
              </th>
              <th style={styles.table}>
                <Badge className="event2" style={styles.badge}>
                  {DUTY_STATUS[2]}
                </Badge>
              </th>
              <th style={styles.table}>
                <Badge className="event3" style={styles.badge}>
                  {DUTY_STATUS[3]}
                </Badge>
              </th>
              <th style={styles.table}>
                <Badge className="event4" style={styles.badge}>
                  {DUTY_STATUS[4]}
                </Badge>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(this.props.stats).map(key => (
                <tr key={key}>
                  { this.props.type === 'Driver' &&
                  <td style={styles.table}><Link to={`/drivers/${this.props.users[key].id}`}>{this.props.users[key].firstName} {this.props.users[key].lastName}</Link></td>
                  }
                  { this.props.type === 'Vehicle' &&
                  <td style={styles.table}><Link to={`/vehicles/${this.props.vehicles[key].id}`}>{this.props.vehicles[key].carMaker} {this.props.vehicles[key].model}</Link></td>
                  }
                  <td style={styles.table}>{functions.round(this.props.stats[key]['1'])} {t('hours')}</td>
                  <td style={styles.table}>{functions.round(this.props.stats[key]['2'])} {t('hours')}</td>
                  <td style={styles.table}>{functions.round(this.props.stats[key]['3'])} {t('hours')}</td>
                  <td style={styles.table}>{functions.round(this.props.stats[key]['4'])} {t('hours')}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Container>

    );
  }
}

SimpleTable.propTypes = {
  // getUserLogs: PropTypes.func.isRequired,
  // token: PropTypes.string.isRequired,
  // id: PropTypes.string.isRequired,
  // logs: PropTypes.array,
  type: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  vehicles: PropTypes.object.isRequired,
  t: PropTypes.isRequired,
};

// UserLogs.defaultProps = {
//   logs: null,
// };

const mapStateToProps = state => ({
  users: state.auth.users,
  vehicles: state.auth.vehicles,
});

// const mapDispatchToProps = dispatch => ({
//   getUserLogs: (token, UserId) => dispatch(actions.getUserLogs(token, UserId)),
// });
const translateFunc = translate('translations')(SimpleTable);
export default connect(mapStateToProps)(translateFunc);
