import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Badge } from 'reactstrap';
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Loader from '../../../components/Loader/Loader';
import { EVENT_TYPES, EVENT_CODES, DUTY_STATUS } from '../../../utils/eventTypes';
import '../../../assets/styles/buttons.css';
import api from '../../../services/api';
import * as funct from '../../../utils/tableFunctions';
import Aux from '../../../hoc/Aux';
import * as functions from '../../../store/actions/functions';
import Modal from '../../Modal/Modal';

const styles = {
  tableStyle: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
  },
  badge: {
    width: '40px',
  },
  table: {
    width: '25%',
    float: 'left',
    height: '40px',
  },
  head: {
    width: '91px',
    float: 'left',
    height: '40px',
  },
  time: {
    width: '42.2%',
    float: 'left',
    height: '40px',
  },
  timeDos: {
    width: '41.7%',
    float: 'left',
    height: '40px',
  },
  headDos: {
    width: '24.8%',
    float: 'left',
    height: '40px',
  },
  headTres: {
    width: '24.75%',
    float: 'left',
    height: '40px',
  },
};


class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: null,
      filterLogs: null,
      selectedSortId: null,
      selectedTypeSort: null,
      loading: true,
      isOpen: false,
      message: '',
    };
    this.sortByTimestampUp = this.sortByTimestampUp.bind(this);
    this.sortByTimestampDown = this.sortByTimestampDown.bind(this);
    this.filterByEvent = this.filterByEvent.bind(this);
  }

  componentDidMount() {
    if (this.props.type === 'user') {
      this.getLogs(api.people.getUserNotCertifiedEvents);
    }
  }

  getLogs(apiCall) {
    this.setState({ loading: true });
    const mess = 'I hereby certify that my data entries and my record of duty status for this 24-hour period are true and correct.';
    this.setState({ message: mess });
    const filter = '{"where": {"recordStatus": "1"}}';
    apiCall(this.props.id, this.props.token, filter)
      .then((response) => {
        try {
          const logs = response.data;
          console.log(logs);
          logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          const objectLogs = functions.arrayToObject(logs);
          this.setState({ logs: objectLogs, filterLogs: logs, loading: false });
        } catch (error) {
          console.log('errror');
          this.setState({ loading: false });
        }
      });
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  sortByTimestampDown() {
    let logs = Object.values(this.state.logs);
    logs = funct.sortByTimestampDown(logs);
    this.setState({ filterLogs: logs, selectedSortId: '1', selectedTypeSort: '0' });
  }

  sortByTimestampUp() {
    let logs = Object.values(this.state.logs);
    logs = funct.sortByTimestampUp(logs);
    this.setState({ filterLogs: logs, selectedSortId: '1', selectedTypeSort: '1' });
  }

  filterByEvent(event) {
    const logs = Object.values(this.state.logs);
    const filteredLogs = funct.filterByEvent(logs, event);
    this.setState({ filterLogs: filteredLogs, selectedSortId: '0', selectedTypeSort: '0' });
  }

  render() {
    if (this.state.loading) return <Loader />;
    // this.state.logs.reverse();
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
      <Row>
        <Col sm="12" md={{ size: 12 }}>
          { this.state.filterLogs.length > 0 ?
            <Table celled compact definition>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell style={styles.head} />
                  <Table.HeaderCell style={styles.headDos} >
                    <select id="bender" value={this.state.filterOption} onChange={this.filterByEvent}>
                      <option key={-1} value={-1}>All Events</option>
                      {Object.keys(EVENT_TYPES).map(key => (
                        <option key={key} value={key}>{EVENT_TYPES[key]}</option>
                    ))}
                    </select>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.headTres}>Detail</Table.HeaderCell>
                  <Table.HeaderCell style={styles.time}>
                    <Aux>
                      Timestamp
                      {button}
                    </Aux>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.filterLogs.map(event => (
                  <Table.Row key={event.id}>
                    <Table.Cell style={styles.head} collapsing>
                      <Checkbox value={event.id} />
                    </Table.Cell>
                    <Table.Cell style={styles.table}>{event.type === 1 &&
                      <Badge className={`event${event.code}`} style={styles.badge}>
                        {DUTY_STATUS[event.code]}
                      </Badge>}
                      {'  '}{EVENT_TYPES[event.type]}
                    </Table.Cell>
                    <Table.Cell style={styles.table}>
                      {EVENT_CODES[event.type][event.code]}
                    </Table.Cell>
                    <Table.Cell style={styles.timeDos}>
                      {funct.formatDate(event.timestamp)}
                    </Table.Cell>
                  </Table.Row>

                      ))}
              </Table.Body>
              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell colSpan="4">
                    <Modal text={this.state.message} />
                    <Button size="small">Select All</Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
            :
            <h2> No logs to be certified </h2>
          }
        </Col>
      </Row>

    );
  }
}

Logs.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userLogs.loading,
});

export default connect(mapStateToProps)(Logs);
