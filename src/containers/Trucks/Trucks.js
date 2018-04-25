import React from 'react';
import { Container } from 'reactstrap';
import Aux from '../../hoc/Aux';
import TrucksInfo from './Trucks-info';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Trucks extends React.Component {

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
                <h1> Trucks </h1>
                <Container>
                    <TrucksInfo motor_carrier_id={ 0 }/>
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

export default connect(mapStateToProps)(Trucks);
