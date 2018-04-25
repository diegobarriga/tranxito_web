import React from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


class Logs extends React.Component {

    render(){

        let authRedirect = null;
        if (!this.props.isAuthenticated){
            authRedirect = <Redirect to="/" />;
        }

        return (
            <Aux>
                { authRedirect }
                <h1> Logs </h1>
            </Aux>

        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

export default connect(mapStateToProps)(Logs);