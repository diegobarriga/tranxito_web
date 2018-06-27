import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/forms.css';
import api from '../../../services/api';
import DriverForm from './DriverForm';
import Alert from '../../Alert/Alert';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Aux';

class DriverFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      message: '',
      isLoading: false,
    };
    this.postData = this.postData.bind(this);
    this.patchData = this.patchData.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.imgUpload = this.imgUpload.bind(this);
  }

  componentDidMount() {
    const auxArray = this.props.location.pathname.split('/');
    const crumbUrl = this.props.location.pathname;
    const newCrumb = auxArray[auxArray.length - 1].split('_').join(' ');
    this.props.addBreadCrumb(newCrumb, false, crumbUrl);
  }

  onFormSubmit(formData) {
    this.setState({ isLoading: true });
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
                this.props.createUser(response.data);

                const { lastMod } = this.props;
                lastMod.people = response.headers.lastmod;
                this.props.updateLastMod(lastMod);

                this.setState({ isLoading: false });
                this.setState({ type: 'success', message: 'We have created the new driver.' });
              } else {
                this.setState({ isLoading: false });
                this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
              }
            });
          // Si estamos editando un usuario
          } else {
            this.patchData(submitData).then((response) => {
              console.log('resp---', response.headers);
              if (response.status === 200) {
                this.props.createUser(response.data);

                const { lastMod } = this.props;
                lastMod.people = response.headers.lastmod;
                this.props.updateLastMod(lastMod);

                this.setState({ isLoading: false });
                this.setState({ type: 'success', message: 'We have edited the driver.' });
              } else {
                this.setState({ isLoading: false });
                this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
              }
            });
          }
        } else {
          this.setState({ isLoading: false });
          this.setState({ type: 'danger', message: 'Sorry, there has been an error with the image upload. Please try again later.' });
        }
      });
    } else {
      // Si estamos creando un usuario
      if (this.props.isCreate) {
        this.postData(formData.data).then((response) => {
          if (response.status === 200) {
            this.props.createUser(response.data);

            const { lastMod } = this.props;
            lastMod.people = response.headers.lastmod;
            this.props.updateLastMod(lastMod);

            this.setState({ isLoading: false });
            this.setState({ type: 'success', message: 'We have created the new driver.' });
          } else {
            this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
          }
        });
      // Si estamos editando un usuario
      } else {
        this.patchData(formData.data).then((response) => {
          console.log('resp---', response.headers);
          if (response.status === 200) {
            this.props.createUser(response.data);

            const { lastMod } = this.props;
            lastMod.people = response.headers.lastmod;
            this.props.updateLastMod(lastMod);

            this.setState({ isLoading: false });
            this.setState({ type: 'success', message: 'We have edited the driver.' });
          } else {
            this.setState({ isLoading: false });
            this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
          }
        });
      }
    }
  }

  postData(data) {
    return api.motorCarriers.createMotorCarrierPeople(
      this.props.motorCarrierId,
      this.props.token,
      data,
    );
  }

  patchData(data) {
    return api.people.updateUser(this.props.match.params.id, this.props.token, data);
  }

  imgUpload(file) {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    return api.images.driverImageUpload(formData, config, this.props.token);
  }

  createSelectItems(min, max) {
    const items = [];
    for (let i = min; i <= max; i += 1) {
      items.push(<option>{i}</option>);
    }
    return items;
  }

  render() {
    if (this.state.isLoading === true) return <Loader />;

    let alert;
    if (this.state.type && this.state.message) {
      if (this.state.type === 'success') {
        alert = (<Alert alertType="SUCCESS" message={this.state.message} />);
      } else if (this.state.type === 'danger') {
        alert = (<Alert alertType="FAIL" message={this.state.message} />);
      }
    }
    const h1Style = {
      marginTop: '1rem',
      marginBottom: '2rem',
    };

    const {
      title,
      isCreate,
      token,
      match,
    } = this.props;

    return (
      <Container>
        <Row>
          <Col sm="12" md={{ size: 12 }}>
            { alert }
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 8 }}>
            <Breadcrumb>
              <Link className="section" to="/drivers">Home</Link>
              {
                this.props.navigation.map((x, i) => (
                  <Aux key={i}>
                    <Breadcrumb.Divider icon="right chevron" />
                    { this.props.len - 1 > i ?
                      <Link className="section capitalize" to={this.props.naviLinks[i]}> {x} </Link>
                      :
                      <Breadcrumb.Section className="capitalize" active> {x} </Breadcrumb.Section>
                    }
                  </Aux>
                ))
              }
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 9 }}>
            <h1 style={h1Style}> { title }</h1>
            <DriverForm
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

DriverFormView.propTypes = {
  title: PropTypes.string.isRequired,
  isCreate: PropTypes.bool.isRequired,
  motorCarrierId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
  updateLastMod: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  addBreadCrumb: PropTypes.func.isRequired,
  navigation: PropTypes.array.isRequired,
  naviLinks: PropTypes.array.isRequired,
  len: PropTypes.number.isRequired,
  lastMod: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  token: state.auth.token,
  lastMod: state.auth.lastMod,
  motorCarrierId: state.auth.motorCarrierId,
  navigation: state.breadcrumbs.breadcrumbs,
  len: state.breadcrumbs.breadcrumbs.length,
  naviLinks: state.breadcrumbs.links,
});

const mapDispatchToProps = dispatch => ({
  createUser: user => dispatch(actions.createUser(user)),
  updateLastMod: lastMod => dispatch(actions.updateLastMod(lastMod)),
  addBreadCrumb: (urlString, restart, crumbUrl) => dispatch(actions.addNewBreadCrumb(
    urlString,
    restart,
    crumbUrl,
  )),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DriverFormView));
