import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import UserInfo from '../UserInfo';
import '../../../assets/styles/tabs.css';
import LogsTable from './LogsTable';
import VehiclesTab from './VehiclesTab';
// import * as actions from '../../../store/actions/index';


class DriverProfile extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  componentWillMount() {
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <Container>
        <Row className="driver-container">
          <Col md={{ size: 12 }}>
            <UserInfo isDriver={true} id={this.props.id} />
          </Col>
        </Row>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
                Certify Logs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
                Assign Logs
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="tabDiv">
              <br />
              <LogsTable
                type="user"
                id={this.props.id}
                isNotAuth={false}
                isCerti={true}
              />
              <br />
              <br />
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="tabDiv">
              <br />
              <LogsTable
                type="user"
                id={this.props.id}
                isNotAuth={true}
                isCerti={false}
              />
              <br />
              <br />
            </div>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}

DriverProfile.propTypes = {
  id: PropTypes.number.isRequired,
};

/*
DriverProfile.defaultProps = {
  id: undefined,
};
*/

const mapStateToProps = state => ({
  id: state.auth.userId,
  token: state.auth.token,
});

export default withRouter(connect(mapStateToProps)(DriverProfile));
