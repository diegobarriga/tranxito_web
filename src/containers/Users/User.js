import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import Graph from '../Charts/LogsGraph';
import Logs from '../Logs/Logs';
import UserInfo from './UserInfo';
import Alerts from './Alerts';
import '../../assets/styles/tabs.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  componentDidMount() {
    const auxArray = this.props.location.pathname.split('/');
    if (this.props.navigation.length > 2) {
      this.props.popCrumb();
    }
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    const driverName = this.props.users[newCrumb].firstName;
    this.props.addBreadCrumb(driverName, false, crumbUrl);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { t } = this.props;
    return (
      <Aux>
        <Container>
          <Row>
            <Col md={{ size: 8 }}>
              <Breadcrumb>
                { this.props.role === 'S' && <Link className="section" to="/">Home</Link>}
                { this.props.role === 'A' && <Link className="section" to={`/motor_carriers/${this.props.motorCarrierId}`}>{this.props.mcName}</Link>}
                {
                  this.props.navigation.map((x, i) => (
                    <Aux key={i}>
                      <Breadcrumb.Divider icon="right chevron" />
                      { this.props.len - 1 > i ?
                        <Link className="section capitalize" to={this.props.naviLinks[i]}> {t(x)} </Link>
                        :
                        <Breadcrumb.Section className="capitalize" active> {t(x)} </Breadcrumb.Section>
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
                {t('General Information')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                {t('Activity')}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                {t('Alerts')}
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
  popCrumb: PropTypes.func.isRequired,
  id: PropTypes.number,
  role: PropTypes.string.isRequired,
  mcName: PropTypes.string.isRequired,
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
  popCrumb: () => dispatch(actions.popCrumb()),
});

const mapStateToProps = state => ({
  users: state.auth.users,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
  role: state.auth.role,
  mcName: state.auth.mcName,
  motorCarrierId: state.auth.motorCarrierId,
});
const translateFunc = translate('translations')(User);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
