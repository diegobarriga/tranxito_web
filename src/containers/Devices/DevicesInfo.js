
import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { translate } from 'react-i18next';
import DeviceRow from './DeviceRow';
import '../../assets/styles/forms.css';
import api from '../../services/api';
import Loader from '../../components/Loader/Loader';

class DevicesInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pages: '5',
      currentPage: '1',
      createDevices: false,
      loading: false,
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getStatusMC = this.getStatusMC.bind(this);
  }

  componentDidMount() {
    this.getStatusMC();

  }

  async getStatusMC() {
    this.setState({ loading: true });
    const response = await api.motorCarriers.getMotorCarrier(
      this.props.motorCarrierId,
      this.props.token,
    );
    if (response.status === 200) {
      this.setState({ createDevices: response.data.createDevices, loading: false });
    } else {
      this.setState({ createDevices: false, loading: false });
    }
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.props.isLoading || this.state.loading) return <Loader />;
    const filteredDevices = Object.values(this.props.devices).filter(device => (
      device.bluetoothMac.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      device.imei.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
    ));

    const totalDevices = filteredDevices.length;
    const { t } = this.props;

    return (
      <div>

        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" placeholder={t('Search')} value={this.state.search} onChange={this.updateSearch} />
          { this.state.createDevices &&
            <div className="buttons">
              <Link className="btn btn-sm green spacing" to="/devices/new_device"><FontAwesomeIcon icon="hdd" color="white" /> {t('Create device')} </Link>
              <Link className="btn btn-sm green" to="/devices/new_devices"><FontAwesomeIcon icon="hdd" color="white" /><FontAwesomeIcon icon="hdd" color="white" /> {t('Create multiple devices')} </Link>
            </div>
          }

        </div>

        <div className="ui divided items">
          {
              filteredDevices.sort((a, b) => a.bluetoothMac.localeCompare(b.bluetoothMac))
              .slice(
              ((this.state.currentPage * this.state.pages) - 5),
               this.state.currentPage * this.state.pages,
              )
              .map(truck => (<DeviceRow
                key={truck.id}
                id={truck.id}
                bluetoothMac={truck.bluetoothMac}
                configScript={truck.configScript}
                configStatus={truck.configStatus}
                imei={truck.imei}
                motorCarrierId={truck.motorCarrierId}
                sequenceId={truck.sequenceId}
                state={truck.state}
                vehiceleId={truck.vehiceleId}
              />))
            }
        </div>
        <Col sm="12" md={{ size: 5, offset: 4 }}>
          { totalDevices > 5 &&
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={5}
              totalItemsCount={totalDevices}
              pageRangeDisplayed={4}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />}
        </Col>

      </div>
    );
  }
}

DevicesInfo.propTypes = {
  devices: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.devices.loading,
  devices: state.auth.devices,
  motorCarrierId: state.auth.motorCarrierId,
  token: state.auth.token,
});

const translateApp = translate('translations')(DevicesInfo);
export default connect(mapStateToProps)(translateApp);
