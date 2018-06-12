import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Graph from './graph';
import UserLogs from './UserLogs';
import UserInfo from './UserInfo';
import '../../assets/styles/tabs.css';
import * as actions from '../../store/actions/index';


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
    const newCrumb = auxArray[auxArray.length - 1];
    const driverName = this.props.users[newCrumb].first_name;
    this.props.addBreadCrumb(driverName, false);
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
      <div>
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
      </div>
    );
  }
}

User.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  id: PropTypes.number,
};

User.defaultProps = {
  id: undefined,
};

const mapDispatchToProps = dispatch => ({
  addBreadCrumb: (urlString, restart) => dispatch(actions.addNewBreadCrumb(urlString, restart)),
});

const mapStateToProps = state => ({
  users: state.auth.users,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
