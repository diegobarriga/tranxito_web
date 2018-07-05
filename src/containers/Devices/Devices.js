import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router';
import { Breadcrumb } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import DevicesInfo from './DevicesInfo';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import Alert from '../Alert/Alert';
import * as actions from '../../store/actions/index';

class Devices extends React.Component {
  componentDidMount() {
    const auxArray = this.props.location.pathname.split('/');
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    this.props.addBreadCrumb(newCrumb, true, crumbUrl);
  }

  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    /* Alert */
    let alert;
    let msg = '';
    const { t } = this.props;
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = t('The device was deleted successfully');
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = t('Error the device was not deleted');
      alert = (<Alert alertType="FAIL" message={msg} />);
    }
    return (
      <Aux>
        { authRedirect }
        { alert }
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
          <Row>
            <Col md="11">
              <DevicesInfo />
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}

Devices.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  error: PropTypes.object,
  role: PropTypes.string.isRequired,
  mcName: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

Devices.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  devices: state.auth.devices,
  isAuthenticated: state.auth.token !== null,
  error: state.auth.error,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
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
});
const translateFunc = translate('translations')(Devices);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
