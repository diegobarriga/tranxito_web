import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Graph from './graph';
import UserLogs from './UserLogs';
import UserInfo from './UserInfo';
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
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    const driverName = this.props.users[newCrumb].first_name;
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
    return (
      <Aux>
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
                  <UserLogs id={id} />
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
});

const mapStateToProps = state => ({
  users: state.auth.users,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
