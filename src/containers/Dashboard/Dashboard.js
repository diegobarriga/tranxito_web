import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Breadcrumb } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import classnames from 'classnames';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Col, Row } from 'reactstrap';
import Aux from '../../hoc/Aux';
import Map from './Map';
import Summary from './Summary';
import DutyStatusStats from './DutyStatusStats';
import AlertsStats from './AlertsStats';
import * as actions from '../../store/actions/index';
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
    const auxArray = this.props.location.pathname.split('/');
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    this.props.addBreadCrumb(newCrumb, true, crumbUrl);
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
        <Container>
          <Row>
            <Col md={{ size: 8 }}>
              <Breadcrumb>
                <Link className="section" to="/">Home</Link>
                {
                  this.props.navigation.map((x, i) => (
                    <Aux>
                      <Breadcrumb.Divider icon="right chevron" />
                      { this.props.len - 1 > i ?
                        <Link className="section capitalize" to={this.props.naviLinks[i]}> {x} </Link>
                        :
                        <Breadcrumb.Section className="capitalize" active> {x} </Breadcrumb.Section>
                      }
                    </Aux>
                  ))
                }
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <Container>
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
        </Container>
      </Aux>
    );
  }
}


Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getTrackings: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isLoading: state.auth.loading,
  error: state.auth.error,
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
  loading: state.trackings.loading,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
});

const mapDispatchToProps = dispatch => ({
  getTrackings: (token, motorCarrierId) => dispatch(actions.getTrackings(token, motorCarrierId)),
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
