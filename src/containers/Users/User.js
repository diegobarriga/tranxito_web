import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Graph from '../Charts/LogsGraph';
import Logs from '../Logs/Logs';
import UserInfo from './UserInfo';
import Alerts from './Alerts';
import '../../assets/styles/tabs.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux';
import getLastMod from '../../utils/updateStoreFunctions';
import Loader from '../../components/Loader/Loader';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      checking: false,
    };
  }

  componentDidMount() {
    this.checkLastMod();
    const auxArray = this.props.location.pathname.split('/');
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    const driverName = this.props.users[newCrumb].firstName;
    this.props.addBreadCrumb(driverName, false, crumbUrl);
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    if (this.state.checking || this.props.isLoading) return <Loader />;

    const { id } = this.props.match.params;
    return (
      <Aux>
        <Container>
          <Row>
            <Col md={{ size: 8 }}>
              <Breadcrumb>
                <Link className="section" to="/drivers">Home</Link>
                {
                  this.props.navigation.map((x, i) => (
                    <Aux key={i}>
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
        <br />
        <Container>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                General Information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Activity
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Alerts
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <div className="tabDiv">
                <Container>
                  <UserInfo id={id} />
                  <Graph id={id} />
                </Container>
              </div>
            </TabPane>
            <TabPane tabId="2">
              <div className="tabDiv">
                <Container>
                  <UserInfo id={id} />
                  <Logs id={id} type="user" />
                </Container>
              </div>
            </TabPane>
            <TabPane tabId="3">
              <div className="tabDiv">
                <Container>
                  <Alerts id={id} activeTab={this.state.activeTab} />
                </Container>
              </div>
            </TabPane>
          </TabContent>
        </Container>
      </Aux>
    );
  }
}

User.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  id: PropTypes.number,
  isLoading: PropTypes.bool.isRequired,
  updateUsers: PropTypes.func.isRequired,
  updateLastMod: PropTypes.func.isRequired,
  lastMod: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

User.defaultProps = {
  id: undefined,
};

const mapDispatchToProps = dispatch => ({
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
  updateUsers: (motorCarrierId, token) =>
    dispatch(actions.updateUsers(motorCarrierId, token)),
});

const mapStateToProps = state => ({
  users: state.auth.users,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
  isLoading: state.auth.loading,
  lastMod: state.auth.lastMod,
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
