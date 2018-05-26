import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
// import Loader from '../../components/Loader/Loader';
import { DUTY_STATUS, COLORS } from '../../utils/eventTypes';
import * as functions from './functions';

const styles = {
  container: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
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

    return (
      <Container style={styles.container}>
        <Table striped>
          <thead>
            <tr>
              <th>{this.props.type}</th>
              <th>
                <Badge color={COLORS[1]} style={styles.badge}>
                  {DUTY_STATUS[1]}
                </Badge>
              </th>
              <th>
                <Badge color={COLORS[2]} style={styles.badge}>
                  {DUTY_STATUS[2]}
                </Badge>
              </th>
              <th>
                <Badge color={COLORS[3]} style={styles.badge}>
                  {DUTY_STATUS[3]}
                </Badge>
              </th>
              <th>
                <Badge color={COLORS[4]} style={styles.badge}>
                  {DUTY_STATUS[4]}
                </Badge>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(this.props.stats).map(key => (
                <tr key={key}>
                  <td><Link to={`/drivers/${this.props.users[key].id}`}>{this.props.users[key].first_name} {this.props.users[key].last_name}</Link></td>
                  <td>{functions.round(this.props.stats[key]['1'])}</td>
                  <td>{functions.round(this.props.stats[key]['2'])}</td>
                  <td>{functions.round(this.props.stats[key]['3'])}</td>
                  <td>{functions.round(this.props.stats[key]['4'])}</td>
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

export default connect(mapStateToProps)(SimpleTable);
