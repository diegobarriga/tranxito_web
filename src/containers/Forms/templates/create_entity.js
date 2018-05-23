import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'reactstrap';
import TemplateCSV from '../templates/template_csv';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';
import Alert from '../../Alert/Alert';
import Loader from '../../../components/Loader/Loader';

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      type: '',
      message: '',
      isValid: null,
      loading: false,

    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  onFormSubmit(e) {
    this.setState({ ...this.state, loading: true });
    e.preventDefault(); // Stop form submit
    const reader = new FileReader();
    reader.readAsText(this.state.file);
    reader.onload = this.loadHandler;
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
    console.log(e.target.files[0]);
  }

  checkValid(drivers) {
    console.log(drivers);
    for (let i = 0; i < drivers.length; i += 1) {
      if (drivers[i].first_name.length < 2 && drivers[i].first_name.length > 30) {
        this.setState({ isValid: false });
        console.log('firstname');
        return;
      } else if (drivers[i].last_name.length < 2 && drivers[i].last_name.length > 30) {
        this.setState({ isValid: false });
        console.log('lastname');
        return;
      } else if (drivers[i].email.length < 2 && drivers[i].email.length > 30) {
        this.setState({ isValid: false });
        console.log('email');
        return;
      } else if (drivers[i].licenses_issuing_state.length === 0) {
        this.setState({ isValid: false });
        console.log('license');
        return;
      } else if (drivers[i].driver_license_number.length === 0) {
        this.setState({ isValid: false });
        console.log('driverlicensenumber');
        return;
      } else if (drivers[i].move_yards_use.length !== 1) {
        this.setState({ isValid: false });
        console.log('move_yards');
        return;
      } else if (drivers[i].default_use.length !== 1) {
        this.setState({ isValid: false });
        console.log('defaultuse');
        return;
      } else if (drivers[i].personal_use.length !== 1) {
        this.setState({ isValid: false });
        console.log('personaluse');
        return;
      } else if (drivers[i].exempt_driver_configuration.length === 0) {
        this.setState({ isValid: false });
        console.log('driverconfig');
        return;
      } else if (drivers[i].time_zone_offset_utc.length === 0) {
        this.setState({ isValid: false });
        console.log('time');
        return;
      } else if (drivers[i].starting_time_24_hour_period.length === 0) {
        this.setState({ isValid: false });
        console.log('24period');
        return;
      }
      this.setState({ isValid: true });
    }
  }


  loadHandler = (event) => {
    const csv = event.target.result;
    const arr = csv.split('\n');
    const drivers = [];
    const headers = arr[0].split(',');
    for (let i = 1; i < arr.length; i += 1) {
      const data = arr[i].split(',');
      const obj = {};
      for (let j = 0; j < data.length; j += 1) {
        obj[headers[j].trim()] = data[j].trim();
      }
      drivers.push(obj);
    }
    JSON.stringify(drivers);


    /* check isValid */
    this.checkValid(drivers);

    if (this.state.isValid === true) {
      console.log('valid');
      this.fileUpload(this.state.file).then((response) => {
        console.log(response.data);
        console.log(response.status);
        if (response.status === 204) {
          this.setState({ ...this.state, loading: false });
          this.setState({ type: 'success', message: `We have created all the new ${this.props.type}.` });
        } else {
          this.setState({ ...this.state, loading: false });
          this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
        }
      });
    } else {
      this.setState({ ...this.state, loading: false });
      console.log('invalid');
    }
    this.setState({ isValid: null });
  }

  fileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return api.file.csvFileUpload(formData, config, this.props.token);
  }

  render() {
    if (this.state.loading === true) return <Loader />;
    let alert;
    if (this.state.type && this.state.message) {
      if (this.state.type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={this.state.message} />);
      } else if (this.state.type === 'danger') {
        alert = (<Alert alertType="FAIL" message={this.state.message} />);
      }
    }

    return (
      <div>
        <div>{ alert }</div>
        <div className="aligner">
          <div className="aligner-item"><h1>Create multiple {this.props.type} through a csv file</h1></div>
          <div className="aligner-item"><p>The template below has the structure the csv file must have. You can download it, fill it and then upload it. That simple!</p></div>
          <div className="aligner-item"><TemplateCSV type={this.props.type} /></div>
          <div className="aligner-item">
            <div className="upload-form">
              <Form onSubmit={this.onFormSubmit}>
                <Input name="file" type="file" accept=".csv" className="center-item" onChange={this.onChange} />
                <Button type="submit" className="center-item" disabled={!this.state.file}>Upload</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

SimpleReactFileUpload.propTypes = {
  type: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};


export default connect(mapStateToProps)(SimpleReactFileUpload);
