import React from 'react'

const Button = ({ buttonName, d }) => {
    return (
        <button className="btn w-full md:w-auto ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]">
                <path strokeLinecap="round" strokeLinejoin="round" d={d} />
            </svg>
            {buttonName}
        </button>
    )
}

export default Button