import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Label, Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';
import axios, { post, patch, get } from 'axios';
import TemplateCSV from '../templates/template_csv';
import '../../../assets/styles/forms.css';


class DriverForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        first_name: '',
        last_name: '',
        email: '',
        driver_license_number: '',
        licenses_issuing_state: '',
        exempt_driver_configuration: '0',
        time_zone_offset_utc: '4',
        starting_time_24_hour_period: '',
        move_yards_use: '0',
        default_use: '0',
        personal_use: '',
        image: '',
        username: '',
        password: '',
        account_type: 'D',
        account_status: true,
      },
      picture: null,
      type: '',
      message: '',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.postData = this.postData.bind(this);
  }

  componentDidMount() {
    // Si estamos editando el documento cargamos los datos del usuario para completar el form
    if (!this.props.isCreate) {
      this.getUserInfo().then((response) => {
        if (response.status === 200) {
          console.log('response');
          console.log(response);
          const newData = {
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            driver_license_number: response.data.driver_license_number,
            licenses_issuing_state: response.data.licenses_issuing_state,
            exempt_driver_configuration: response.data.exempt_driver_configuration,
            time_zone_offset_utc: response.data.time_zone_offset_utc,
            starting_time_24_hour_period: response.data.starting_time_24_hour_period,
            move_yards_use: response.data.move_yards_use,
            default_use: response.data.default_use,
            personal_use: response.data.personal_use,
            image: response.data.image,
            username: response.data.username,
            password: '',
            account_type: 'D',
            account_status: true,
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
      console.log(imgResponse.data);
      console.log(imgResponse.status);
      if (imgResponse.status === 200) {
        console.log('imagen creada correctamente');
        // setiamos el nombre de la imagen con la respuesta
        const updatedState = {
          ...this.state.data,
          image: imgResponse.name,
        };
        this.setState({ data: updatedState });

        // Si estamos creando un usuario
        if (this.props.isCreate) {
          this.postData(this.state.data).then((response) => {
            console.log(response.data);
            console.log(response.status);
            if (response.status === 200) {
              this.setState({ type: 'success', message: 'We have created all the new drivers. You will be able to see them shortly in the application.' });
            } else {
              this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
            }
          });

        // Si estamos editando un usuario
        } else {
          this.patchData(this.state.data).then((response) => {
            console.log(response.data);
            console.log(response.status);
            if (response.status === 200) {
              this.setState({ type: 'success', message: 'We have created all the new drivers. You will be able to see them shortly in the application.' });
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
      state.picture = e.target.value;
      console.log(this.state.picture);
    } else {
      state.data[e.target.name] = e.target.value;
    }


    this.setState(state);
  }

  getUserInfo() {
    const url = `https://e2e-eld-test.herokuapp.com/api/People/${this.props.match.params.id}?access_token=${this.props.token}`;
    return get(url);
  }


  postData(data) {
    const url = `https://e2e-eld-test.herokuapp.com/api/People?access_token=${this.props.token}`;
    return post(url, data);
  }

  patchData(data) {
    const url = `https://e2e-eld-test.herokuapp.com/api/People/${this.props.match.params.id}?access_token=${this.props.token}`;
    return patch(url, data);
  }

  imgUpload(file) {
    const url = `https://e2e-eld-test.herokuapp.com/api/imageContainers/People/upload?access_token=${this.props.token}`;
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  }

  createSelectItems(min, max) {
    const items = [];
    for (let i = min; i <= max; i++) {
      items.push(<option>{i}</option>);
    }
    return items;
  }


  render() {
    if (this.state.type && this.state.message) {
      const classString = `alert alert-${this.state.type}`;
      var status = (<div id="status" className={classString} ref="status">{this.state.message} </div>);
    }

    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };

    return (
      <Container>
        <Row>
          { status }
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <h1 style={h1Style}> {this.props.title }</h1>
            <Form onSubmit={this.onFormSubmit}>
              <FormGroup>
                <Input type="string" value={this.state.data.first_name} name="first_name" placeholder="First Name" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="string" value={this.state.data.last_name} name="last_name" placeholder="Last Name" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="email" name="email" value={this.state.data.email} placeholder="Email" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="string" name="driver_license_number" value={this.state.data.driver_license_number} placeholder="Driver License Number" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="string" name="licenses_issuing_state" value={this.state.data.licenses_issuing_state} placeholder="Licenses Issuing State" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="select" name="exempt_driver_configuration" value={this.state.data.exempt_driver_configuration} placeholder="Exempt Driver Configuration" onChange={this.onChange}>
                  <option>1</option>
                  <option>E</option>
                  <option selected="selected">0</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="select" name="time_zone_offset_utc" value={this.state.data.time_zone_offset_utc} placeholder="Time Zone Offset UTC" onChange={this.onChange}>
                  {this.createSelectItems(4, 11)}
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="datetime-local" name="starting_time_24_hour_period" value={this.state.data.starting_time_24_hour_period} placeholder="Starting Time 24 Hour Period" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="select" name="move_yards_use" placeholder="Move Yards Use" value={this.state.data.move_yards_use} onChange={this.onChange}>
                  {this.createSelectItems(0, 1)}
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="select" name="default_use" placeholder="Default Use" value={this.state.data.default_use} onChange={this.onChange}>
                  {this.createSelectItems(0, 1)}
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="select" name="personal_use" placeholder="Personal Use" value={this.state.data.personal_use} onChange={this.onChange}>
                  {this.createSelectItems(0, 1)}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="image">Image</Label>
                <Input type="file" name="picture" value={this.state.data.picture} className="center-item" onChange={this.onChange} />
              </FormGroup>

              <FormGroup>
                <Input type="string" name="username" placeholder="Username" value={this.state.data.username} onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" placeholder="Password" onChange={this.onChange} />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

DriverForm.propTypes = {
  title: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,

});

export default withRouter(connect(mapStateToProps)(DriverForm));
