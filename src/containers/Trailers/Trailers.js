import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { withRouter } from 'react-router';
import { Breadcrumb } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { translate } from 'react-i18next';
import i18n from '../../i18n';
import TrailersInfo from './TrailersInfo';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import Alert from '../Alert/Alert';
import * as actions from '../../store/actions/index';

class Trailers extends React.Component {
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
      msg = t('Trailer was deleted successfully');
      alert = (<Alert alertType="SUCCESS" message={msg} />);
    } else {
      msg = t('Error: cannot delete trailer');
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
                <Link className="section" to="/drivers">Home</Link>
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
              <I18nextProvider i18n={i18n}>
                <TrailersInfo />
              </I18nextProvider>
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}

Trailers.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  error: PropTypes.object,
};

Trailers.defaultProps = {
  error: null,
};

const mapStateToProps = state => ({
  trailers: state.auth.trailers,
  isAuthenticated: state.auth.token !== null,
  error: state.auth.error,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
});

const mapDispatchToProps = dispatch => ({
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
});
const translateFunc = translate('translations')(Trailers);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
