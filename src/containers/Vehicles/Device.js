import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Container, Col, Button, Form, FormGroup, Input, FormFeedback, Label } from 'reactstrap';
import { translate } from 'react-i18next';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Loader from '../../components/Loader/Loader';
import VehicleDeviceForm from '../Forms/templates/VehicleDeviceForm';
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
      loadUnlink: false,
      isLoading: false,
      loadLink: false,
    };
    this.linkVehicle = this.linkVehicle.bind(this);
    this.unlinkVehicle = this.unlinkVehicle.bind(this);
    this.unlink = this.unlink.bind(this);
    this.getVehicleDevice = this.getVehicleDevice.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getVehicleDevice();
  }

  async onFormSubmit(formData) {
    const { t } = this.props;
    this.setState({ isLoading: true });
    try {
      const response = await this.linkVehicle(formData);
      console.log('resp---', response.headers);
      if (response.status === 200) {
        this.setState({ type: 'success', message: t('We have linked the device to te vehicle.') });
        this.getVehicleDevice();
      } else {
        this.setState({ isLoading: false });
        this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
      }
    } catch (err) {
      this.setState({ isLoading: false });
      this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
    }
  }


  async getVehicleDevice() {
    this.setState({ isLoading: true });
    try {
      const res = await api.vehicles.getVehicleDevice(this.props.id, this.props.token);
      console.log(res);
      if (res.status === 200) {
        this.setState({ device: res.data, isLoading: false });
      } else {
        this.setState({ device: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      this.setState({ device: null, isLoading: false });
    }
  }

  linkVehicle(data) {
    return api.devices.linkVehicle(data.deviceId, this.props.token, this.props.id);
  }

  unlink() {
    const { t } = this.props;
    this.setState({ isLoading: true });
    this.unlinkVehicle(this.state.device.id).then(async (response) => {
      // console.log('resp---', response.headers);
      if (response.status === 200) {
        this.setState({ isLoading: false, device: null });
        this.setState({ type: 'success', message: t('We have unlinked the device to te vehicle.') });
      } else {
        this.setState({ isLoading: false });
        this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
      }
    }).catch(() => {
      this.setState({ isLoading: false });
      this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
    });
  }

  unlinkVehicle(deviceId) {
    return api.devices.unlinkVehicle(deviceId, this.props.token);
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
      loadUnlink,
      loadLink,
    } = this.state;

    if (isLoading || loadUnlink || loadLink) return <Loader />;

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
        { this.state.device &&
          <div>
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
                  <p><b>Sequence Id:</b> {this.state.device.sequenceId}</p>
                  <p><b>{t('IMEI')}:</b> {this.state.device.imei}</p>
                  <p>
                    <b>MAC Address (Bluetooth):</b>  {this.state.device.bluetoothMac.toUpperCase()}
                  </p>
                  <p>
                    <b>{t('Configuration status')}:</b> {this.state.device.configStatus ? <FontAwesomeIcon icon="check" color="green" /> : <FontAwesomeIcon icon="times" color="red" />}
                  </p>
                </div>
                <Button style={{ marginTop: '5px' }} onClick={this.unlink} disabled={loadUnlink}>{t('Unlink')}</Button>
              </Col>
            </Row>
            <hr />
          </div>
        }
        <Row>
          <Col sm="12" md={{ size: 9 }}>
            <h4 style={h1Style}>{t('Link Device')}</h4>
            <VehicleDeviceForm submit={this.onFormSubmit} />
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
