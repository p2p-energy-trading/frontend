import React from 'react'

const ItemPerPage = ({ itemsPerPage, setItemsPerPage, setCurrentPage, totalItems, currentPage }) => {
    return (
        <div className="flex items-center gap-2">
            <select
                className="select select-bordered border-2 border-base-200 w-auto"
                value={itemsPerPage}
                onChange={e => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                }}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
            <p className="text-sm">
                {totalItems === 0
                    ? '0'
                    : `${(currentPage - 1) * itemsPerPage + 1} - ${Math.min(currentPage * itemsPerPage, totalItems)}`}
                {' '}of {totalItems} items
            </p>
        </div>
    )
}

export default ItemPerPage