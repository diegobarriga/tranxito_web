import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Navibar from '../../components/NaviBar/NaviBar';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Layout.css';
import { connect } from 'react-redux';



class Layout extends Component {

    render(){
        return (
            <Aux>                
                <div className="navibar">
                    < Navibar isAuth={this.props.isAuthenticated} />
                </div>
                <div className = "layout-container">
                    { this.props.isAuthenticated &&
                     < Sidebar />
                    }

                    <main className="main">
                        { this.props.children }
                    </main>        
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    };
};

export default connect(mapStateToProps)(Layout);