import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { ListGroup, Container, Row, Col } from 'reactstrap';
import Aux from '../../hoc/Aux';
import '../../assets/styles/forms.css';
import * as actions from '../../store/actions/index';
import Loader from '../../components/Loader/Loader';


class MotorCarriers extends React.Component {
  componentDidMount() {
    this.props.onInitMC(this.props.token);
  }

  render() {
    const h1Style = {
      marginBottom: '1rem',
    };

    const flexContainer = {
      display: 'flex',
    };

    const containerObject = {
      flexGrow: '1',
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
        <h1 style={h1Style}> MotorCarriers </h1>
        <div className="buttons">
          <Link className="btn btn-sm green spacing" to="/motor_carriers/create"><FontAwesomeIcon icon="user" color="white" /> Create MotorCarrier</Link>
        </div>
        <Container>
          <Row >
            <Col sm="12" md={{ size: 6 }}>
              <ListGroup>
                {
                  this.props.mCarrierList.map(carrier => (
                    <div key={carrier.id} style={flexContainer} className="list-group-item-action list-group-item">
                      <div key={carrier.id} style={containerObject}>
                        <Link key={carrier.id} to="/">
                          {carrier.name}
                        </Link>
                      </div>

                      <div>
                        <Link className="btn btn-sm green spacing" to={`/motor_carriers/${carrier.id}/new_supervisor`} ><FontAwesomeIcon icon="user" color="white" /> Add Supervisor</Link>
                        <Link className="btn btn-sm green spacing" to="/motor_carriers" ><FontAwesomeIcon icon="trash" color="white" /> Edit</Link>
                        <Link className="btn btn-sm green spacing" to="/motor_carriers" ><FontAwesomeIcon icon="trash" color="white" /> Delete</Link>
                      </div>
                    </div>

                  ))
                }
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </Aux>

    );
  }
}


MotorCarriers.propTypes = {
  mCarrierList: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onInitMC: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  isAdmin: state.auth.role === 'A',
  token: state.auth.token,
  mCarrierList: state.mCarrier.motorCarriers,

});

const mapDispatchToProps = dispatch => ({
  onInitMC: token => dispatch(actions.initMCarriers(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MotorCarriers);
