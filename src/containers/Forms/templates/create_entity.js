import React from 'react';
import PropTypes from 'prop-types';
import XLSX from 'xlsx';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { Button, Form, Input, Container, Alert, Row, Col } from 'reactstrap';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TemplateCSV from '../templates/template_csv';
import TemplateXLSX from '../templates/template_xlsx';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';
import Alert2 from '../../Alert/Alert';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Aux';

class SimpleReactFileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      type: '',
      message: '',
      isValid: null,
      loading: false,
      errors: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.getUploadStatus = this.getUploadStatus.bind(this);
  }

  componentDidMount() {
    const { t } = this.props;
    const auxArray = this.props.location.pathname.split('/');
    const crumbUrl = this.props.location.pathname;
    let newCrumb = auxArray[auxArray.length - 1].split('_');
    if (newCrumb[newCrumb.length - 1] === 'vehicles') {
      newCrumb[newCrumb.length - 2] = 'New';
      newCrumb[newCrumb.length - 1] = 'Vehicles';
    } else if (newCrumb[newCrumb.length - 1] === 'devices') {
      newCrumb[newCrumb.length - 2] = 'New';
      newCrumb[newCrumb.length - 1] = 'Devices';
    } else if (newCrumb[newCrumb.length - 1] === 'trailers') {
      newCrumb[newCrumb.length - 2] = 'New';
      newCrumb[newCrumb.length - 1] = 'Trailers';
    } else {
      newCrumb[newCrumb.length - 2] = 'New';
      newCrumb[newCrumb.length - 1] = 'Drivers';
    }
    newCrumb = newCrumb.join(' ');
    this.props.addBreadCrumb(newCrumb, false, crumbUrl);
  }

  onFormSubmit(e) {

    this.setState({ ...this.state, loading: true });
    e.preventDefault(); // Stop form submit
    const reader = new FileReader();

    if (this.state.file.name.split('.')[1] === 'csv') {

      reader.readAsText(this.state.file);
      reader.onload = this.loadHandler;
    } else if (this.state.file.name.split('.')[1] === 'xlsx') {
      this.excelToCSV(reader);
    }
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });

  }

  getUploadStatus() {
    const filter = `{"where": {"personId": ${this.props.userId}}, "order" : "date DESC", "limit": 1}`;
    return api.file.getfileUploads(filter);
  }

  getErrors(uploadId) {
    return api.file.getFileUploadErrors(uploadId);
  }

  fileUpload(file) {
    let { type } = this.props;
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (this.props.type === 'drivers') {

      type = 'people';
    } else if (this.props.type === 'devices') {

      type = 'devices';
    } else if (this.props.type === 'trailers') {

      type = 'trailers';
    }
    return api.file.csvFileUpload(
      formData, config,
      this.props.token,
      this.props.motorCarrierId,
      type,
    );
  }

  sleep(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i += 1) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  loadHandler = (event) => {
    const { t } = this.props;

    const csv = event.target.result;
    const arr = csv.split('\n');

    const drivers = [];
    if (arr[arr.length - 1] === '') {
      arr.pop();
    }
    const headers = arr[0].split(',');
    if (arr.length <= 1) {
      this.setState({ ...this.state, loading: false });
      this.setState({ type: 'danger', message: t('Your file was empty. Please try again later.') });
    }
    for (let i = 1; i < arr.length; i += 1) {
      const data = arr[i].split(',');
      if (data.length !== headers.length) {
        this.setState({ ...this.state, loading: false });
        this.setState({ type: 'danger', message: t('Your file was not valid. Please try again later.') });
      }
      const obj = {};
      for (let j = 0; j < data.length; j += 1) {
        obj[headers[j].trim()] = data[j].trim();
      }
      drivers.push(obj);
    }
    JSON.stringify(drivers);

    this.checkValid(drivers);

    if (this.state.isValid === true && this.state.loading === true) {

      this.fileUpload(this.state.file).then((response) => {

        if (response.status === 200) {
          this.sleep(1000);
          this.getUploadStatus().then((res) => {

            const { status } = res.data[0];

            if (status === 'SUCCESS') {
              this.setState({ ...this.state, loading: false });
              this.setState({ type: 'success', message: t('We have created all the new ') + t(this.props.type) });
            } else if (status === 'PENDING') {
              this.setState({ ...this.state, loading: false });
              this.setState({ type: 'danger', message: t('We are still creating the ') + t(this.props.type) + t(' please check in a few minutes.') });
            } else {
              const { id } = res.data[0];
              this.getErrors(id).then((resp) => {

                this.setState({ errors: resp.data });
                this.setState({ ...this.state, loading: false });
                this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
              });
            }
          });
        } else {
          this.setState({ ...this.state, loading: false });
          this.setState({ type: 'danger', message: t('Sorry, there has been an error. Please try again later.') });
        }
      });
    } else {
      this.setState({ ...this.state, loading: false });

    }
    this.setState({ isValid: null });
  }

  excelToCSV(reader) {
    const read = reader;
    const rABS = !!reader.readAsBinaryString;
    let dataString = '';
    read.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      this.setState({ data });

      this.checkValid(this.state.file);
      dataString = this.state.data.map(d => `${d[0]},${d[1]},${d[2]},${d[3]},${d[4]},${d[5]},${d[6]},${d[7]},${d[8]}\n`).join('');

      const csv = new Blob([dataString], { type: 'text/csv' });

      const reader1 = new FileReader();
      reader1.readAsText(csv);

      this.setState({ file: csv });
      reader1.onload = this.loadHandler;
    };
    if (rABS) reader.readAsBinaryString(this.state.file);
    else reader.readAsArrayBuffer(this.state.file);
  }

  checkValid(data) {
    if (this.props.type === 'drivers') {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].firstName.length < 2 && data[i].firstName.length > 30) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].lastName.length < 2 && data[i].lastName.length > 30) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].email.length < 2 && data[i].email.length > 30) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].licenseIssuingState.length === 0) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].driverLicenseNumber.length === 0) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].timeZoneOffsetUtc.length === 0) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].startingTime24HourPeriod.length === 0) {
          this.setState({ isValid: false });

          return;
        }
        this.setState({ isValid: true });
      }
    } else if (this.props.type === 'devices') {

      for (let i = 0; i < data.length; i += 1) {
        if (data[i].bluetoothMac.length !== 17) {
          this.setState({ idValid: false });
          return;
        } else if (data[i].imei.length !== 15) {
          this.setState({ idValid: false });

          return;
        }
      }
      this.setState({ isValid: true });
    } else if (this.props.type === 'trailers') {
      for (let i = 0; i < data.length; i += 1) {
        if (data[i].vin.length < 17 && data[i].vin.length > 18) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].manufacturer.length === 0) {
          this.setState({ isValid: false });
          return;
        } else if (data[i].number.lenght > 10) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].model.length === 0) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].year.length === 0) {
          this.setState({ isValid: false });

          return;
        } else if (data[i].gvw.length === 0) {
          this.setState({ isValid: false });

          return;
        }
      }
      this.setState({ isValid: true });
    } else {
      // Vehicles validation
      for (let i = 0; i < data.length; i += 1) {
        if ((data[i].vin.length > 18 || data[i].vin.length < 17)) {
          this.setState({ idValid: false });
          return;
        } else if (data[i].vin.length === 18 && String(data[i].vin)[0] !== '-') {
          this.setState({ idValid: false });
          return;
        }
      }
      this.setState({ isValid: true });
    }
  }

  render() {
    if (this.state.loading === true) return <Loader />;
    let alert;
    if (this.state.type && this.state.message) {
      if (this.state.type === 'success') {
        alert = (<Alert2 alertType="SUCCESS" message={this.state.message} />);
      } else if (this.state.type === 'danger') {
        alert = (<Alert2 alertType="FAIL" message={this.state.message} />);
      }
    }
    const { t } = this.props;

    return (
      <div>
        <div>{ alert }</div>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 8 }}>
              <Breadcrumb>
                { this.props.role === 'S' && <Link className="section" to="/">Home</Link>}
                { this.props.role === 'A' && <Link className="section" to={`/motor_carriers/${this.props.motorCarrierId}`}>{this.props.mcName}</Link>}
                {
                  this.props.navigation.map((x, i) => (
                    <Aux key={i}>
                      <Breadcrumb.Divider icon="right chevron" />
                      { this.props.len - 1 > i ?
                        <Link className="section capitalize" to={this.props.naviLinks[i]}> {t(x)} </Link>
                        :
                        <Breadcrumb.Section active> {t(x)} </Breadcrumb.Section>
                      }
                    </Aux>
                  ))
                }
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <div className="aligner">
          { this.state.errors &&
            <Alert color="danger">
              <ul>
                {this.state.errors.map(error => (<li key={error.id}>{ error.message }</li>))}
              </ul>
            </Alert>}
          <div className="aligner-item"><h1>{t('Create multiple')} {t(this.props.type)} {t('through an Excel or CSV file')}</h1></div>
          <div className="aligner-item"><p>{t('The templates below have the structure the file must have. You can download it, fill it and then upload it.')}</p></div>
          <div className="aligner-item padding-csv">
            <TemplateCSV type={this.props.type} />
            <TemplateXLSX type={this.props.type} />
          </div>
          <div className="aligner-item">
            <div className="upload-form">
              <Form onSubmit={this.onFormSubmit}>
                <Input name="file" type="file" accept=".csv, .xlsx" className="center-item" onChange={this.onChange} />
                <Button type="submit" className="center-item" disabled={!this.state.file}>{t('Upload')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SimpleReactFileUpload.propTypes = {
  type: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  mcName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  userId: state.auth.userId,
  motorCarrierId: state.auth.motorCarrierId,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
  role: state.auth.role,
  mcName: state.auth.mcName,
});

const mapDispatchToProps = dispatch => ({
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
});
const translateFunc = translate('translations')(SimpleReactFileUpload);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translateFunc));
