import React from 'react';
import axios, { post } from 'axios';
import TemplateCSV from '../templates/template_csv';
import styles from '../../../assets/styles/forms.css';
import CreateDriverForm from './CreateDriverForm';

class CreateDriverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      type: '',
      message: ''
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


  postData(data) {
    const url = 'https://private-459d3-elde2e.apiary-mock.com/drivers';
    console.log(data);
    return post(url, data);
  }

  render() {
    const { errors, type, message } = this.state;
    if (type && message) {
      const classString = `alert alert-${type}`;
      var status = (<div id="status" className={classString} ref="status">
        {message}
                    </div>);
    }

    return (
      <div>{status}
        <Container>
          <Row>
            <Col sm="12" md={{ size: 5, offset: 3 }}>
              <h1>Create New Driver</h1>
              <CreateDriverForm>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}


export default CreateDriverView;
