import React from 'react'
import Datagrid from '../datagrid/Datagrid'
import { originalTableData, tableHeaderData } from '../datagrid/helper/dummy'

const RecentTransactions = () => {
    return (
        <Datagrid tableData={originalTableData} tableHeaderData={tableHeaderData} />
    )
}

export default RecentTransactions