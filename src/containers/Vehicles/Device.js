import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Container, Col } from 'reactstrap';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Loader from '../../components/Loader/Loader';
import '../../assets/styles/buttons.css';
// import getLastMod from '../../utils/updateStoreFunctions';
import syrusImg from './../../assets/images/syrus.png';
import api from '../../services/api';
import * as actions from '../../store/actions/index';
import Alert from '../Alert/Alert';

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      device: {
        bluetoothMac: '',
        imei: '',
        configScript: '',
        configStatus: false,
        sequenceId: -1,
      },
      isLoading: false,
    };
    this.linkVehicle = this.linkVehicle.bind(this);
    this.unlinkVehicle = this.unlinkVehicle.bind(this);
    this.getVehicleDevice = this.getVehicleDevice.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getVehicleDevice();
  }

  // onFormSubmit(formData) {
  //   const { t } = this.props;
  //   this.setState({ isLoading: true });
  //
  //   this.patchData(formData.data).then(async (response) => {
  //     // console.log('resp---', response.headers);
  //     if (response.status === 200) {
  //
  //       const lastModAPI = await getLastMod(this.props.token);
  //       const { lastMod } = this.props;
  //       lastMod.people = lastModAPI.people;
  //       this.props.updateLastMod(lastMod);
  //
  //       this.setState({ isLoading: false });
  //       this.setState({ type: 'success', message: t('We have aplied the configurations.') });
  //     } else {
  //       this.setState({ isLoading: false });
  //       this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
  //     }
  //   }).catch(() => {
  //     this.setState({ isLoading: false });
  //     this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
  //   });
  // }

  getVehicleDevice() {
    this.setState({ isLoading: true });
    api.vehicles.getVehicleDevice(this.props.id, this.props.token).then((res) => {
      try {
        this.setState({ device: res.data, isLoading: false });
      } catch (err) {
        console.log(err);
        this.setState({ isLoading: false });
      }
    });
  }

  linkVehicle(deviceId, data) {
    return api.devices.linkVehicle(deviceId, this.props.token, data);
  }

  unlinkVehicle(deviceId) {
    return api.people.unlinkVehicle(deviceId, this.props.token);
  }

  render() {
    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };
    const {
      isLoading,
      type,
      message,
    } = this.state;
    const {
      bluetoothMac,
      imei,
      sequenceId,
      configStatus,
    } = this.state.device;

    if (isLoading) return <Loader />;

    let alert;
    if (type && message) {
      if (type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={message} />);
      } else if (type === 'danger') {
        alert = (<Alert alertType="FAIL" message={message} />);
      }
    }

    const { t } = this.props;

    // console.log(device);
    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            <h4 style={h1Style}>{t('Current device')}</h4>
          </Col>
        </Row>
        <Row>
          <Col sm="4" md={{ size: 4 }}>
            <img className="media-object" alt="syrus-img" width="250" src={syrusImg} />
          </Col>
          <Col sm="8" md={{ size: 8 }}>
            <div className="right">
              <p><b>Sequence Id:</b> {sequenceId}</p>
              <p><b>{t('IMEI')}:</b> {imei}</p>
              <p>
                <b>MAC Address (Bluetooth):</b>  {bluetoothMac.toUpperCase()}
              </p>
              <p>
                <b>{t('Configuration status')}:</b> {configStatus ? <FontAwesomeIcon icon="check" color="green" /> : <FontAwesomeIcon icon="times" color="red" />}
              </p>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm="12" md={{ size: 9 }}>
            <h4 style={h1Style}>{t('Link Device')}</h4>
          </Col>
        </Row>
      </Container>

    );
  }
}

Device.propTypes = {
  token: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  // updateLastMod: PropTypes.func.isRequired,
  // lastMod: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(actions.createUser(user)),
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
});

const translateFunc = translate('translations')(Device);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
