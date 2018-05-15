import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'reactstrap';
import api from '../../../services/api';
import DriverForm from './DriverForm';

class DriverFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: null,
      type: '',
      message: '',
    };
    this.postData = this.postData.bind(this);
  }

  onFormSubmit(data) {
    this.imgUpload(this.state.picture).then((imgResponse) => {
      if (imgResponse.status === 200) {
        // setiamos el nombre de la imagen con la respuesta
        const updatedState = {
          ...this.state.data,
          image: imgResponse.data.result.files.file[0].name,
        };
        this.setState({ data: updatedState });
        // Si estamos creando un usuario
        if (this.props.isCreate) {
          this.postData(data).then((response) => {
            if (response.status === 200) {
              this.setState({ type: 'success', message: 'We have created the new driver.' });
            } else {
              this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please try again later.' });
            }
          });

        // // Si estamos editando un usuario
        } else {
          this.patchData(data).then((response) => {
            if (response.status === 200) {
              this.setState({ type: 'success', message: 'We have edited the driver.' });
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
          <Col sm="12" md={{ size: 5, offset: 3 }}>
            <h1 style={h1Style}> { title }</h1>
            <DriverForm
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
};

const mapStateToProps = state => ({
  token: state.auth.token,
  motorCarrierId: state.auth.motorCarrierId,
});

export default withRouter(connect(mapStateToProps)(DriverFormView));
