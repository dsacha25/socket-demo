import React, { useState } from 'react';
import SingleButton from './SingleButton';

const MultiButton = () => {
    const [countA, setCountA] = useState(0);
    const [countB, setCountB] = useState(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SingleButton multiCount={countA} index={0} />
            <SingleButton multiCount={countB} index={1} />
        </div>
    );
};

export default MultiButton;
