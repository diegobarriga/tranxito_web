import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Container, Row, Col, Button } from 'reactstrap';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import * as actions from '../../store/actions/index';
import Loader from '../../components/Loader/Loader';


class MotorCarriers extends React.Component {
  componentDidMount() {
    this.props.onInitMC(this.props.token);
  }
  onDeleteBtnClick(mCarrierId) {
    const confirmDelete = window.confirm('Are you sure you want to delete this motor carrier');
    if (confirmDelete) {
      this.props.onDeleteMCarrier(mCarrierId, this.props.token);
    }
  }

  render() {
    const h1Style = {
      marginBottom: '4rem',
    };

    const flexContainer = {
      display: 'flex',
    };

    const containedObject = {
      flexGrow: '1',
    };

    const bStyle = {
      marginTop: '10px',
    };


    if (this.props.mCarrierList == null) return <Loader />;

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (!this.props.isAdmin) {
        authRedirect = <Redirect to="/dashboard" />;
      }
    } else {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <Aux>
        { authRedirect }

        <Container>
          <Row>
            <Col sm="12" md={{ size: 3 }}>
              <h1 style={h1Style}> MotorCarriers </h1>
            </Col>
            <Col sm="12" md={{ size: 6 }}>
              <Link style={bStyle} className="btn btn-sm green spacing" to="/motor_carriers/create"><FontAwesomeIcon icon="user" color="white" /> Create MotorCarrier</Link>
            </Col>
          </Row>
          <Row >
            <Col sm="12" md={{ size: 11 }}>
              <div className="ui divided items">
                {this.props.mCarrierList !== null &&
                  Object.values(this.props.mCarrierList).map(carrier => (
                    <div key={carrier.id} style={flexContainer} className="item">
                      <div key={carrier.id} style={containedObject}>
                        <Button
                          key={carrier.id}
                          onClick={() => {
                          this.props.getMotorCarrier(carrier.id, this.props.token, carrier.name);
                          this.props.history.push(`/motor_carriers/${carrier.id}`);
                           }}
                        >
                          {carrier.name}
                        </Button>
                      </div>

                      <div>
                        <Link className="btn btn-sm green spacing" to={`/motor_carriers/${carrier.id}/new_supervisor`} ><FontAwesomeIcon icon="user" color="white" /> Add Supervisor</Link>
                        <Link className="btn btn-secondary btn-sm" to={`/motor_carriers/${carrier.id}/edit`} ><FontAwesomeIcon icon="edit" color="white" /></Link>{' '}
                        <Button color="danger" size="sm" onClick={() => this.onDeleteBtnClick(carrier.id)}><FontAwesomeIcon icon="trash" color="white" /></Button>
                      </div>
                    </div>

                  ))
                }
              </div>
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}


MotorCarriers.propTypes = {
  mCarrierList: PropTypes.any.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onInitMC: PropTypes.func.isRequired,
  onDeleteMCarrier: PropTypes.func.isRequired,
  getMotorCarrier: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  token: state.auth.token,
  mCarrierList: state.mCarrier.motorCarriers,

});

const mapDispatchToProps = dispatch => ({
  onInitMC: token => dispatch(actions.initMCarriers(token)),
  onDeleteMCarrier: (mCarrierId, token) => dispatch(actions.deleteMotorCarrier(mCarrierId, token)),
  getMotorCarrier: (Id, token, name) => dispatch(actions.getMotorCarrier(Id, token, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MotorCarriers));
