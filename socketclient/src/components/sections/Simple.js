import React, { Fragment, useState, useContext } from 'react';
import io from 'socket.io-client';

import Button from '@material-ui/core/Button';

import { sCTX } from '../SocketContext';

const Simple = () => {
    const { socket } = useContext(sCTX);
    const [logMsg, setLogMsg] = useState('Initial State');

    // let socket;

    // if (!socket) {
    //     socket = io('http://localhost:8000');
    // }

    // ================================================ //
    // ==================== SEND ====================== //
    const handleClick = () => {
        let msg = 'Hello from React';
        socket.emit('log', msg);
    };

    const handleRefresh = () => {
        let initial = 'Initial State';
        socket.emit('log', initial);
    };

    // =================================================== //
    // ==================== RECEIVE ====================== //

    socket.on('log from server', (msg) => {
        setLogMsg(msg);
    });

    return (
        <Fragment>
            <div style={{ textAlign: 'center' }}>
                <h1>{logMsg}</h1>
                <Button
                    style={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        border: '1px solid grey',
                        padding: 10,
                        borderRadius: 0,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                    }}
                    onClick={handleClick}
                >
                    Send Log
                </Button>
                <Button
                    style={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        border: '1px solid grey',
                        borderLeft: '0px',
                        padding: 10,
                        borderRadius: 0,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                    }}
                    onClick={handleRefresh}
                >
                    Reset State
                </Button>
            </div>
        </Fragment>
    );
};

export default Simple;
