import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import VehicleInfo from './VehicleInfo';
import Logs from '../Logs/Logs';
import Heatmap from './Heatmap';
import '../../assets/styles/tabs.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux';

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
    const vehicleMaker = this.props.vehicles[newCrumb].carMaker;
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
                <Logs id={id} type="vehicle" />
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
      </Aux>
    );
  }
}

Vehicle.propTypes = {
  id: PropTypes.number,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  vehicles: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  mcName: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
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
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
  role: state.auth.role,
  mcName: state.auth.mcName,
  motorCarrierId: state.auth.motorCarrierId,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Vehicle));
