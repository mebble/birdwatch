import React from 'react';

export default ({ id, value, dataList, onChange }) => {
    const classes = `
        appearance-none
        border rounded
        w-full py-2 px-3
        text-gray-700
        focus:outline-none focus:shadow-outline
    `;
    return (
        <>
            <input className={classes} list={id} value={value} onChange={onChange} type="text" placeholder="Find a twitter user" required />
            <datalist id={id}>
                {dataList.map(({ name, screenName }) => {
                    return (
                        <option key={`${name}_${screenName}`} value={screenName}>
                            {name}
                        </option>
                    );
                })}
            </datalist>
        </>
    );
};
