import React from 'react';
import Aux from '../../hoc/Aux';
import Navibar from '../../containers/NaviBar/NaviBar';
import Sidebar from '../Sidebar/Sidebar';



const layout = ( props ) => (
    <Aux >
        < Navibar />
        < Sidebar />
        
        <main>
            { props.children }
        </main>
        
    </Aux>
);

export default layout;