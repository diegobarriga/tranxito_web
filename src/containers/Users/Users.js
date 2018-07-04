import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Breadcrumb } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { I18nextProvider, translate } from 'react-i18next';
import i18n from '../../i18n';
import UsersInfo from './UsersInfo';
import Alert from '../Alert/Alert';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import * as actions from '../../store/actions/index';


class Users extends React.Component {
  componentDidMount() {
    const auxArray = this.props.location.pathname.split('/');
    const url = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1];
    this.props.addBreadCrumb(newCrumb, true, url);
    this.props.updateSidebar('dashboard', false);
    this.props.updateSidebar('vehicles', false);
    this.props.updateSidebar('devices', false);
    this.props.updateSidebar('supervisors', false);
    this.props.updateSidebar('drivers', true);
  }

  render() {
    const { t } = this.props;
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    /* Alert */
    let alert;
    let msg = '';
    if (this.props.error === null) {
      alert = null;
    } else if (this.props.error.status === 200) {
      msg = t('The driver was deleted successfully');
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = t('Error the driver was not deleted');
      alert = (<Alert alertType="FAIL" message={msg} />);
    }

    return (
      <Aux>
        { authRedirect }
        { alert }
        <Container >
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
            <Col sm="12" md={{ size: 11 }}>
              <I18nextProvider i18n={i18n}>
                <UsersInfo />
              </I18nextProvider>
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}
Users.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  updateSidebar: PropTypes.func.isRequired,
  error: PropTypes.object,
  role: PropTypes.string.isRequired,
  mcName: PropTypes.string.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
};

Users.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
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
  addBreadCrumb: (urlString, restart, url) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    url,
  )),
  updateSidebar: (tabName, clicked) => dispatch(actions.updateSidebarState(tabName, clicked)),
});

const translateFunc = translate('translations')(Users);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
