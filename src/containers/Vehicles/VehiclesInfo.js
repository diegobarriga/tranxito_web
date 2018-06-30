
import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { translate } from 'react-i18next';
import VehicleRow from './VehicleRow';
import '../../assets/styles/forms.css';
import Loader from '../../components/Loader/Loader';

class VehiclesInfo extends React.Component {
  constructor(props) {
    super(props);
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

    const filteredVehicles = Object.values(this.props.vehicles).filter(vehicle => (
      vehicle.vin.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.model.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.carMaker.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      vehicle.plaque.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1));

    const totalVehicles = filteredVehicles.length;
    const { t } = this.props;

    return (
      <div>

        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" placeholder={t('Search')} value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/vehicles/new_vehicle"><FontAwesomeIcon icon="car" color="white" /> {t('Create vehicle')} </Link>
            <Link className="btn btn-sm green" to="/vehicles/new_vehicles"><FontAwesomeIcon icon="car" color="white" /><FontAwesomeIcon icon="car" color="white" /> {t('Create multiple vehicles')} </Link>
          </div>
        </div>

        <div className="ui divided items">
          {
              filteredVehicles.sort((a, b) => a.carMaker.localeCompare(b.carMaker))
              .slice(
              ((this.state.currentPage * this.state.pages) - 5),
               this.state.currentPage * this.state.pages,
              )
              .map(truck => (<VehicleRow
                key={truck.id}
                id={truck.id}
                vin={truck.vin}
                CmvPowerUnitNumber={truck.CmvPowerUnitNumber}
                model={truck.model}
                carMaker={truck.carMaker}
                plaque={truck.plaque}
                state={truck.state}
                imeiEld={truck.imeiEld}
                image={truck.image}
              />))
            }
        </div>
        <Col sm="12" md={{ size: 5, offset: 4 }}>
          { totalVehicles > 5 &&
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={5}
              totalItemsCount={totalVehicles}
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

VehiclesInfo.propTypes = {
  vehicles: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.vehicles.loading,
  vehicles: state.auth.vehicles,
});

const translateApp = translate('translations')(VehiclesInfo);
export default connect(mapStateToProps)(translateApp);
