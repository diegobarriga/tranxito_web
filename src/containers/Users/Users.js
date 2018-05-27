import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import { Redirect } from 'react-router-dom';
import UsersInfo from './UsersInfo';
import Alert from '../Alert/Alert';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';


class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: '1',
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  render() {
    const totalUsers = Object.keys(this.props.users).length;
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    /* Alert */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = 'The driver was deleted successfully';
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = 'Error the driver was not deleted';
      alert = (<Alert alertType="FAIL" message={msg} />);
    }

    return (
      <Aux>
        { authRedirect }
        { alert }
        <h1> Drivers </h1>
        <Container>
          <Row>
            <Col md="11">
              <UsersInfo pageNumber={this.state.currentPage} />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col sm="12" md={{ size: 6, offset: 4 }}>
              <Pagination
                activePage={this.state.currentPage}
                itemsCountPerPage={5}
                totalItemsCount={totalUsers}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}
Users.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
  error: PropTypes.object,
};

Users.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  users: state.auth.users,
  isAuthenticated: state.auth.token !== null,
  error: state.users.error,
});

export default connect(mapStateToProps)(Users);
