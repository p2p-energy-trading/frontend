import React, { useState } from 'react'
import {
    FunnelIcon,
} from "@heroicons/react/24/outline";

const Filter = ({ filterOptions, onFilter, last }) => {
    const [checked, setChecked] = useState([]);

    const handleChange = (value) => {
        let newChecked;
        if (checked.includes(value)) {
            newChecked = checked.filter(v => v !== value);
        } else {
            newChecked = [...checked, value];
        }
        setChecked(newChecked);
        onFilter(newChecked); 
    };

    return (
    <div className="relative focus:outline-none">
        <div className={`dropdown ${
            last === true
                ? "dropdown-left"
                : "dropdown-right"
        } `}>
            <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info">
                <FunnelIcon className="size-5" />
            </div>
            <div tabIndex={0}>
                <div className="menu border-2 border-base-200 dropdown-content bg-base-100 rounded-box z-999 p-2 shadow-sm">
                    {filterOptions.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 my-2">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={checked.includes(item)}
                                onChange={() => handleChange(item)}
                            />
                            <label className='text-sm'>{item}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
)
}

export default Filter