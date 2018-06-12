import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
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
  constructor(props) {
    super(props);
    const stats = this.objToArr(this.props.stats.driversAlerts);
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

  sortByColumnDown(column, id) {
    const { stats } = this.state;

    stats.sort((a, b) => a[column] - b[column]);
    this.setState({ stats, selectedSortId: id, selectedTypeSort: '0' });
  }

  sortByColumnUp(column, id) {
    const { stats } = this.state;

    stats.sort((a, b) => b[column] - a[column]);
    this.setState({ stats, selectedSortId: id, selectedTypeSort: '1' });
  }

  sortAZFunction(a, b) {
    return this.props.users[a.key].last_name.localeCompare(this.props.users[b.key].last_name);
  }

  sortZAFunction(a, b) {
    return this.props.users[b.key].last_name.localeCompare(this.props.users[a.key].last_name);
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
    Object.entries(this.props.stats.driversAlerts).forEach(([key, value]) => {
      console.log(key, value);
    });

    return (
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>
                Driver
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
              <th>
                <span className="speedButton">Amount of Excess Speed</span>
                <button onClick={() => this.sortByColumnDown('speedLimit', '1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') ? 'speed_color_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('speedLimit', '1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'speed_color_icon' : ''}
                  />
                </button>
              </th>
              <th>
                <span className="timeButton">Amount of Excess Hours of Driving</span>
                <button onClick={() => this.sortByColumnDown('timeLimit', '2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '0') ? 'hours_color_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('timeLimit', '2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '1') ? 'hours_color_icon' : ''}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.stats.map(stat => (
                <tr key={stat.key}>
                  <td><Link to={`/drivers/${this.props.users[stat.key].id}`}>{this.props.users[stat.key].first_name} {this.props.users[stat.key].last_name}</Link></td>
                  <td>{stat.speedLimit}</td>
                  <td>{stat.timeLimit}</td>
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
