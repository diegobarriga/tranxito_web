import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Map from './Map';
import Summary from './Summary';
import DoughnutChart from './DoughnutChart';
import * as actions from '../../store/actions/tracking';
import Loader from '../../components/Loader/Loader';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getTrackings(this.props.token, this.props.motorCarrierId);
  }

  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }
    if (this.props.loading === true) return <Loader />;
    const alert = null;

    return (
      <Aux>
        { alert }
        { authRedirect }
        <Container>
          <DoughnutChart />
          <Summary />
          <Map />
        </Container>

      </Aux>
    );
  }
}


Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getTrackings: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isLoading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
  loading: state.trackings.loading,
});

const mapDispatchToProps = dispatch => ({
  getTrackings: (token, motorCarrierId) => dispatch(actions.getTrackings(token, motorCarrierId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
