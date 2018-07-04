import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { translate } from 'react-i18next';
import DeviceForm from './DeviceForm';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';
import Alert from '../../Alert/Alert';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Aux';

class DeviceFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      isLoading: false,
    };
    this.postData = this.postData.bind(this);
    this.patchData = this.patchData.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    const auxArray = this.props.location.pathname.split('/');
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1].split('_').join(' ');
    this.props.addBreadCrumb(newCrumb, false, crumbUrl);
  }

  onFormSubmit(formData) {
    const { t } = this.props; // eslint-disable-line no-use-before-define
    this.setState({ isLoading: true });
    if (this.props.isCreate) {
      this.postData(formData.data).then((response) => {
        if (response.status === 200) {
          this.props.createDevice(response.data);
          this.setState({ isLoading: false });
          this.setState({ type: 'success', message: t('We have created the new device.') });
        } else {
          this.setState({ isLoading: false });
          this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
        }
      });
    // Si estamos editando un usuario
    } else {
      console.log(formData.data)
      this.patchData(formData.data).then((response) => {
        if (response.status === 200) {
          this.props.createDevice(response.data);
          this.setState({ isLoading: false });
          this.setState({ type: 'success', message: t('We have edited the device.') });
        } else {
          this.setState({ isLoading: false });
          this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
        }
      });
    }
  }


  postData(data) {
    return api.motorCarriers.createMotorCarrierDevice(
      this.props.motorCarrierId,
      this.props.token,
      data,
    );
  }

  patchData(data) {
    return api.motorCarriers.updateMotorCarrierDevice(
      this.props.motorCarrierId,
      this.props.match.params.id,
      this.props.token,
      data,
    );
  }

  render() {
    if (this.state.isLoading === true) return <Loader />;
    let alert;
    const {
      title,
      isCreate,
      token,
      match,
    } = this.props;

    if (this.state.type && this.state.message) {
      if (this.state.type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={this.state.message} />);
      } else if (this.state.type === 'danger') {
        alert = (<Alert alertType="FAIL" message={this.state.message} />);
      }
    }

    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };
    const { t } = this.props;
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8 }}>
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
          <Col sm="12" md={{ size: 8 }}>
            <h1 style={h1Style}>{t(title)}</h1>
            <DeviceForm
              submit={this.onFormSubmit}
              isCreate={isCreate}
              token={token}
              match={match}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

DeviceFormView.propTypes = {
  title: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  createDevice: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
});

const mapDispatchToProps = dispatch => ({
  createDevice: device => dispatch(actions.createDevice(device)),
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
});
const translateFunc = translate('translations')(DeviceFormView);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
