import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Container, Table, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
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
  constructor(props) {
    super(props);
    const stats = this.objToArr(props.stats);
    this.state = {
      stats,
      selectedSortId: null,
      selectedTypeSort: null,
    };
    this.sortByColumnUp = this.sortByColumnUp.bind(this);
    this.sortByColumnDown = this.sortByColumnDown.bind(this);
    this.sortByColumnAZ = this.sortByColumnAZ.bind(this);
    this.sortByColumnZA = this.sortByColumnZA.bind(this);
    this.sortAZFunction = this.sortAZFunction.bind(this);
    this.sortZAFunction = this.sortZAFunction.bind(this);
  }


  objToArr(stats) {
    const statsArray = [];
    Object.keys(stats).forEach((key) => {
      const obj = stats[key];
      obj.key = key;
      statsArray.push(obj);
    });
    console.log(statsArray);
    return statsArray;
  }

  sortByColumnDown(column) {
    let stats = this.state.stats;

    stats.sort((a, b) => a[column] - b[column]);
    this.setState({ stats, selectedSortId: column, selectedTypeSort: '0' });
  }

  sortByColumnUp(column) {
    let stats = this.state.stats;

    stats.sort((a, b) => b[column] - a[column]);
    this.setState({ stats, selectedSortId: column, selectedTypeSort: '1' });
  }

  sortAZFunction(a, b) {
    if (this.props.type === 'Driver') {
      return this.props.users[a.key].last_name.localeCompare(this.props.users[b.key].last_name);
    }
    return this.props.vehicles[a.key].car_maker.localeCompare(this.props.vehicles[b.key].car_maker);
  }

  sortZAFunction(a, b) {
    if (this.props.type === 'Driver') {
      return this.props.users[b.key].last_name.localeCompare(this.props.users[a.key].last_name);
    }
    return this.props.vehicles[b.key].car_maker.localeCompare(this.props.vehicles[a.key].car_maker);
  }

  sortByColumnAZ() {
    const { stats } = this.state;

    stats.sort(this.sortAZFunction);
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '0' });
  }

  sortByColumnZA() {
    const { stats } = this.state;

    stats.sort(this.sortZAFunction);
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '1' });
  }

  render() {
    // Object.entries(this.state.stats).forEach(([key, value]) => {
    //   console.log(key, value);
    // });

    return (
      <Container style={styles.container}>
        <Table striped>
          <thead>
            <tr>
              <th style={styles.table}>
                {this.props.type}
                <button onClick={() => this.sortByColumnAZ()} className="default">
                  <FontAwesomeIcon
                    icon="sort-alpha-down"
                    className={(this.state.selectedSortId === '0' && this.state.selectedTypeSort === '0') ? 'event0_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnZA()} className="default">
                  <FontAwesomeIcon
                    icon="sort-alpha-up"
                    className={(this.state.selectedSortId === '0' && this.state.selectedTypeSort === '1') ? 'event0_icon' : ''}
                  />
                </button>
              </th>
              <th style={styles.table}>
                <Badge className="event1" style={styles.badge}>
                  {DUTY_STATUS[1]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') ? 'event1_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'event1_icon' : ''}
                  />
                </button>
              </th>
              <th style={styles.table}>
                <Badge className="event2" style={styles.badge}>
                  {DUTY_STATUS[2]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '0') ? 'event2_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '1') ? 'event2_icon' : ''}
                  />
                </button>
              </th>
              <th style={styles.table}>
                <Badge className="event3" style={styles.badge}>
                  {DUTY_STATUS[3]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('3')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '3' && this.state.selectedTypeSort === '0') ? 'event3_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('3')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '3' && this.state.selectedTypeSort === '1') ? 'event3_icon' : ''}
                  />
                </button>
              </th>
              <th style={styles.table}>
                <Badge className="event4" style={styles.badge}>
                  {DUTY_STATUS[4]}
                </Badge>
                <button onClick={() => this.sortByColumnDown('4')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '4' && this.state.selectedTypeSort === '0') ? 'event4_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('4')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '4' && this.state.selectedTypeSort === '1') ? 'event4_icon' : ''}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.stats.map(stat => (
                <tr key={stat.key}>
                  { this.props.type === 'Driver' &&
                  <td style={styles.table}><Link to={`/drivers/${this.props.users[stat.key].id}`}>{this.props.users[stat.key].first_name} {this.props.users[stat.key].last_name}</Link></td>
                  }
                  { this.props.type === 'Vehicle' &&
                  <td style={styles.table}><Link to={`/vehicles/${this.props.vehicles[stat.key].id}`}>{this.props.vehicles[stat.key].car_maker} {this.props.vehicles[stat.key].model}</Link></td>
                  }
                  <td style={styles.table}>{functions.round(stat['1'])} hours</td>
                  <td style={styles.table}>{functions.round(stat['2'])} hours</td>
                  <td style={styles.table}>{functions.round(stat['3'])} hours</td>
                  <td style={styles.table}>{functions.round(stat['4'])} hours</td>
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
