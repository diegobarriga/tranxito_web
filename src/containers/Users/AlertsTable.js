import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Container, Table } from 'reactstrap';
import * as funct from '../../utils/tableFunctions';
// import Loader from '../../components/Loader/Loader';
// import { DUTY_STATUS } from '../../utils/eventTypes';
// import * as functions from './functions';
import '../../assets/styles/buttons.css';


class AlertsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: props.stats,
      selectedSortId: null,
      selectedTypeSort: null,
    };
    this.sortByColumnUp = this.sortByColumnUp.bind(this);
    this.sortByColumnDown = this.sortByColumnDown.bind(this);
    this.sortByTimestampDown = this.sortByTimestampDown.bind(this);
    this.sortByTimestampUp = this.sortByTimestampUp.bind(this);
  }

  sortByColumnDown(column, id) {
    let { stats } = this.state;
    stats = funct.sortByColumnDown(column, stats);
    this.setState({ stats, selectedSortId: id, selectedTypeSort: '0' });
  }

  sortByColumnUp(column, id) {
    let { stats } = this.state;
    stats = funct.sortByColumnUp(column, stats);
    this.setState({ stats, selectedSortId: id, selectedTypeSort: '1' });
  }

  sortByTimestampDown() {
    let { stats } = this.state;
    stats = funct.sortByTimestampDown(stats);
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '0' });
  }

  sortByTimestampUp() {
    let { stats } = this.state;
    stats = funct.sortByTimestampUp(stats);
    this.setState({ stats, selectedSortId: '0', selectedTypeSort: '1' });
  }

  render() {
    let button;
    if (this.state.selectedSortId === null) {
      button = (
        <button onClick={() => this.sortByTimestampUp()} className="default">
          <FontAwesomeIcon
            icon="sort"
            className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'green_icon' : ''}
          />
        </button>
      );
    } else if (this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') {
      button = (
        <button onClick={() => this.sortByTimestampDown()} className="default">
          <FontAwesomeIcon
            icon="sort-down"
            className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') ? 'green_icon' : ''}
          />
        </button>
      );
    } else {
      button = (
        <button onClick={() => this.sortByTimestampUp()} className="default">
          <FontAwesomeIcon
            icon="sort-up"
            className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'green_icon' : ''}
          />
        </button>
      );
    }

    return (
      <Container>
        <Table striped>
          <thead>
            <tr>
              <th>
                Day
                {button}
              </th>
              <th>
                <span className="speedButton">Amount of Excess Speed</span>
                <button onClick={() => this.sortByColumnDown('speedLimit', '1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') ? 'purple_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('speedLimit', '1')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'purple_icon' : ''}
                  />
                </button>
              </th>
              <th>
                <span className="timeButton">Amount of Excess Hours of Driving</span>
                <button onClick={() => this.sortByColumnDown('timeLimit', '2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-down"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '0') ? 'green_icon' : ''}
                  />
                </button>
                <button onClick={() => this.sortByColumnUp('timeLimit', '2')} className="default">
                  <FontAwesomeIcon
                    icon="sort-numeric-up"
                    className={(this.state.selectedSortId === '2' && this.state.selectedTypeSort === '1') ? 'green_icon' : ''}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.stats.map(stat => (
                <tr>
                  <td>{funct.formatDay(stat.timestamp)}</td>
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
  stats: PropTypes.array.isRequired,
};


export default AlertsTable;
