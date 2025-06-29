import { MagnifyingGlassIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Search = ({
    searchColumn,
    setSearchColumn,
    tableHeaderData,
    searchValue,
    setSearchValue,
    useRegex,
    setUseRegex
}) => {
    return (
        <>
            <select
                className="select select-bordered border-2 border-base-200 w-full md:w-auto"
                value={searchColumn}
                onChange={e => setSearchColumn(e.target.value)}
            >
                {tableHeaderData.map(header => (
                    <option key={header.columnName} value={header.columnName}>
                        {header.label || header.columnName}
                    </option>
                ))}
            </select>
            <div className=" w-full md:w-auto">
                <span className="input input-bordered border-2 border-base-200 flex items-center px-2 gap-2 w-full">
                    <MagnifyingGlassIcon className="w-5 h-5 text-base-content/60" />
                    <input
                        type="search"
                        required
                        placeholder="Search"
                        className="grow bg-transparent outline-none border-none p-0"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <button
                        type="button"
                        className={`btn btn-xs btn-square join-item border-2 border-base-200 ${useRegex ? "btn-active btn-primary" : ""}`}
                        title="Toggle Regex Search"
                        onClick={() => setUseRegex(v => !v)}
                        tabIndex={0}
                    >
                        <CodeBracketIcon className="w-4 h-4" />
                    </button>
                </span>

            </div>
        </>
    )
}

export default Search