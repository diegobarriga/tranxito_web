import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Container, Row, Col, Label } from 'reactstrap';
import axios from 'axios';
import '../../../assets/styles/forms.css';
import * as path from '../../../store/actions/basepath';

class CreateVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        vin: '',
        CMV_power_unit_number: '',
        model: '',
        car_maker: '',
        plaque: '',
        state: '',
        IMEI_ELD: '',
        image: '',
      },
      type: '',
      message: '',
      picture: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.postData = this.postData.bind(this);
  }

  componentDidMount() {
    // Si estamos editando el documento cargamos los datos del usuario para completar el form
    if (!this.props.isCreate) {
      this.getVehicleInfo().then((response) => {
        if (response.status === 200) {
          console.log('response');
          console.log(response);
          const newData = {
            vin: response.data.vin,
            CMV_power_unit_number: response.data.CMV_power_unit_number,
            model: response.data.model,
            car_maker: response.data.car_maker,
            plaque: response.data.plaque,
            state: response.data.state,
            IMEI_ELD: response.data.IMEI_ELD,
            image: response.data.image,
          };
          this.setState({ data: newData });
          console.log(this.state);
        } else {
          console.log('Error loading user info');
        }
      });
    }
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

  onChange(e) {
    const state = this.state;
    if (e.target.name === 'picture') {
      state.picture = e.target.files[0];
      console.log(this.state.picture);
    } else {
      state.data[e.target.name] = e.target.value;
    }

    this.setState(state);
  }

  getVehicleInfo() {
    const url = `${path.BASE_PATH}/api/Vehicles/${this.props.match.params.id}?access_token=${this.props.token}`;
    return axios.get(url);
  }


  postData(data) {
    const url = `${path.BASE_PATH}/api/MotorCarriers/${this.props.motorCarrierId}/vehicles?access_token=${this.props.token}`;
    console.log(data);
    return axios.post(url, data);
  }

  patchData(data) {
    const url = `${path.BASE_PATH}/api/Vehicles/${this.props.match.params.id}?access_token=${this.props.token}`;
    return axios.patch(url, data);
  }

  imgUpload(file) {
    const url = `${path.BASE_PATH}/api/imageContainers/Vehicles/upload?access_token=${this.props.token}`;
    const formData = new FormData();
    console.log(file);
    formData.append('file', file);
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return axios.post(url, formData, config);
  }


  render() {
    if (this.state.type && this.state.message) {
      const classString = `alert alert-${this.state.type}`;
      var status = (<div id="status" className={classString} ref="status">
        {this.state.message}
      </div>);
    }

    return (
      <div>{status}
        <Container>
          <Row>
            <Col sm="12" md={{ size: 5, offset: 3 }}>
              <h1>{this.props.title}</h1>
              <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                  <Label for="image">VIN Number</Label>
                  <Input type="string" name="vin" value={this.state.data.vin} placeholder="VIN Number" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">CMV Power Unit Number</Label>
                  <Input type="string" name="CMV_power_unit_number" value={this.state.data.CMV_power_unit_number} placeholder="CMV Power Unit Number" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Vehicle Model</Label>
                  <Input type="string" name="model" placeholder="Vehicle Model" value={this.state.data.model} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Car Maker</Label>
                  <Input type="string" name="car_maker" placeholder="Car Maker" value={this.state.data.car_maker} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Plaque</Label>
                  <Input type="string" name="plaque" placeholder="Plaque" value={this.state.data.plaque} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">State</Label>
                  <Input type="string" name="state" placeholder="State" value={this.state.data.state} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">IMEI ELD</Label>
                  <Input type="number" name="IMEI_ELD" placeholder="IMEI ELD" value={this.state.data.IMEI_EL} onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Image</Label>
                  <Input type="file" name="picture" value={this.state.data.first_name} className="center-item" onChange={this.onChange} />
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

CreateVehicle.propTypes = {
  title: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,

});

export default withRouter(connect(mapStateToProps)(CreateVehicle));
