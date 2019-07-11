import React from 'react';

export default ({ id, value, dataList, onChange }) => {
    const prependClasses = `
        flex justify-center items-center
        px-2
        border border-solid rounded-l-lg
        text-gray-700
    `;
    const searbarClasses = `
        appearance-none
        border rounded-r-lg
        w-full py-2 px-3
        text-gray-700
        focus:outline-none focus:shadow-outline
        -ml-px
    `;
    return (
        <div>
            <div className="flex justify-center">
                <div className={prependClasses}>@</div>
                <input className={searbarClasses} list={id} value={value} onChange={onChange} type="text" placeholder="Twitter handle goes here" required />
            </div>
            <datalist id={id}>
                {dataList.map(({ name, screenName }) => {
                    return (
                        <option key={`${name}_${screenName}`} value={screenName}>
                            {name}
                        </option>
                    );
                })}
            </datalist>
        </div>
    );
};
