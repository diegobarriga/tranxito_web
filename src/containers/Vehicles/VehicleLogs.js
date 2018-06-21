import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Table, Badge } from 'reactstrap';
import { translate } from 'react-i18next';
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';
import { EVENT_TYPES, EVENT_CODES, DUTY_STATUS } from '../../utils/eventTypes';
import '../../assets/styles/buttons.css';

const moment = require('moment');

const styles = {
  badge: {
    width: '40px',
  },
};

class VehicleLogs extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      logs: null,
    };
    this.getData = this.getData.bind(this);
    this.reverseLogs = this.reverseLogs.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ loading: true });
    api.vehicles.getLogs(this.props.id, this.props.token).then((response) => {
      console.log(response.data);
      const logs = response.data;
      this.setState({ logs }, this.reverseLogs);
    })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  reverseLogs() {
    this.state.logs.reverse();
    this.setState({ loading: false });
  }

  formatDate(datetime) {
    return moment(datetime).calendar();
  }
  render() {
    if (this.state.loading === true) return <Loader />;
    const { t } = this.props;
    return (
      <Container >
        <Table striped>
          <thead>
            <tr>
              <th>{t('Event')}</th>
              <th>{t('Detail')}</th>
              <th>{t('Timestamp')}</th>
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
      </Container>

    );
  }
}

VehicleLogs.propTypes = {
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  t: PropTypes.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
});
const translateFunc = translate('translations')(VehicleLogs);
export default connect(mapStateToProps)(translateFunc);
