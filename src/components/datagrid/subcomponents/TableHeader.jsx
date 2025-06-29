import Sort from './Sort';
import Filter from './Filter';

const TableHeader = ({ data: { columnName, sort, filter }, sortStates, onSort, filterOptions, onFilter, style, last }) => {
    return (
        <th className='text-nowrap py-4 px-2' style={style}>
            <div className="flex items-center">
                {sort ? (
                    <>
                        <h2 className='cursor-pointer' onClick={onSort} >{columnName}</h2>
                        <Sort sortStates={sortStates} />
                    </>
                ) : (
                    <>
                        <h2 className=''>{columnName}</h2>
                    </>
                )}
                {filter && (
                    <Filter filterOptions={filterOptions} onFilter={onFilter} last={last} />
                )}
            </div>
        </th>
    )
}

export default TableHeader