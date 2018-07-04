import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Container, Col } from 'reactstrap';
import { translate } from 'react-i18next';
import Loader from '../../components/Loader/Loader';
import '../../assets/styles/buttons.css';
import getLastMod from '../../utils/updateStoreFunctions';
import api from '../../services/api';
import * as actions from '../../store/actions/index';
import Alert from '../Alert/Alert';

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      isLoading: false,
    };
    this.linkVehicle = this.linkVehicle.bind(this);
    this.unlinkVehicle = this.unlinkVehicle.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.getUserLogs(this.props.token, this.props.id);
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

  linkVehicle(data) {
    return api.devices.linkVehicle(this.props.id, this.props.token, data);
  }

  unlinkVehicle() {
    return api.people.unlinkVehicle(this.props.id, this.props.token);
  }

  render() {
    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };

    if (this.state.isLoading) return <Loader />;

    let alert;
    if (this.state.type && this.state.message) {
      if (this.state.type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={this.state.message} />);
      } else if (this.state.type === 'danger') {
        alert = (<Alert alertType="FAIL" message={this.state.message} />);
      }
    }

    const { t } = this.props;
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

          </Col>
          <Col sm="8" md={{ size: 8 }}>
            <p>{}</p>
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
  updateLastMod: PropTypes.func.isRequired,
  lastMod: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  users: state.auth.users,
  id: PropTypes.string.isRequired,
  token: state.auth.token,
  lastMod: state.auth.lastMod,
  motorCarrierId: state.auth.motorCarrierId,
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(actions.createUser(user)),
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
});

const translateFunc = translate('translations')(Device);
export default connect(mapStateToProps, mapDispatchToProps)(translateFunc);
