import React, {Component} from 'react';
import axios, { post } from 'axios';
import TemplateCSV from '../templates/template_csv';
import styles from '../../../assets/styles/forms.css';
import { Container, Row, Col } from 'reactstrap';
import CreateVehicleForm from './CreateVehicleForm';

class CreateVehicleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.postData = this.postData.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.postData(this.state.data).then((response) => {
      console.log(response.data);
      console.log(response.status);
      if (response.status === 201) {
        this.setState({ type: 'success', message: 'We have created all the new vehicles. You will be able to see them shortly in the application.' });
      } else {
        this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      }
    });
  }

  postData(data) {
    const url = 'https://private-459d3-elde2e.apiary-mock.com/vehicles';
    console.log(data);
    return post(url, data);
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
              <h1>Create New Vehicle</h1>
              <CreateVehicleForm submit={this.onFormSubmit}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default CreateVehicleView;
