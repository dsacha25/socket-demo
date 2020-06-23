import React from 'react';

const IncidentCounter = () => {
    const handleClick = () => {
        console.log('click');
    };
    return (
        <div>
            <button onClick={handleClick}>1</button>
        </div>
    );
};

export default IncidentCounter;
