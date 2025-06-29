import React from 'react'
import Homepage from '../pages/Homepage'
import Datagrid from '../pages/Datagrid'
import { originalTableData, tableHeaderData } from '../components/datagrid/helper/dummy'

/**
 * Renders the main content area based on the selected menu.
 *
 * @component
 * @param {Object} props
 * @param {number} props.menu - The current menu selection. If 0, displays the Homepage component; if 1, displays the Datagrid component.
 * @returns {JSX.Element} The rendered content area.
 */
const Content = ({ menu }) => {
    return (
        <div className="flex-1 z-0">
            <div className="w-full flex flex-col items-center justify-center h-full flex-1">
                {/* Show Homepage if menu is 0, otherwise show Datagrid */}
                

                {menu === 0 && <Homepage />}
                {menu === 1 && <Datagrid originalTableData={originalTableData} tableHeaderData={tableHeaderData} />}
            </div>
        </div>
    )
}

export default Content