import ItemPerPage from "../../../components/datagrid/subcomponents/ItemPerPage";
import Pagination from "../../../components/datagrid/subcomponents/Pagination";

// Fungsi utilitas
export const getRandomFloat = (min, max, decimals = 2) =>
  +(Math.random() * (max - min) + min).toFixed(decimals);

export const getNowTimeString = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

// Konstanta
export const energyHistoryHeader = [
  { columnName: "Time", sort: false, filter: false },
  { columnName: "Solar (kWh)", sort: false, filter: false },
  { columnName: "Usage (kWh)", sort: false, filter: false },
  { columnName: "Grid (kWh)", sort: false, filter: false },
  { columnName: "Battery (kWh)", sort: false, filter: false },
];

export const tableOptions =
{
  itemPerPage: false,
  numberOfRows: 12,
  rowHeight: 12,
  headerHeight: 40,
  pagination: false,
  actionButtons: false,
  exportButton: false,
  search: false,
}

export const DEVICE_LIST = [
  { device_id: "SM-001", location: "Rooftop, Home" },
  { device_id: "SM-002", location: "Garage" },
];

export const TIME_WINDOWS = [
  { value: "1m", label: "Last 1m" },
  { value: "5m", label: "Last 5m" },
  { value: "10m", label: "Last 10m" },
  { value: "1d", label: "Last 1d" },
  { value: "7d", label: "Last 7d" },
  { value: "30d", label: "Last 30d" },
];

export const initialHistory = Array.from({ length: 12 }, (_, i) => ({
  time: `${12 - i}:00`,
  solar: getRandomFloat(0.2, 0.4),
  usage: getRandomFloat(0.2, 0.4),
  grid: getRandomFloat(-0.05, 0.05),
  battery: getRandomFloat(6.2, 7.0),
}));