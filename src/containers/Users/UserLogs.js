import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Row, Col, Table, Badge } from 'reactstrap';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/userLogs';
import { EVENT_TYPES, EVENT_CODES, DUTY_STATUS } from '../../utils/eventTypes';
import '../../assets/styles/buttons.css';
import api from '../../services/api';

const moment = require('moment');

const styles = {
  tableStyle: {
    maxHeight: `${50 * 6}px`,
    overflow: 'scroll',
  },
  badge: {
    width: '40px',
  },
};

class UserLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: null,
      selectedSortId: null,
      selectedTypeSort: null,
      loading: true,
    };
    this.sortByColumnUp = this.sortByColumnUp.bind(this);
    this.sortByColumnDown = this.sortByColumnDown.bind(this);
  }

  componentDidMount() {
    this.getUserLogs();
  }

  getUserLogs() {
    this.setState({ loading: true });

    api.people.getUserEvents(this.props.id, this.props.token)
      .then((response) => {
        try {
          const logs = response.data;
          console.log('paso ok');
          logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          this.setState({ logs, loading: false });
        } catch (error) {
          console.log('errror');
          this.setState({ loading: false });
        }
      });
  }

  formatDate(datetime) {
    return moment(datetime).format('MMMM Do YYYY, h:mm a');
  }

  sortByColumnDown() {
    const { logs } = this.state;

    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    this.setState({ logs, selectedSortId: '1', selectedTypeSort: '0' });
  }

  sortByColumnUp() {
    const { logs } = this.state;

    logs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    this.setState({ logs, selectedSortId: '1', selectedTypeSort: '1' });
  }

  render() {
    if (this.state.loading) return <Loader />;
    // this.state.logs.reverse();
    let button;
    if (this.state.selectedSortId === null) {
      button = (
        <button onClick={() => this.sortByColumnUp()} className="default">
          <FontAwesomeIcon
            icon="sort"
            className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') ? 'green_icon' : ''}
          />
        </button>
      );
    } else if (this.state.selectedSortId === '1' && this.state.selectedTypeSort === '1') {
      button = (
        <button onClick={() => this.sortByColumnDown()} className="default">
          <FontAwesomeIcon
            icon="sort-down"
            className={(this.state.selectedSortId === '1' && this.state.selectedTypeSort === '0') ? 'green_icon' : ''}
          />
        </button>
      );
    } else {
      button = (
        <button onClick={() => this.sortByColumnUp()} className="default">
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
          <Table striped>
            <thead>
              <tr>
                <th>Event</th>
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
              {this.state.logs.map(event => (
                <tr key={event.id}>
                  <td>{event.type === 1 &&
                    <Badge className={`event${event.code}`} style={styles.badge}>
                      {DUTY_STATUS[event.code]}
                    </Badge>}
                    {'  '}{EVENT_TYPES[event.type]}
                  </td>
                  <td>{EVENT_CODES[event.type][event.code]}</td>
                  <td>{this.formatDate(event.timestamp)}</td>
                </tr>

                    ))}
            </tbody>
          </Table>
        </Col>
      </Row>

    );
  }
}

UserLogs.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  loading: state.userLogs.loading,
});

export default connect(mapStateToProps)(UserLogs);
