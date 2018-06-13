import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import VehicleInfo from './VehicleInfo';
import VehicleLogs from './VehicleLogs';
import Heatmap from './Heatmap';
import '../../assets/styles/tabs.css';
import * as actions from '../../store/actions/index';

class Vehicle extends React.Component {
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
    const vehicleModel = this.props.vehicles[newCrumb].model;
    const vehicleMaker = this.props.vehicles[newCrumb].car_maker;
    const vehiclePlaque = this.props.vehicles[newCrumb].plaque;
    const vehicleName = `${vehicleModel} ${vehicleMaker} ${vehiclePlaque}`;
    this.props.addBreadCrumb(vehicleName, false, crumbUrl);
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
              Heatmap
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="tabDiv">
              <Container>
                <VehicleInfo id={id} />
                <VehicleLogs id={id} />
              </Container>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="tabDiv">
              <Container>
                <Heatmap id={id} />
              </Container>
            </div>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

Vehicle.propTypes = {
  id: PropTypes.number,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  vehicles: PropTypes.object.isRequired,
};

Vehicle.defaultProps = {
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
  vehicles: state.auth.vehicles,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vehicle));
