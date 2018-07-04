import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Container, Table } from 'reactstrap';
import { translate } from 'react-i18next';
import * as funct from '../../utils/tableFunctions';
// import Loader from '../../components/Loader/Loader';
// import { DUTY_STATUS } from '../../utils/eventTypes';
// import * as functions from './functions';
import '../../assets/styles/buttons.css';
import '../../assets/styles/tables.css';

const styles = {
  container: {
    marginTop: '5px',
  },
  table: {
    width: '19.8%',
    float: 'left',
  },
  badge: {
    width: '40px',
  },
};

class AlertsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: props.stats,
      selectedSortId: null,
      selectedTypeSort: null,
      activeRow: null,
    };
    this.sortByColumnUp = this.sortByColumnUp.bind(this);
    this.sortByColumnDown = this.sortByColumnDown.bind(this);
    this.sortByTimestampDown = this.sortByTimestampDown.bind(this);
    this.sortByTimestampUp = this.sortByTimestampUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(key) {
    let { activeRow } = this.state;
    if (activeRow === key) {
      activeRow = null;
    } else {
      activeRow = key;
    }
    this.setState({ activeRow });
  }

  render() {
    let button;
    if (this.state.selectedSortId === null || this.state.selectedSortId !== '0') {
      button = (
        <button onClick={() => this.sortByTimestampUp()} className="default">
          <FontAwesomeIcon
            icon="sort"
          />
        </button>
      );
    } else if (this.state.selectedSortId === '0' && this.state.selectedTypeSort === '1') {
      button = (
        <button onClick={() => this.sortByTimestampDown()} className="default">
          <FontAwesomeIcon
            icon="sort-down"
          />
        </button>
      );
    } else if (this.state.selectedSortId === '0' && this.state.selectedTypeSort === '0') {
      button = (
        <button onClick={() => this.sortByTimestampUp()} className="default">
          <FontAwesomeIcon
            icon="sort-up"
          />
        </button>
      );
    }
    const { t } = this.props;

    const alertSpeedIcon = <FontAwesomeIcon icon="exclamation-triangle" className="purple_icon" />;
    const alertTimeIcon = <FontAwesomeIcon icon="exclamation-triangle" className="green_icon" />;
    return (
      <Container>
        <Table hover>
          <thead>
            <tr>
              <th>
                Day
                {button}
              </th>
              <th>
                <span className="speedButton">{t('Amount of Excess Speed')}</span>
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
                <span className="timeButton">{t('Amount of Excess Hours of Driving')}</span>
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
                <tr
                  className={this.state.activeRow === stat.key ? 'row-with-table active-row' : 'row-with-table'}
                  key={stat.timestamp}
                  onClick={() => this.handleClick(stat.key)}
                >
                  <td>{funct.formatDay(stat.timestamp)}</td>
                  <td>{stat.speedLimit}</td>
                  <td>{stat.timeLimit}</td>
                  {this.state.activeRow === stat.key &&
                    <Container style={styles.container}>
                      <Table className="inner-table">
                        <thead>
                          <tr>
                            <th style={styles.table}>
                              <FontAwesomeIcon
                                icon="clock"
                              /> Hour
                            </th>
                            <th style={styles.table}>
                              <FontAwesomeIcon
                                icon="tachometer-alt"
                              /> Speed
                            </th>
                            <th style={styles.table}>
                              <FontAwesomeIcon
                                icon="location-arrow"
                              /> Coordinates
                            </th>
                            <th style={styles.table}>
                              <FontAwesomeIcon
                                icon="exclamation-triangle"
                              /> Speed Limit
                            </th>
                            <th style={styles.table}>
                              <FontAwesomeIcon
                                icon="exclamation-triangle"
                              /> Drive Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.groupedAlerts[stat.key].map(alert => (
                              <tr key={alert.timestamp}>
                                <td style={styles.table}>
                                  {funct.formatHour(alert.timestamp)}
                                </td>
                                <td style={styles.table}>
                                  {alert.speed} mph
                                </td>
                                <td style={styles.table}>
                                  {funct.roundToThree(alert.coordinates.lat)}
                                  {', '}
                                  {funct.roundToThree(alert.coordinates.lng)}
                                  {/* {alert.coordinates.lat},
                                  {alert.coordinates.lng} */}
                                </td>
                                <td style={styles.table}>
                                  {alert.speedLimitExceeded ? alertSpeedIcon : ''}
                                </td>
                                <td style={styles.table}>
                                  {alert.driveTimeExceeded ? alertTimeIcon : ''}
                                </td>
                              </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Container>
                  }
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
  groupedAlerts: PropTypes.object.isRequired,
};

export default translate('translations')(AlertsTable);
