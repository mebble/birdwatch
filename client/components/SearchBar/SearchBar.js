import React from 'react';

export default ({ id, value, dataList, onChange }) => {
    const classes = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline';
    return (
        <>
            <input className={classes} list={id} value={value} onChange={onChange} type="text" placeholder="Find a twitter user..." required />
            <datalist id={id}>
                {dataList.map((d, i) => <option key={`${i}_${d.value}`} value={`@${d.value}`}>{d.label}</option>)}
            </datalist>
        </>
    );
};