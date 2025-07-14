import { useEffect, useRef, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  filterBySearch,
  getFilterOptions,
  getIndexWidth,
  getMaxColumnWidths,
  getPaginatedData,
  getSelectedData,
  getTotalPages,
  handleFilter,
  handleExportExcel,
  handleExportCSV,
  handleExportPDF,
  handleCheckboxChange,
  handleSelectAll,
  onSortHandler,
  handleFilterChangeHandler,
} from "./helper/datagrid_helper";
import Search from "./subcomponents/Search";
import TableHeader from "./subcomponents/TableHeader";
import TableRow from "./subcomponents/TableRow";
import Pagination from "./subcomponents/Pagination";
import ItemPerPage from "./subcomponents/ItemPerPage";

const Datagrid = ({
  tableHeaderData,
  tableData,
  showCheckboxes = false,
  onSelectionChange = () => {},
  onAdd,
  onDelete,
  onSend,
  onReset,
  tableOptions = {},
}) => {
  const [filteredData, setFilteredData] = useState(tableData);
  const [sortedData, setSortedData] = useState(tableData);
  const [sortStates, setSortStates] = useState(
    Array(tableHeaderData.length).fill(0)
  );
  const [filterChecked, setFilterChecked] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchColumn, setSearchColumn] = useState(
    tableHeaderData[0]?.columnName || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [columnWidths, setColumnWidths] = useState([]);
  const [indexWidth, setIndexWidth] = useState(getIndexWidth(tableData));
  const rowRef = useRef(null);
  const [rowHeight, setRowHeight] = useState(0.0);
  const [selectedRows, setSelectedRows] = useState([]);
  const [useRegex, setUseRegex] = useState(false);
  const selectedData = getSelectedData(filteredData, selectedRows);
  const totalItems = filteredData.length;
  const totalPages = getTotalPages(filteredData, itemsPerPage);
  const paginatedData = getPaginatedData(
    filteredData,
    currentPage,
    itemsPerPage
  );
  const filterOptions = getFilterOptions(tableData, tableHeaderData);

  // export const tableOptions =
  // {
  //   itemPerPage: false,
  //   numberOfRows: 5,
  //   rowHeight: 40,
  //   headerHeight: 40,
  //   pagination: false,
  //   actionButtons: false,
  //   exportButton: true,
  //   search: false,
  // }

  // destructuring tableOptions;
  const {
    itemsPerPage: showItemsPerPage = false,
    numberOfRows = 12,
    rowHeight: defaultRowHeight = 56.8,
    headerHeight = 53.5,
    pagination: showPagination = false,
    actionButtons = false,
    exportButton = true,
    search = false,
  } = tableOptions;

  useEffect(() => {
    setItemsPerPage(numberOfRows);
  }, [numberOfRows]);

  useEffect(() => {
    setRowHeight(defaultRowHeight);
  }, [defaultRowHeight]);

  // Handle export
  const handleExportExcelClick = () =>
    handleExportExcel({
      showCheckboxes,
      selectedRows,
      tableData: sortedData,
      tableHeaderData,
    });

  const handleExportCSVClick = () =>
    handleExportCSV({
      showCheckboxes,
      selectedRows,
      tableData: sortedData,
      tableHeaderData,
    });

  const handleExportPDFClick = () =>
    handleExportPDF({
      showCheckboxes,
      selectedRows,
      tableData: sortedData,
      tableHeaderData,
    });

  const handleCheckboxChangeClick = (rowId) =>
    handleCheckboxChange(
      rowId,
      selectedRows,
      setSelectedRows,
      onSelectionChange
    );

  const handleSelectAllClick = (checked) =>
    handleSelectAll(checked, filteredData, setSelectedRows, onSelectionChange);

  const onSort = (colIdx) =>
    onSortHandler(
      colIdx,
      sortStates,
      tableData,
      tableHeaderData,
      setSortStates,
      setSortedData
    );

  const handleFilterChange = (colIdx, checkedValues) =>
    handleFilterChangeHandler(
      colIdx,
      checkedValues,
      filterChecked,
      tableData,
      setFilterChecked,
      setFilteredData
    );

  useEffect(() => {
    setCurrentPage(1);
    let filtered = handleFilter(sortedData, filterChecked);
    filtered = filterBySearch(
      filtered,
      tableHeaderData,
      searchColumn,
      searchValue,
      useRegex
    );
    setFilteredData(filtered);
  }, [
    searchValue,
    searchColumn,
    filterChecked,
    sortedData,
    tableHeaderData,
    useRegex,
  ]);

  useEffect(() => {
    const widths = getMaxColumnWidths(tableHeaderData, tableData);
    setColumnWidths(widths);
    setIndexWidth(getIndexWidth(tableData));
    setSelectedRows([]);
    setSortedData(tableData);
  }, [tableHeaderData, tableData]);

  useEffect(() => {
    if (rowRef.current) {
      setRowHeight(rowRef.current.getBoundingClientRect().height);
    }
  }, [paginatedData, columnWidths, rowHeight]);

  useEffect(() => {
    if (currentPage > Math.ceil(tableData.length / itemsPerPage)) {
      setCurrentPage(Math.max(1, Math.ceil(tableData.length / itemsPerPage)));
    }
  }, [tableData, itemsPerPage, currentPage]);

  return (
    <div className="relative flex flex-col items-start w-full h-auto">
      <div className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between mb-2 gap-2">
        <div className="flex gap-2 w-full md:w-auto justify-start items-center">
          {search && (
            <div className="flex gap-2 w-full md:w-auto justify-start items-center">
              <Search
                searchColumn={searchColumn}
                setSearchColumn={setSearchColumn}
                tableHeaderData={tableHeaderData}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                useRegex={useRegex}
                setUseRegex={setUseRegex}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          {exportButton && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className={`btn flex items-center gap-2 ${
                  showCheckboxes && selectedRows.length === 0
                    ? "btn-disabled"
                    : ""
                }`}
                disabled={showCheckboxes && selectedRows.length === 0}
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Export
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu border-2 border-base-300 bg-base-100 rounded-box z-10 w-44 p-2 shadow"
              >
                <li>
                  <a
                    onClick={handleExportCSVClick}
                    className={
                      showCheckboxes && selectedRows.length === 0
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  >
                    Export CSV
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleExportExcelClick}
                    className={
                      showCheckboxes && selectedRows.length === 0
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  >
                    Export Excel
                  </a>
                </li>
                <li>
                  <a
                    onClick={handleExportPDFClick}
                    className={
                      showCheckboxes && selectedRows.length === 0
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  >
                    Export PDF
                  </a>
                </li>
              </ul>
            </div>
          )}
          {actionButtons && (
            <button className="btn btn-primary" onClick={onAdd}>
              <PlusIcon className="w-5 h-5" />
              Add
            </button>
          )}
        </div>
      </div>
      {/* Table */}
      <div
        className="overflow-auto rounded-box bg-base-100 border-base-300 border-2 w-full h-auto"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      >
        <table className="table min-w-full">
          <thead>
            <tr className="z-10 bg-base-100">
              {showCheckboxes && (
                <th
                  className="py-4 pl-4 pr-0 leading-0"
                  style={{ height: headerHeight }}
                >
                  <input
                    className="checkbox checkbox-primary checkbox-xs"
                    type="checkbox"
                    checked={
                      filteredData.length > 0 &&
                      filteredData.every((row) => selectedRows.includes(row[0]))
                    }
                    onChange={(e) => handleSelectAllClick(e.target.checked)}
                  />
                </th>
              )}
              <th className="">#</th>
              {tableHeaderData.map((header, idx) => (
                <TableHeader
                  key={header.columnName}
                  data={header}
                  sortStates={sortStates[idx]}
                  onSort={() => onSort(idx)}
                  filterOptions={filterOptions[idx]}
                  onFilter={(checkedValues) =>
                    handleFilterChange(idx, checkedValues)
                  }
                  style={{
                    minWidth: columnWidths[idx],
                    maxWidth: columnWidths[idx],
                    height: headerHeight
                  }}
                  last={idx === tableHeaderData.length - 1}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((data, index) => (
              <TableRow
                ref={index === 0 ? rowRef : undefined}
                data={data}
                indexWidth={indexWidth}
                index={(currentPage - 1) * itemsPerPage + index}
                indexPaginated={index}
                key={data[0]}
                columnWidths={columnWidths}
                showCheckbox={showCheckboxes}
                checked={selectedRows.includes(data[0])}
                onCheckboxChange={() => handleCheckboxChangeClick(data[0])}
                height={defaultRowHeight}
              />
            ))}
            {paginatedData.length < itemsPerPage && rowHeight > 0 && (
              <tr>
                <td
                  colSpan={tableHeaderData.length + 1}
                  style={{ padding: 0, border: "none" }}
                >
                  <div
                    style={{
                      height:
                        rowHeight * (itemsPerPage - paginatedData.length) - 0.8,
                      width: "100%",
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="grid w-full mt-2 gap-2 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center">
        <div className="flex  items-center gap-2 justify-center sm:justify-start col-span-1">
          {actionButtons && (
            <>
              <button
                className="flex-1 sm:flex-none btn"
                onClick={onReset}
                title="Reset Table Data"
              >
                <ArrowPathIcon className="w-5 h-5" /> Reset
              </button>
              <button
                className="flex-1 sm:flex-none btn"
                disabled={selectedRows.length === 0}
                onClick={() => onSend(selectedData)}
                title="Send to New Page"
              >
                <ArrowUpRightIcon className="w-5 h-5" /> Send
              </button>
              <button
                className="flex-1 sm:flex-none btn"
                disabled={selectedRows.length === 0}
                onClick={() => {
                  onDelete(selectedRows);
                  setSelectedRows([]);
                  onSelectionChange([]);
                }}
                title="Delete Selected"
              >
                <TrashIcon className="w-5 h-5" /> Del
              </button>
            </>
          )}
        </div>
        {showPagination && (
          <div className="flex  justify-center xl:justify-center col-span-1 sm:justify-end">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        )}
        {/* Items Per Page */}
        {showItemsPerPage && (
          <div className="flex  justify-center col-span-1 sm:justify-end sm:col-span-2 xl:col-span-1">
            <ItemPerPage
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setCurrentPage={setCurrentPage}
              totalItems={totalItems}
              currentPage={currentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Datagrid;
