import React from 'react';

export default ({ id, value, suggestions, onChange }) => {
    const classes = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline';
    return (
        <>
            <input className={classes} list={id} value={value} onChange={onChange} type="text" placeholder="Find a twitter user..." />
            <datalist id={id}>
                {suggestions.map((s, i) => <option key={i} value={`@${s}`} />)}
            </datalist>
        </>
    );
};
