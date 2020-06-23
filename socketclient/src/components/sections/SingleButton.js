import React, { Fragment, useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { sCTX } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        flexDirection: 'column',
        minWidth: 220,
        maxHeight: 150,
        borderRadius: 0,
    },
    button: {
        backgroundImage: 'linear-gradient(to top, #6991c7 0%, #a3bded 2000%)',
        display: 'flex',
        width: '100%',
        height: '100%',
        color: 'white',
        borderRadius: 0,
    },
}));

// let socket;

const SingleButton = ({ multiCount, index }) => {
    const { socket } = useContext(sCTX);

    const classes = useStyles();
    const [count, setCount] = useState(0);
    const [id, setId] = useState(null);
    const [isMulti, setIsMulti] = useState(false);
    const [mCount, setMCount] = useState(0);
    const [btnIndex, setBtnIndex] = useState(0);

    const [sockets, setSockets] = useState(0);

    // ===== INIT ===== //

    useEffect(() => {
        if (multiCount !== undefined) {
            setIsMulti(true);
        }

        // ===== How many sockets are there? ===== //
        socket.on('number of sockets', (amount) => {
            setSockets(amount);
        });
        // eslint-disable-next-line
    }, []);

    // ======================================================= //
    // ======================================================= //

    // ===== SINGLE BUTTON ===== //

    useEffect(() => {
        let newCount = count;
        socket.emit('count to server', newCount);

        // ===== sets socket id for single ===== //
        setId(socket.io.engine.id);
        // eslint-disable-next-line
    }, [count, socket]); //// <<== Only called if count || socket changes

    useEffect(() => {
        socket.on('count to clients', (serverCount) => {
            setCount(serverCount);
        });
    }, [socket]); //// <<== Only called on inital render

    const handleCount = () => {
        if (count === 10) {
            setCount(0);
        }
        if (count !== 10) {
            setCount((c) => c + 1);
        }
    };

    // ======================================================= //
    // ======================================================= //

    // ===== MULTI BUTTON ===== //

    useEffect(() => {
        let newCount = mCount;
        socket.emit(`mCount ${index} to server`, newCount);

        socket.on(`mCount ${index} to clients`, (serverCount) => {
            setMCount(serverCount);
        });

        // ===== set socket it for multi ===== //
        setId(socket.io.engine.id);
    }, [index, mCount, socket]); //// <<== Only called if count || multiCount changes

    const handleMultiCount = (e) => {
        setBtnIndex(e); //// <<== which button was clicked?

        if (mCount === 10) {
            setMCount(0);
        }
        if (mCount !== 10) {
            setMCount((c) => c + 1);
        }
    };

    return (
        <Fragment value={index}>
            {isMulti ? (
                <Paper elevation={0} className={classes.root}>
                    <Typography
                        style={{
                            textAlign: 'center',
                            backgroundColor: '#6991c7',
                            color: 'white',
                        }}
                        variant="subtitle2"
                    >
                        <strong>Multi Count</strong>
                    </Typography>

                    <Button
                        value={index}
                        className={classes.button}
                        onClick={(e) => handleMultiCount(e.currentTarget.value)}
                    >
                        <Typography value={index} variant="h2">
                            {mCount}
                        </Typography>
                    </Button>

                    <Typography
                        style={{ padding: 6, minHeight: 20 }}
                        variant="subtitle2"
                    >
                        <strong>id: </strong>
                        {id}
                    </Typography>
                </Paper>
            ) : (
                <Paper elevation={0} value={index} className={classes.root}>
                    <Button className={classes.button} onClick={handleCount}>
                        <Typography variant="h2">{count}</Typography>
                    </Button>
                    <Typography
                        style={{ padding: 6, minHeight: 40 }}
                        variant="subtitle2"
                    >
                        <strong>Sockets: </strong> {sockets}
                        <br />
                        <strong>id: </strong>
                        {id}
                    </Typography>
                </Paper>
            )}
        </Fragment>
    );
};

export default SingleButton;
