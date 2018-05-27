import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Map from './Map';
import Summary from './Summary';
import DutyStatusStats from './DutyStatusStats';
import AlertsStats from './AlertsStats';
import * as actions from '../../store/actions/tracking';
import Loader from '../../components/Loader/Loader';
import '../../assets/styles/tabs.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  componentDidMount() {
    this.props.getTrackings(this.props.token, this.props.motorCarrierId);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
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
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Map
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Duty Status Stats
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Alerts Stats
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="tabDiv">
              <Container>
                <Summary />
                <Map />
              </Container>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="tabDiv">
              <Container>
                <DutyStatusStats activeTab={this.state.activeTab} />
              </Container>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="tabDiv">
              <Container>
                <AlertsStats activeTab={this.state.activeTab} />
              </Container>
            </div>
          </TabPane>
        </TabContent>
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
