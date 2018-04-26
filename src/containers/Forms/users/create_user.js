import React from 'react'
import axios, { post } from 'axios';
import TemplateCSV from '../templates/template_csv';
import styles from '../../../assets/styles/forms.css';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';

class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null,
      type: "",
      message: "",
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      console.log(response.status);
      if (response.status === 201) {
        this.setState({ type: 'success', message: 'We have created all the new drivers. You will be able to see them shorly in the application.' });
      }
      else {
        this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
      }
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = 'https://private-459d3-elde2e.apiary-mock.com/drivers';
    const formData = new FormData();
    formData.append('file',file);
    console.log(formData);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {

    if (this.state.type && this.state.message) {
      var classString = 'alert alert-' + this.state.type;
      var status = <div id="status" className={classString} ref="status">
                     {this.state.message}
                   </div>;
      }

    return (
      <div>{status}
        <div className="aligner">
          <div className="aligner-item"><h1>Create multiple drivers through a csv file</h1></div>
          <div className="aligner-item"><p>The template below has the structure the csv file must have. You can download it, fill it and then upload it. That simple!</p></div>
          <div className="aligner-item"><TemplateCSV/></div>
          <div className="aligner-item">
            <div className="upload-form">
              <Form onSubmit={this.onFormSubmit}>
                  <Input type="file" accept=".csv" className="center-item" onChange={this.onChange} />
                  <Button type="submit" className="center-item" disabled={!this.state.file}>Upload</Button>
              </Form>
            </div>
          </div>
      </div>
    </div>
   )
  }
}



export default SimpleReactFileUpload
