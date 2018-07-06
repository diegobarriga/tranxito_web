import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Badge } from 'reactstrap';
import { Button, Checkbox, Table } from 'semantic-ui-react';
import { translate } from 'react-i18next';
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
      selectMessage: 'Select All',
      result: [],
      mcId: null,
    };
    this.sortByTimestampUp = this.sortByTimestampUp.bind(this);
    this.sortByTimestampDown = this.sortByTimestampDown.bind(this);
    this.filterByEvent = this.filterByEvent.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.deleteLogs = this.deleteLogs.bind(this);
  }

  componentDidMount() {
    if (this.props.type === 'user') {
      if (this.props.isNotAuth) {
        api.people.getUser(this.props.id, this.props.token)
          .then((userResponse) => {
            this.setState({ mcId: userResponse.data.motorCarrierId });
            this.getNotAuthLogs(api.motorCarriers.getNonAuthEvents);
          });
      } else {
        this.getLogs(api.people.getUserNotCertifiedEvents);
      }
    }
  }

  getLogs(apiCall) {
    this.setState({ loading: true });
    const mess = 'I hereby certify that my data entries and my record of duty status for this 24-hour period are true and correct.';
    this.setState({ message: mess });
    const filter = '{"where": {"and": [ {"recordStatus": "1"}, { "or": [{"type": "1"},{"type": "2"},{"type": "3"},{"type": "5"},{"type": "6"},{"type": "7"}]}  ]}}';

    apiCall(this.props.id, this.props.token, filter)
      .then((response) => {
        try {
          const logs = response.data.filter(log => (
            log.certified === false
          ));

          logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          const objectLogs = functions.arrayToObjectLogs(logs);
          this.setState({ logs: objectLogs, filterLogs: logs, loading: false });
        } catch (error) {
          this.setState({ loading: false });
        }
      });
  }

  getNotAuthLogs(apiCall) {
    this.setState({ loading: true });
    const mess = 'Are you sure you want to assign this events to you?.';
    this.setState({ message: mess });
    const filter = '{"where": {"recordStatus": "1"}}';
    apiCall(this.state.mcId, this.props.token, filter)
      .then((response) => {
        try {
          const logs = response.data.filter(log => (
            log.driverId === null &&
            log.recordStatus !== 2
          ));
          logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          const objectLogs = functions.arrayToObjectLogs(logs);
          this.setState({ logs: objectLogs, filterLogs: logs, loading: false });
        } catch (error) {
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
    logs = logs.map(x => x[0]);
    logs = funct.sortByTimestampDown(logs);
    this.setState({ filterLogs: logs, selectedSortId: '1', selectedTypeSort: '0' });
  }

  sortByTimestampUp() {
    let logs = Object.values(this.state.logs);
    logs = logs.map(x => x[0]);
    logs = funct.sortByTimestampUp(logs);
    this.setState({ filterLogs: logs, selectedSortId: '1', selectedTypeSort: '1' });
  }

  filterByEvent(event) {
    let logs = Object.values(this.state.logs);
    logs = logs.map(x => x[0]);
    const filteredLogs = funct.filterByEvent(logs, event);
    this.setState({ filterLogs: filteredLogs, selectedSortId: '0', selectedTypeSort: '0' });
  }

  handleSelectAll() {
    let logg = Object.values(this.state.logs).map((x) => {
      x[1] = !x[1];
      return x;
    });
    const arrayOfKeys = [];
    Object.values(logg).forEach((log) => {
      if (log[1]) {
        arrayOfKeys.push(log[0].id);
      }
    });

    this.setState({ result: arrayOfKeys });

    if (this.state.selectMessage === 'Select All') {
      this.setState({ selectMessage: 'Unselect All' });
    } else {
      this.setState({ selectMessage: 'Select All' });
    }

    logg = functions.arrayToObject2(logg);
    this.setState({ logs: logg });
  }

  handleCheck(id) {
    let newLogs = this.state.logs;
    newLogs[id][1] = !newLogs[id][1];
    this.setState({ logs: newLogs });
    newLogs = Object.values(newLogs);

    const arrayOfKeys = [];
    Object.values(newLogs).forEach((log) => {
      if (log[1]) {
        arrayOfKeys.push(log[0].id);
      }
    });
    this.setState({ result: arrayOfKeys });
  }

  deleteLogs(idsArray) {
    const auxLogs = { ...this.state.logs };

    idsArray.forEach((id) => {
      delete auxLogs[id];
    });
    const filteredLogs = this.state.filterLogs.filter(log => (
      !idsArray.includes(log.id)
    ));
    this.setState({ logs: auxLogs, filterLogs: filteredLogs });
  }

  render() {
    if (this.state.loading) return <Loader />;
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
    const { t } = this.props;
    return (
      <Row>
        <Col sm="12" md={{ size: 12 }}>
          {Object.values(this.state.logs).length > 0 ?
            <Table celled compact definition>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell style={styles.head} />
                  <Table.HeaderCell style={styles.headDos} >
                    <select id="bender" value={this.state.filterOption} onChange={this.filterByEvent}>
                      <option key={-1} value={-1}>{t('All Events')}</option>
                      {Object.keys(EVENT_TYPES).map(key => (
                        <option key={key} value={key}>{t(EVENT_TYPES[key])}</option>
                    ))}
                    </select>
                  </Table.HeaderCell>
                  <Table.HeaderCell style={styles.headTres}>{t('Detail')}</Table.HeaderCell>
                  <Table.HeaderCell style={styles.time}>
                    <Aux>
                      {t('Timestamp')}
                      {button}
                    </Aux>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.filterLogs.map(event => (
                  <Table.Row key={event.id}>
                    <Table.Cell style={styles.head} collapsing>
                      <Checkbox
                        checked={this.state.logs[event.id][1]}
                        onClick={() => this.handleCheck(event.id)}
                        value={event.id}
                      />
                    </Table.Cell>
                    <Table.Cell style={styles.table}>{event.type === 1 &&
                      <Badge className={`event${event.code}`} style={styles.badge}>
                        {t(DUTY_STATUS[event.code])}
                      </Badge>}
                      {'  '}{t(EVENT_TYPES[event.type])}
                    </Table.Cell>
                    <Table.Cell style={styles.table}>
                      {t(EVENT_CODES[event.type][event.code])}
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
                    <Modal
                      isCerti={this.props.isCerti}
                      text={this.state.message}
                      logs={this.state.result}
                      delLogs={this.deleteLogs}
                      content={this.props.content}
                    />
                    <Button size="small" onClick={this.handleSelectAll}>{t(this.state.selectMessage)}</Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          :
            <h2>
              { this.props.isCerti ?
                t('No events to be certified')
              :
                t('No events to be assigned')
              }
            </h2>
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
  isNotAuth: PropTypes.bool.isRequired,
  isCerti: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userLogs.loading,
});

const translateFunc = translate('translations')(Logs);
export default connect(mapStateToProps)(translateFunc);
