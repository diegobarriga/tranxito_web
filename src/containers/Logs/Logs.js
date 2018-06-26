import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Table, Badge } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Loader from '../../components/Loader/Loader';
import { EVENT_TYPES, EVENT_CODES, DUTY_STATUS } from '../../utils/eventTypes';
import '../../assets/styles/buttons.css';
import api from '../../services/api';
import * as funct from '../../utils/tableFunctions';

const styles = {
  tableStyle: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
  },
  badge: {
    width: '40px',
  },
};

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: null,
      filteredLogs: null,
      selectedSortId: null,
      selectedTypeSort: null,
      loading: true,
    };
    this.sortByTimestampUp = this.sortByTimestampUp.bind(this);
    this.sortByTimestampDown = this.sortByTimestampDown.bind(this);
    this.filterByEvent = this.filterByEvent.bind(this);
  }

  componentDidMount() {
    if (this.props.type === 'user') {
      this.getLogs(api.people.getUserEvents);
    } else {
      this.getLogs(api.vehicles.getLogs);
    }
  }

  getLogs(apiCall) {
    this.setState({ loading: true });

    apiCall(this.props.id, this.props.token)
      .then((response) => {
        try {
          const logs = response.data;
          console.log(logs);
          logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          this.setState({ logs, filteredLogs: logs, loading: false });
        } catch (error) {
          console.log('errror');
          this.setState({ loading: false });
        }
      });
  }

  sortByTimestampDown() {
    let { filteredLogs } = this.state;
    filteredLogs = funct.sortByTimestampDown(filteredLogs);
    this.setState({ filteredLogs, selectedSortId: '1', selectedTypeSort: '0' });
  }

  sortByTimestampUp() {
    let { filteredLogs } = this.state;
    filteredLogs = funct.sortByTimestampUp(filteredLogs);
    this.setState({ filteredLogs, selectedSortId: '1', selectedTypeSort: '1' });
  }

  filterByEvent(event) {
    const { logs } = this.state;
    const filteredLogs = funct.filterByEvent(logs, event);
    this.setState({ filteredLogs, selectedSortId: '0', selectedTypeSort: '0' });
  }

  render() {
    if (this.state.loading) return <Loader />;
    // this.state.logs.reverse();
    let button;
    if (this.state.selectedSortId === null || this.state.selectedSortId !== '1') {
      button = (
        <button onClick={() => this.sortByTimestampUp()} className="default">
          <FontAwesomeIcon
            icon="sort"
          />
        </button>
      );
    } if (this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') {
      button = (
        <button onClick={() => this.sortByTimestampDown()} className="default">
          <FontAwesomeIcon
            icon="sort-down"
          />
        </button>
      );
    } else if (this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') {
      button = (
        <button onClick={() => this.sortByTimestampUp()} className="default">
          <FontAwesomeIcon
            icon="sort-up"
          />
        </button>
      );
    }
    return (
      <Row>
        <Col sm="12" md={{ size: 12 }}>
          <Table striped>
            <thead>
              <tr>
                <th>
                  <select id="bender" value={this.state.filterOption} onChange={this.filterByEvent}>
                    <option key={-1} value={-1}>All Events</option>
                    {Object.keys(EVENT_TYPES).map(key => (
                      <option key={key} value={key}>{EVENT_TYPES[key]}</option>
                   ))}
                  </select>
                </th>
                <th>Detail</th>
                <th>
                  <div>
                    Timestamp
                    {button}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.filteredLogs.map(event => (
                <tr key={event.id}>
                  <td>{event.type === 1 &&
                    <Badge className={`event${event.code}`} style={styles.badge}>
                      {DUTY_STATUS[event.code]}
                    </Badge>}
                    {'  '}{EVENT_TYPES[event.type]}
                  </td>
                  <td>{EVENT_CODES[event.type][event.code]}</td>
                  <td>{funct.formatDate(event.timestamp)}</td>
                </tr>

                    ))}
            </tbody>
          </Table>
        </Col>
      </Row>

    );
  }
}

Logs.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userLogs.loading,
});

export default connect(mapStateToProps)(Logs);
