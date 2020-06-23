import React, { createContext, useState } from 'react';
import io from 'socket.io-client';

export const sCTX = createContext();

const SocketContext = (props) => {
    const [socket, setSocket] = useState();

    if (!socket) {
        setSocket(io('http://localhost:7000'));
    }

    return (
        <sCTX.Provider
            value={{
                socket,
            }}
        >
            {props.children}
        </sCTX.Provider>
    );
};

export default SocketContext;
