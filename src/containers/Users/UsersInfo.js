import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { translate, Trans } from 'react-i18next';
import UserRow from './UserRow';
import '../../assets/styles/forms.css';
import Loader from '../../components/Loader/Loader';

class UsersInfo extends React.Component {
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

    const filteredUsers = Object.values(this.props.users).filter(user => ((
      user.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) &&
      user.accountStatus === true && user.accountType === 'D'));

    const totalUsers = filteredUsers.length;
    const { t, i18n } = this.props;
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
    return (
      <div>
        <button onClick={() => changeLanguage('en')}>en</button>
        <button onClick={() => changeLanguage('es')}>es</button>
        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" type="text" placeholder="Search" value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to="/drivers/new_driver"><FontAwesomeIcon icon="user" color="white" /> {t('Create driver')} </Link>
            <Link className="btn btn-sm green" to="/drivers/new_drivers"><FontAwesomeIcon icon="users" color="white" /> {t('Create multiple drivers')} </Link>
          </div>
        </div>

        <div className="ui divided items">
          {
              filteredUsers.sort((a, b) => a.lastName > b.lastName)
              .slice(
                ((this.state.currentPage * this.state.pages) - 5),
                 this.state.currentPage * this.state.pages,
                )
              .map(user => (<UserRow
                key={user.id}
                id={user.id}
                firstName={user.firstName}
                lastName={user.lastName}
                username={user.username}
                license_number={user.driverLicenseNumber}
                image={user.image}
              />))
            }
        </div>
        <Col sm="12" md={{ size: 5, offset: 4 }}>
          { totalUsers > 5 &&
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={5}
              totalItemsCount={totalUsers}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />}
        </Col>
      </div>
    );
  }
}

UsersInfo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
  t: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.users.loading,
  users: state.auth.users,
});

const translateApp = translate('translations')(UsersInfo);

export default connect(mapStateToProps)(translateApp);
