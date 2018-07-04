
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
import Loader from '../../components/Loader/Loader';

class DevicesInfo extends React.Component {
  constructor(props) { // Acá ya llega devices a las props
    super(props);
    console.log(this.props);
    this.state = {
      search: '',
      pages: '5',
      currentPage: '1',
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.props.isLoading === true) return <Loader />;
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
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/devices/new_device"><FontAwesomeIcon icon="car" color="white" /> {t('Create device')} </Link>
            <Link className="btn btn-sm green" to="/devices/new_devices"><FontAwesomeIcon icon="car" color="white" /><FontAwesomeIcon icon="car" color="white" /> {t('Create multiple devices')} </Link>
          </div>
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
};

const mapStateToProps = state => ({
  isLoading: state.devices.loading,
  devices: state.auth.devices, // De acá saca los dvices
});

const translateApp = translate('translations')(DevicesInfo);
export default connect(mapStateToProps)(translateApp);
