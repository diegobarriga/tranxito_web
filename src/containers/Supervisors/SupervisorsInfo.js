import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import UserRow from './SupervisorsRow';
import '../../assets/styles/forms.css';
import Loader from '../../components/Loader/Loader';


class SupervisorsInfo extends React.Component {
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
      user.first_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.last_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) &&
      user.account_status === true && user.account_type === 'S'));

    const totalUsers = filteredUsers.length;
    return (
      <div>
        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" placeholder="Search" type="text" value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to={`/supervisors/${this.props.id}/new_supervisor`}><FontAwesomeIcon icon="user" color="white" /> Create Supervisor</Link>
          </div>
        </div>

        <div className="ui divided items">
          {
              filteredUsers.sort((a, b) => a.last_name > b.last_name)
              .slice(
                ((this.state.currentPage * this.state.pages) - 5),
                 this.state.currentPage * this.state.pages,
                )
              .map(user => (<UserRow
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                username={user.username}
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

SupervisorsInfo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
  id: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.users.loading,
  users: state.auth.supervisors,
});

export default connect(mapStateToProps)(SupervisorsInfo);
