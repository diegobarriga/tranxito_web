import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Container, Row, Col, Label } from 'reactstrap';
import '../../../assets/styles/forms.css';
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
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.imgUpload(this.state.picture).then((imgResponse) => {
      console.log('aaaaaaa');

      if (imgResponse.status === 200) {
        console.log('imagen creada correctamente');
        console.log(imgResponse.data.result.files.file[0].name);
        // setiamos el nombre de la imagen con la respuesta
        const updatedState = {
          ...this.state.data,
          image: imgResponse.data.result.files.file[0].name,
        };
        this.setState({ data: updatedState });

        // Si estamos creando un usuario
        if (this.props.isCreate) {
          this.postData(this.state.data).then((response) => {
            console.log(response.data);
            console.log(response.status);
            if (response.status === 200) {
              this.setState({ type: 'success', message: 'We have created the new vehicle.' });
            } else {
              this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
            }
          });

        // // Si estamos editando un usuario
        } else {
          this.patchData(this.state.data).then((response) => {
            console.log(response.data);
            console.log(response.status);
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
    if (this.state.type && this.state.message) {
      const classString = `alert alert-${this.state.type}`;
      var status = (<div id="status" className={classString} ref="status">
        {this.state.message}
      </div>);
    }

    return (
      <div> { status }
        <Container>
          <Row>
            <Col sm="12" md={{ size: 5, offset: 3 }}>
              <h1>{this.props.title}</h1>
            </Col>
          </Row>
        </Container>
      </div>
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
