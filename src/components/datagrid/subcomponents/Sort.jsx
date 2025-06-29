import React from 'react'
import {
    ArrowLongDownIcon,
    ArrowLongUpIcon,
} from "@heroicons/react/24/outline";

const Sort = ({ sortStates }) => {
    return (
        <>
            {sortStates === 1 && (
                <ArrowLongDownIcon className="size-5" />
            )}
            {sortStates === 2 && (
                <ArrowLongUpIcon className="size-5" />
            )}
        </>
    )
}

export default Sort