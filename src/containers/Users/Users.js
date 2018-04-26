import React from 'react';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import UsersInfo from './Users-info';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../../assets/styles/forms.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

class Users extends React.Component {

    onDeleteBtnClick(){
    }

    render(){

        let authRedirect = null;
        if (!this.props.isAuthenticated){
            authRedirect = <Redirect to="/" />;
        }

        return (
            <Aux>
                { authRedirect }
                <h1> Drivers </h1>
                <div className="buttons">
                    <Link className="btn btn-sm green spacing" to="/drivers/new_driver"><FontAwesomeIcon icon="user" color='white'/> Create driver</Link>
                    <Link className="btn btn-sm green" to="/drivers/new_drivers"><FontAwesomeIcon icon="users" color='white'/> Create multiple drivers</Link>
                </div>
                <Container>
                    <UsersInfo motor_carrier_id={ 0 }/>
                </Container>
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

export default connect(mapStateToProps)(Users);
