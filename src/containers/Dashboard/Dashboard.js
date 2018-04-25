import React from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Dashboard extends React.Component {

    render(){

        let authRedirect = null;        
        if (!this.props.isAuthenticated){
            authRedirect = <Redirect to="/" />;
        }

        return (
            <Aux>
                { authRedirect }
                <h1> Dashboard </h1>
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

export default connect(mapStateToProps)(Dashboard);