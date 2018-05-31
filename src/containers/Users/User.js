import React from 'react';
import PropTypes from 'prop-types';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Graph from './graph';
import UserLogs from './UserLogs';
import UserInfo from './UserInfo';
import '../../assets/styles/tabs.css';


class User extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
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
  id: PropTypes.number,
  match: PropTypes.object.isRequired,
};

User.defaultProps = {
  id: undefined,
};


export default User;
