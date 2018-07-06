import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import UserInfo from '../UserInfo';
import '../../../assets/styles/tabs.css';
import LogsTable from './LogsTable';

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
    const { t } = this.props;
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
                {t('Certify Events')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
                {t('Assign Events')}
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
                content="Certify My Logs"
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
                content="Assign Events"
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

const translateFunc = translate('translations')(DriverProfile);
export default withRouter(connect(mapStateToProps)(translateFunc));
