import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import UsersInfo from './SupervisorsInfo';
import Alert from '../Alert/Alert';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';


class Supervisors extends React.Component {
  render() {
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
        <Container>
          <Row>
            <Col md="11">
              <UsersInfo id={this.props.mcId} />
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}
Supervisors.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  mcId: PropTypes.any.isRequired,
  error: PropTypes.object,
};

Supervisors.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  supervisors: state.auth.supervisors,
  isAuthenticated: state.auth.token !== null,
  error: state.users.error,
  mcId: state.auth.motorCarrierId,
});

export default connect(mapStateToProps)(Supervisors);
