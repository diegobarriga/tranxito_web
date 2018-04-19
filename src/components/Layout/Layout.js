import React from 'react';
import Aux from '../../hoc/Aux';
import Navibar from '../../containers/NaviBar/NaviBar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.css';



const layout = ( props ) => (

    <Aux>
        <div className="navibar">
            < Navibar />
        </div>
        <div className = "layout-container">
            < Sidebar />
            <main className="main">
                { props.children }
            </main>        
        </div>
    </Aux>
);

export default layout;