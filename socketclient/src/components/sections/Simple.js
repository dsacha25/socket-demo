import React, { Fragment, useState, useContext } from 'react';
import io from 'socket.io-client';

import { sCTX } from '../SocketContext';

let socket;

const Simple = () => {
    // const { socket } = useContext(sCTX);
    const [logMsg, setLogMsg] = useState('Initial State');

    if (!socket) {
        setSocket(io('http://localhost:7000'));
    }

    const handleClick = () => {
        let msg = 'Hello from React';
        socket.emit('log', msg);
    };

    const handleRefresh = () => {
        let initial = 'Initial State';
        socket.emit('log', initial);
    };

    socket.on('log from server', (msg) => {
        setLogMsg(msg);
    });

    return (
        <Fragment>
            <div style={{ textAlign: 'center' }}>
                <h1>{logMsg}</h1>

                <button onClick={handleClick}>Send Log</button>
                <button onClick={handleRefresh}>Reset State</button>
            </div>
        </Fragment>
    );
};

export default Simple;
