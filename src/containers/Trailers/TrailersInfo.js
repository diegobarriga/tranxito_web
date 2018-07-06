
import React from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { translate } from 'react-i18next';
import TrailerRow from './TrailerRow';
import '../../assets/styles/forms.css';
import Loader from '../../components/Loader/Loader';

class TrailersInfo extends React.Component {
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
    const { trailers, isLoading } = this.props;
    if (isLoading) return <Loader />;

    const filteredTrailers = Object.values(trailers).filter(trailer => (
      trailer.vin.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      trailer.model.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      trailer.manufacturer.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      trailer.number.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1));

    
    const totalTrailers = filteredTrailers.length;
    const { t } = this.props;

    return (
      <div>
        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" placeholder={t('Search')} value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/trailers/new_trailer"><FontAwesomeIcon icon="truck" color="white" /> {t('Create trailer')} </Link>
            <Link className="btn btn-sm green spacing" to="/trailers/new_trailers"><FontAwesomeIcon icon="truck" color="white" /><FontAwesomeIcon icon="truck" color="white" /> {t('Create multiple trailers')} </Link>
          </div>
        </div>

        <div className="ui divided items">
          {
              filteredTrailers.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer))
              .slice(
              ((this.state.currentPage * this.state.pages) - 5),
               this.state.currentPage * this.state.pages,
              )
              .map(trailer => (<TrailerRow
                key={trailer.id}
                id={trailer.id}
                vin={trailer.vin}
                number={trailer.number}
                model={trailer.model}
                manufacturer={trailer.manufacturer}
                year={trailer.year}
                gvw={trailer.gvw}
                image={trailer.image}
              />))
            }
        </div>
        <Col sm="12" md={{ size: 5, offset: 4 }}>
          { totalTrailers > 5 &&
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={5}
              totalItemsCount={totalTrailers}
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

TrailersInfo.propTypes = {
  trailers: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.trailers && state.trailers.loading,
  trailers: state.auth.trailers,
});

const translateApp = translate('translations')(TrailersInfo);
export default connect(mapStateToProps)(translateApp);
