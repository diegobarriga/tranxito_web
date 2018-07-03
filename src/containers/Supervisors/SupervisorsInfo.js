import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import UserRow from './SupervisorsRow';
import '../../assets/styles/forms.css';
import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions/index';
import getLastMod from '../../utils/updateStoreFunctions';

class SupervisorsInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pages: '5',
      currentPage: '1',
      checking: false,
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.checkLastMod();
  }

  async checkLastMod() {
    this.setState({ checking: true });
    const lastMod = await getLastMod(this.props.motorCarrierId, this.props.token);

    if (lastMod.people !== this.props.lastMod.people) {
      this.props.updateUsers(this.props.motorCarrierId, this.props.token);
      this.props.updateLastMod(lastMod);
    }
    this.setState({ checking: false });
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  render() {
    if (this.state.checking || this.props.isLoading) return <Loader />;

    const filteredUsers = Object.values(this.props.users).filter(user => ((
      user.firstName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.lastName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
      user.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) &&
      user.accountStatus === true && user.accountType === 'S'));

    const totalUsers = filteredUsers.length;
    const { t } = this.props;
    return (
      <div>
        <div className="inlineBox">
          <FontAwesomeIcon icon="search" className="customIcon" /><input className="customInput" placeholder={t('Search')} type="text" value={this.state.search} onChange={this.updateSearch} />
          <div className="buttons">
            <Link className="btn btn-sm green spacing" to={`/supervisors/${this.props.id}/new_supervisor`}><FontAwesomeIcon icon="user" color="white" /> {t('Create Supervisor')}</Link>
          </div>
        </div>

        <div className="ui divided items">
          {
              filteredUsers.sort((a, b) => a.lastName.localeCompare(b.lastName))
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
                image={user.image}
                email={user.email}
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
  updateUsers: PropTypes.func.isRequired,
  updateLastMod: PropTypes.func.isRequired,
  lastMod: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.auth.loading,
  users: state.auth.users,
  lastMod: state.auth.lastMod,
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

const mapDispatchToProps = dispatch => ({
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
  updateUsers: (motorCarrierId, token) =>
    dispatch(actions.updateUsers(motorCarrierId, token)),
});
const translateFunc = translate('translations')(SupervisorsInfo);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
