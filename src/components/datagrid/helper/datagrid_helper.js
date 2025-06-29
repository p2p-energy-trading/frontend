import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";


export const getFilterOptions = (tableData, headerData) => {
    return tableData[0]
        .slice(1) 
        .map((_, colIdx) => headerData[colIdx].filter ? colIdx : null)
        .filter(idx => idx !== null)
        .reduce((acc, colIdx) => {
            const uniqueValues = [
                ...new Set(
                    tableData.map(row => {
                        const val = row[colIdx + 1]; 
                        if (typeof val === "object" && val.text) return val.text;
                        return val;
                    })
                )
            ];
            acc[colIdx] = uniqueValues;
            return acc;
        }, {});
};

export const handleSort = (colIdx, sortStates, tableData, originalTableData, headerData) => {
    const newSortStates = sortStates.map((state, idx) => idx === colIdx ? (state + 1) % 3 : 0);

    if (newSortStates[colIdx] === 0) {
        return { newSortStates, sortedData: originalTableData };
    }

    const behavior = headerData?.[colIdx]?.sort?.behavior || 'text';

    const getSortValue = (val) => {
        if (val && typeof val === 'object') {
            if (val.text) return val.text;
            if (val.level !== undefined) return val.level;
            return '';
        }
        return val;
    };

    const sorted = [...tableData].sort((a, b) => {
        let aVal = getSortValue(a[colIdx + 1]);
        let bVal = getSortValue(b[colIdx + 1]);

        if (behavior === 'number') {
            aVal = parseFloat(aVal?.toString().replace(/[^\d.-]/g, '')) || 0;
            bVal = parseFloat(bVal?.toString().replace(/[^\d.-]/g, '')) || 0;
            return newSortStates[colIdx] === 1 ? aVal - bVal : bVal - aVal;
        }

        if (behavior === 'date') {
            aVal = new Date(aVal).getTime() || 0;
            bVal = new Date(bVal).getTime() || 0;
            return newSortStates[colIdx] === 1 ? aVal - bVal : bVal - aVal;
        }

        return newSortStates[colIdx] === 1
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
    });

    return { newSortStates, sortedData: sorted };
};

export const handleFilter = (tableData, filterChecked) => {
    return tableData.filter(row => {
        return Object.entries(filterChecked).every(([filterColIdx, values]) => {
            if (!values || values.length === 0) return true;
            const val = row[Number(filterColIdx) + 1];
            const compareVal = (typeof val === "object" && val.text) ? val.text : val;
            return values.includes(compareVal);
        });
    });
};

export const filterBySearch = (tableData, tableHeaderData, searchColumn, searchValue, useRegex = false) => {
    if (!searchValue || !searchColumn) return tableData;
    const colIdx = tableHeaderData.findIndex(h => h.columnName === searchColumn);
    let regex;
    if (useRegex) {
        try {
            regex = new RegExp(searchValue, "i");
        } catch {
            return tableData;
        }
    }
    return tableData.filter(row => {
        let cell = row[colIdx + 1]; 
        if (typeof cell === "object" && cell.text) cell = cell.text;
        if (useRegex) {
            return regex.test(cell?.toString() || "");
        }
        return cell?.toString().toLowerCase().includes(searchValue.toLowerCase());
    });
};

export const getTextWidth = (text, font = "14px Arial") => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  return context.measureText(text).width;
};

export const getIndexWidth = (tableData) => {
  const maxIndex = tableData.length;
  const digitCount = maxIndex.toString().length;
  return digitCount * 14 + 14;
};

export const getMaxColumnWidths = (headerData, tableData) => {
  const AVATAR_WIDTH = 42;
  const BADGE_PADDING = 11 * 2;
  const STATUS_WIDTH = 8 + 2;
  const ICON_WIDTH_SORT = 20;
  const ICON_WIDTH_FILTER = 20;
  const CELL_PADDING = 8 * 2;

  const getCellWidth = (cell) => {
    if (cell && typeof cell === "object") {
      let width = 0;
      if (cell.columnName) {
        width =
          typeof cell.columnName === "object"
            ? getTextWidth(cell.columnName.text || "") + CELL_PADDING
            : getTextWidth(cell.columnName) + CELL_PADDING;
      } else if (cell.text) {
        width = getTextWidth(cell.text) + CELL_PADDING;
      } else {
        width = getTextWidth(cell) + CELL_PADDING;
      }
      if (cell.sort) width += ICON_WIDTH_SORT;
      if (cell.filter) width += ICON_WIDTH_FILTER;
      if (cell.decorator && cell.decorator.avatar) width += AVATAR_WIDTH;
      if (cell.decorator && cell.decorator.status) {
        width += cell.decorator.status.badge
          ? STATUS_WIDTH + BADGE_PADDING
          : STATUS_WIDTH;
      }
      if (cell.decorator && cell.decorator.badge) width += BADGE_PADDING;
      return width;
    } else {
      return getTextWidth(cell != null ? String(cell) : "") + CELL_PADDING;
    }
  };

  return headerData.map((header, colIdx) => {
    let maxLen = getCellWidth(header);
    tableData.forEach((row) => {
      let cell = row[colIdx + 1];
      let cellLen = getCellWidth(cell);
      if (cellLen > maxLen) maxLen = cellLen;
    });
    return Math.ceil(maxLen) + CELL_PADDING;
  });
};

export const getSelectedData = (filteredData, selectedRows) => {
  return filteredData.filter((row) => selectedRows.includes(row[0]));
};

export const getTotalPages = (filteredData, itemsPerPage) => {
  return Math.ceil(filteredData.length / itemsPerPage);
};

export const getPaginatedData = (filteredData, currentPage, itemsPerPage) => {
  const start = (currentPage - 1) * itemsPerPage;
  return filteredData.slice(start, start + itemsPerPage);
};

export const handleExportExcel = ({
  showCheckboxes,
  selectedRows,
  tableData,
  tableHeaderData,
}) => {
  const exportRows =
    showCheckboxes && selectedRows.length > 0
      ? tableData.filter((row) => selectedRows.includes(row[0]))
      : tableData;

  const headers = ["#", ...tableHeaderData.map((h) => h.columnName)];
  const rows = exportRows.map((row, i) => [
    i + 1,
    ...row
      .slice(1)
      .map((cell) =>
        typeof cell === "object"
          ? cell.text ||
            cell?.decorator?.avatar?.src ||
            cell?.decorator?.status?.type ||
            JSON.stringify(cell)
          : cell
      ),
  ]);
  const data = [headers, ...rows];

  const colWidths = headers.map((_, colIdx) => {
    return {
      wch: Math.max(
        ...data.map((row) => String(row[colIdx] ?? "").length),
        6
      ),
    };
  });

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, "datagrid_export.xlsx");
};

export const handleExportCSV = ({
  showCheckboxes,
  selectedRows,
  tableData,
  tableHeaderData,
}) => {
  const exportRows =
    showCheckboxes && selectedRows.length > 0
      ? tableData.filter((row) => selectedRows.includes(row[0]))
      : tableData;

  const headers = ["#", ...tableHeaderData.map((h) => h.columnName)];
  const rows = exportRows.map((row, i) => [
    i + 1,
    ...row
      .slice(1)
      .map((cell) =>
        typeof cell === "object"
          ? cell.text ||
            cell?.decorator?.avatar?.src ||
            cell?.decorator?.status?.type ||
            JSON.stringify(cell)
          : cell
      ),
  ]);
  const csv = Papa.unparse([headers, ...rows]);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "datagrid_export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const handleExportPDF = ({
  showCheckboxes,
  selectedRows,
  tableData,
  tableHeaderData,
}) => {
  const exportRows =
    showCheckboxes && selectedRows.length > 0
      ? tableData.filter((row) => selectedRows.includes(row[0]))
      : tableData;

  const headers = [["#", ...tableHeaderData.map((h) => h.columnName)]];
  const rows = exportRows.map((row, i) => [
    i + 1,
    ...row
      .slice(1)
      .map((cell) =>
        typeof cell === "object"
          ? cell.text ||
            cell?.decorator?.avatar?.src ||
            cell?.decorator?.status?.type ||
            JSON.stringify(cell)
          : cell
      ),
  ]);
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });
  autoTable(doc, {
    head: headers,
    body: rows,
    styles: { fontSize: 8, overflow: "linebreak" },
    tableWidth: "wrap",
    margin: { left: 20, right: 20, top: 30, bottom: 30 },
    horizontalPageBreak: true,
    didDrawPage: (data) => {
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(
        `Page ${
          doc.internal.getCurrentPageInfo().pageNumber
        } of ${pageCount}`,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    },
  });
  doc.save("datagrid_export.pdf");
};

export const handleCheckboxChange = (rowId, selectedRows, setSelectedRows, onSelectionChange) => {
  setSelectedRows((prev) => {
    let updated;
    if (prev.includes(rowId)) {
      updated = prev.filter((id) => id !== rowId);
    } else {
      updated = [...prev, rowId];
    }
    onSelectionChange(updated);
    return updated;
  });
};

export const handleSelectAll = (checked, filteredData, setSelectedRows, onSelectionChange) => {
  let updated;
  if (checked) {
    updated = filteredData.map((row) => row[0]);
  } else {
    updated = [];
  }
  setSelectedRows(updated);
  onSelectionChange(updated);
};

export const onSortHandler = (colIdx, sortStates, tableData, tableHeaderData, setSortStates, setFilteredData) => {
  const { newSortStates, sortedData } = handleSort(
    colIdx,
    sortStates,
    tableData,
    tableData,
    tableHeaderData
  );
  setSortStates(newSortStates);
  setFilteredData(sortedData);
};

export const handleFilterChangeHandler = (colIdx, checkedValues, filterChecked, tableData, setFilterChecked, setFilteredData) => {
  setFilterChecked((prev) => {
    const updated = { ...prev, [colIdx]: checkedValues };
    const filtered = handleFilter(tableData, updated);
    setFilteredData(filtered);
    return updated;
  });
};