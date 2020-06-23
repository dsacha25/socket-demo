import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// ===== PRIMARY COMPONENTS ===== //
import SingleButton from './sections/SingleButton';
import MultiButton from './sections/MultiButton';
import Simple from './sections/Simple';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
        backgroundImage: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    },
    sections: {
        width: '100vw',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    divider: {
        color: 'black',
    },
}));

const SocketPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.sections}>
                <Simple />
            </div>
            <div className={classes.sections}>
                <SingleButton />
            </div>
            <div className={classes.sections}>
                <MultiButton />
            </div>
        </div>
    );
};

export default SocketPage;
