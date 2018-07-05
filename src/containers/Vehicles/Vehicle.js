import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'semantic-ui-react';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { translate } from 'react-i18next';
import VehicleInfo from './VehicleInfo';
import Device from './Device';
import Logs from '../Logs/Logs';
// import Heatmap from './Heatmap';
import '../../assets/styles/tabs.css';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux';
import getLastMod from '../../utils/updateStoreFunctions';
import Loader from '../../components/Loader/Loader';

class Vehicle extends React.Component {
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
    if (this.props.navigation.length > 2) {
      this.props.popCrumb();
    }
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    const vehicleModel = this.props.vehicles[newCrumb].model;
    const vehicleMaker = this.props.vehicles[newCrumb].carMaker;
    const vehiclePlaque = this.props.vehicles[newCrumb].plaque;
    const vehicleName = `${vehicleModel} ${vehicleMaker} ${vehiclePlaque}`;
    this.props.addBreadCrumb(vehicleName, false, crumbUrl);
  }

  async checkLastMod() {
    this.setState({ checking: true });
    const lastMod = await getLastMod(this.props.token);

    if (lastMod.vehicles !== this.props.lastMod.vehicles) {
      this.props.updateVehicles(this.props.motorCarrierId, this.props.token);
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
              {t('Heatmap')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              {t('Device')}
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
                
              </Container>
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="tabDiv">
              <Container>
                <Device id={id} />
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
  popCrumb: PropTypes.func.isRequired,
  vehicles: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  mcName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  updateVehicles: PropTypes.func.isRequired,
  updateLastMod: PropTypes.func.isRequired,
  lastMod: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

Vehicle.defaultProps = {
  id: undefined,
};

const mapStateToProps = state => ({
  vehicles: state.auth.vehicles,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
  isLoading: state.auth.loading,
  lastMod: state.auth.lastMod,
  token: state.auth.token,
  role: state.auth.role,
  mcName: state.auth.mcName,
  motorCarrierId: state.auth.motorCarrierId,
});

const mapDispatchToProps = dispatch => ({
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
  popCrumb: () => dispatch(actions.popCrumb()),
  updateVehicles: (motorCarrierId, token) =>
    dispatch(actions.updateVehicles(motorCarrierId, token)),
});

const translateFunc = translate('translations')(Vehicle);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
