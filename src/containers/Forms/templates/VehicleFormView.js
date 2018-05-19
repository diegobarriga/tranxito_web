import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Container, Row, Col } from 'reactstrap';
import VehicleForm from './VehicleForm';
import api from '../../../services/api';

class VehicleFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      picture: null,
    };
    this.postData = this.postData.bind(this);
    this.patchData = this.patchData.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.imgUpload = this.imgUpload.bind(this);
  }

  onFormSubmit(formData) {
    if (formData.picture !== '') {
      this.imgUpload(formData.picture).then((imgResponse) => {
        if (imgResponse.status === 200) {
          // setiamos el nombre de la imagen con la respuesta
          const submitData = {
            ...formData.data,
            image: imgResponse.data.result.files.file[0].name,
          };
          console.log(submitData);
          // Si estamos creando un usuario
          if (this.props.isCreate) {
            this.postData(submitData).then((response) => {
              if (response.status === 200) {
                this.setState({ type: 'success', message: 'We have created the new vehicle.' });
              } else {
                this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
              }
            });
          // Si estamos editando un usuario
          } else {
            this.patchData(submitData).then((response) => {
              if (response.status === 200) {
                this.setState({ type: 'success', message: 'We have edited the vehicle.' });
              } else {
                this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
              }
            });
          }
        } else {
          this.setState({ type: 'danger', message: 'Sorry, there has been an error with the image upload. Please try again later.' });
        }
      });
    } else {
      // Si estamos creando un usuario
      if (this.props.isCreate) {
        this.postData(formData.data).then((response) => {
          if (response.status === 200) {
            this.setState({ type: 'success', message: 'We have created the new vehicle.' });
          } else {
            this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
          }
        });
      // Si estamos editando un usuario
      } else {
        this.patchData(formData.data).then((response) => {
          if (response.status === 200) {
            this.setState({ type: 'success', message: 'We have edited the vehicle.' });
          } else {
            this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
          }
        });
      }
    }
  }

  postData(data) {
    return api.motorCarriers.createMotorCarrierVehicle(
      this.props.motorCarrierId,
      this.props.token,
      data,
    );
  }

  patchData(data) {
    return api.vehicles.updateVehicle(this.props.match.params.id, this.props.token, data);
  }

  imgUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return api.images.vehicleImageUpload(formData, config, this.props.token);
  }


  render() {
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

    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <h1>{title}</h1>
            <VehicleForm
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

VehicleFormView.propTypes = {
  title: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

export default withRouter(connect(mapStateToProps)(VehicleFormView));
