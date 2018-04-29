import React from 'react';
import axios, { post } from 'axios';
import TemplateCSV from '../templates/template_csv';
import styles from '../../../assets/styles/forms.css';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';

class CreateDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        first_name: '',
        last_name: '',
        email: '',
        driver_license_number: '',
        licenses_issuing_state: '',
        exempt_driver_configuration: '',
        time_zone_offset_utc: '',
        starting_time_24_hour_period: '',
        move_yards_use: '',
        personal_use: '',
        username: '',
        password: '',
      },
      type: '',
      message: '',
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.postData = this.postData.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.postData(this.state.data).then((response) => {
      console.log(response.data);
      console.log(response.status);
      if (response.status === 201) {
        this.setState({ type: 'success', message: 'We have created all the new drivers. You will be able to see them shortly in the application.' });
      } else {
        this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      }
    });
  }

  onChange(e) {
    const state = this.state;
    state.data[e.target.name] = e.target.value;
    this.setState(state);
  }

  postData(data) {
    const url = 'https://private-459d3-elde2e.apiary-mock.com/drivers';
    console.log(data);
    return post(url, data);
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
      var status = (<div id="status" className={classString} ref="status">
        {this.state.message}
                    </div>);
    }

    return (
      <div>{status}
        <Container>
          <Row>
            <Col sm="12" md={{ size: 5, offset: 3 }}>
              <h1>Create New Driver</h1>
              <Form onSubmit={this.onFormSubmit}>
                <FormGroup>
                  <Input type="string" name="first_name" placeholder="First Name" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Input type="string" name="last_name" placeholder="Last Name" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Input type="email" name="email" placeholder="Email" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Input type="string" name="driver_license_number" placeholder="Driver License Number" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Input type="string" name="licenses_issuing_state" placeholder="Licenses Issuing State" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Input type="select" name="exempt_driver_configuration" placeholder="Exempt Driver Configuration" onChange={this.onChange}>
                    <option>1</option>
                    <option>E</option>
                    <option selected="selected">0</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input type="select" name="time_zone_offset_utc" placeholder="Time Zone Offset UTC"onChange={this.onChange}>
                    {this.createSelectItems(4, 11)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input type="datetime-local" name="starting_time_24_hour_period" placeholder="Starting Time 24 Hour Period" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Input type="select" name="move_yards_use" placeholder="Move Yards Use" onChange={this.onChange}>
                    {this.createSelectItems(0, 1)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input type="select" name="default_use" placeholder="Default Use" onChange={this.onChange}>
                    {this.createSelectItems(0, 1)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input type="select" name="personal_use" placeholder="Personal Use" onChange={this.onChange}>
                    {this.createSelectItems(0, 1)}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Input type="string" name="username" placeholder="Username" onChange={this.onChange} />
                </FormGroup>
                <FormGroup>
                  <Input type="password" name="password" placeholder="Username" onChange={this.onChange} />
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


export default CreateDriver;
