import React, { Fragment } from 'react';
import SocketPage from './components/SocketPage';
import SocketContext from './components/SocketContext';

import './App.css';

function App() {
    return (
        <Fragment>
            <SocketContext>
                <SocketPage />
            </SocketContext>
        </Fragment>
    );
}

export default App;
