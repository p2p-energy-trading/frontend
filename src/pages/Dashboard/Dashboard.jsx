import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import PieChart from "../../components/charts/PieChart";
import MultipleBarChart from "../../components/charts/MultipleBarChart";
import MapChart from "../../components/charts/MapChart";
import Datagrid from "../../components/datagrid/Datagrid.jsx";

import indonesiaGeo from "../../components/charts/helper/geojson/gadm41_IDN_1.json";
const jawaProvinces = ["ID.JK", "ID.JR", "ID.BT", "ID.JT", "ID.YO", "ID.JI"];

// Dashboard.jsx - ADMIN/GLOBAL DASHBOARD
// This dashboard shows platform-wide statistics and is intended for admin users
// For user-specific dashboard, see DashboardUser.jsx which uses /dashboard APIs

// Dummy data untuk P2P Energy Trading - Platform Wide Statistics
const stats = [
  { label: "Total ETK", value: "12,500" },
  { label: "Total IDRS", value: "Rp 85.000.000" },
  { label: "Total Transactions", value: "1,234" },
  { label: "Total Users", value: "320" },
];

const transactionGrowthData = [
  { label: "Jan", etk: 1200, idrs: 800 },
  { label: "Feb", etk: 1500, idrs: 1100 },
  { label: "Mar", etk: 1800, idrs: 1300 },
  { label: "Apr", etk: 2000, idrs: 1700 },
  { label: "May", etk: 2200, idrs: 1900 },
  { label: "Jun", etk: 1800, idrs: 1600 },
];

const transactionGrowthSeries = [
  { key: "etk", label: "ETK", color: "primary" },
  { key: "idrs", label: "IDRS", color: "secondary" },
];

const monthlyVolumeData = [
  { label: "Jan", value: 2000 }, // contoh: total IDRS yang diperdagangkan bulan Jan
  { label: "Feb", value: 3200 },
  { label: "Mar", value: 4100 },
  { label: "Apr", value: 3900 },
  { label: "May", value: 4500 },
  { label: "Jun", value: 3700 },
];

const monthlyVolumeETKData = [
  { label: "Jan", value: 1200 }, // contoh: total ETK yang diperdagangkan bulan Jan
  { label: "Feb", value: 1500 },
  { label: "Mar", value: 1800 },
  { label: "Apr", value: 2000 },
  { label: "May", value: 2200 },
  { label: "Jun", value: 1800 },
];

const userDistributionData = [
  { label: "Producers", value: 120 },
  { label: "Consumers", value: 180 },
  { label: "Prosumer", value: 20 },
];

const transactionMapData = [
  { id: "ID.JK", name: "DKI Jakarta", etk: 1200 },
  { id: "ID.JR", name: "Jawa Barat", etk: 1500 },
  { id: "ID.BT", name: "Banten", etk: 800 },
  { id: "ID.JT", name: "Jawa Tengah", etk: 1000 },
  { id: "ID.YO", name: "DI Yogyakarta", etk: 400 },
  { id: "ID.JI", name: "Jawa Timur", etk: 900 },
];

const monthlyGenerationData = [
  { label: "Jan", value: 950 },
  { label: "Feb", value: 1200 },
  { label: "Mar", value: 1350 },
  { label: "Apr", value: 1600 },
  { label: "May", value: 1800 },
  { label: "Jun", value: 1500 },
];

const monthlyBurningData = [
  { label: "Jan", value: 300 },
  { label: "Feb", value: 400 },
  { label: "Mar", value: 350 },
  { label: "Apr", value: 500 },
  { label: "May", value: 600 },
  { label: "Jun", value: 450 },
];

// Dummy datagrid
const apiMonitorTableHeaderData = [
  //   { columnName: "ID", label: "ID" },
  { columnName: "User", sort: false, filter: false },
  { columnName: "Type", sort: false, filter: false },
  { columnName: "Amount (ETK)", sort: false, filter: false },
  { columnName: "Harga per ETK (IDRS)", sort: false, filter: false },
  { columnName: "Total IDRS", sort: false, filter: false },
  { columnName: "Timestamp", sort: true, filter: false },
];
const apiMonitorTableDataRaw = [
  [1, "user1", "Buy", 100, 1000, "2025-05-15 10:00"],
  [2, "user2", "Sell", 200, 1050, "2025-05-15 10:05"],
  [3, "user3", "Buy", 150, 1080, "2025-05-15 10:10"],
  [4, "user4", "Sell", 300, 1050, "2025-05-15 10:15"],
  [5, "user5", "Buy", 120, 1000, "2025-05-15 10:20"],
];

// Hanya ambil kolom Amount ETK, Harga per ETK, dan hitung Total IDRS
const apiMonitorTableData = apiMonitorTableDataRaw.map((row) => [
  row[0], // ID
  row[1], // User
  row[2], // Type
  row[3], // Amount (ETK)
  row[4], // Harga per ETK (IDRS)
  row[3] * row[4], // Total IDRS
  row[5], // Timestamp
]);

// Gabungkan data generation dan burning untuk MultipleBarChart
const energyGenBurnData = [
  { label: "Jan", generation: 950, burning: 300 },
  { label: "Feb", generation: 1200, burning: 400 },
  { label: "Mar", generation: 1350, burning: 350 },
  { label: "Apr", generation: 1600, burning: 500 },
  { label: "May", generation: 1800, burning: 600 },
  { label: "Jun", generation: 1500, burning: 450 },
];

const energyGenBurnSeries = [
  { key: "generation", label: "Energy Generation (kWh)", color: "primary" },
  {
    key: "burning",
    label: "Energy Burning/Withdrawal (kWh)",
    color: "secondary",
  },
];

// Contoh data rata-rata harga ETK per bulan (misal dalam IDRS)
const avgEtkPriceData = [
  { label: "Jan", value: 1000 },
  { label: "Feb", value: 1050 },
  { label: "Mar", value: 1100 },
  { label: "Apr", value: 1080 },
  { label: "May", value: 1150 },
  { label: "Jun", value: 1200 },
];

// Contoh data total akumulasi ETK di platform (kumulatif generation - burning)
const cumulativeEtkData = [
  { label: "Jan", value: 650 }, // 950 - 300
  { label: "Feb", value: 1450 }, // 650 + (1200 - 400)
  { label: "Mar", value: 2450 }, // 1450 + (1350 - 350)
  { label: "Apr", value: 3550 }, // 2450 + (1600 - 500)
  { label: "May", value: 4750 }, // 3550 + (1800 - 600)
  { label: "Jun", value: 5800 }, // 4750 + (1500 - 450)
];

const sellerProfitIdrsData = [
  { label: "Jan", value: 1800000 },
  { label: "Feb", value: 2100000 },
  { label: "Mar", value: 2500000 },
  { label: "Apr", value: 2300000 },
  { label: "May", value: 2700000 },
  { label: "Jun", value: 2200000 },
];

const tableOptions = {
  itemPerPage: false,
  numberOfRows: 5,
  rowHeight: 12,
  headerHeight: 40,
  pagination: false,
  actionButtons: false,
  exportButton: false,
  search: true,
};

const Dashboard = () => {
  return (
    <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 col-span-2 md:col-span-2 xl:col-span-4">
        <h1 className="text-3xl font-bold">P2P Energy Trading Dashboard</h1>
        {/* <button className="btn btn-primary btn-sm">Download Report</button> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 col-span-2 md:col-span-2 xl:col-span-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="card bg-base-100 border-2 border-base-300"
          >
            <div className="card-body p-4 items-center">
              <div className="text-2xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-base-content/60">{stat.label}</div>
              {stat.label === "Total ETK" && (
                <div className="text-xs text-base-content/60 mt-1 text-center">
                  Total peredaran ETK di platform.
                  <br />
                  <span className="font-semibold">{stat.value} kWh</span> (1 ETK
                  = 1 kWh)
                </div>
              )}
              {stat.label === "Total IDRS" && (
                <div className="text-xs text-base-content/60 mt-1 text-center">
                  Total peredaran IDRS di platform.
                  <br />
                  <span className="font-semibold">{stat.value}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">
            Energy Generation & Energy Burning
          </h2>
          <MultipleBarChart
            data={energyGenBurnData}
            series={energyGenBurnSeries}
          />
          <div className="text-xs text-base-content/60 mt-2">
            Energy generation vs consumption chart (ETK) showing the
            burning/withdrawal by all users monthly on the platform.
          </div>
        </div>
      </div>
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-1 xl:col-span-2">
        <div className="card-body">
          <h2 className="card-title mb-2">Monthly Trading Volume (IDRS)</h2>
          <BarChart data={monthlyVolumeData} color="primary" />
          <div className="text-xs text-base-content/60 mt-2">
            Total IDRS (Indonesian Rupiah Stablecoin) trading volume on platform
            setiap bulan.
          </div>
        </div>
      </div>
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-1 xl:col-span-2">
        <div className="card-body">
          <h2 className="card-title mb-2">Monthly Trading Volume (ETK)</h2>
          <BarChart data={monthlyVolumeETKData} color="secondary" />
          <div className="text-xs text-base-content/60 mt-2">
            Total ETK (Energy Token, 1 ETK = 1 kWh) trading volume on platform
            setiap bulan.
          </div>
        </div>
      </div>
      {/* Total ETK Generation */}
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-1 xl:col-span-2">
        <div className="card-body">
          <h2 className="card-title mb-2">
            Rata-rata Harga ETK per Bulan (IDRS)
          </h2>
          <LineChart data={avgEtkPriceData} color="primary" />
          <div className="text-xs text-base-content/60 mt-2">
            Rata-rata harga 1 ETK (Energy Token) terhadap IDRS setiap bulan di
            platform.
          </div>
        </div>
      </div>
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-1 xl:col-span-2">
        <div className="card-body">
          <h2 className="card-title mb-2">Total Akumulasi ETK di Platform</h2>
          <LineChart data={cumulativeEtkData} color="secondary" />
          <div className="text-xs text-base-content/60 mt-2">
            Total ETK (Energy Token) yang beredar di platform, dihitung dari
            total generation dikurangi total burning secara kumulatif.
          </div>
        </div>
      </div>
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">
            Total IDRS Keuntungan Penjual ETK per Bulan
          </h2>
          <LineChart data={sellerProfitIdrsData} color="primary" />
          <div className="text-xs text-base-content/60 mt-2">
            Total IDRS yang diterima oleh seluruh penjual ETK di platform setiap
            bulan.
          </div>
        </div>
      </div>
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">User Distribution</h2>
          <PieChart
            data={userDistributionData}
            firstColor="primary"
            secondColor="base-200"
          />
          <div className="text-xs text-base-content/60 mt-2">
            Distribusi jumlah pengguna berdasarkan peran: Producers, Consumers,
            dan Prosumer di platform.
          </div>
        </div>
      </div>
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">ETK Generation Map</h2>
          <MapChart
            data={transactionMapData.map((d) => ({
              id: d.id,
              name: d.name,
              etk: d.etk,
            }))}
            mapJSON={indonesiaGeo}
            mapFilter={jawaProvinces}
            firstColor="primary"
            secondColor="base-200"
            valueKey="etk"
          />
          <div className="text-xs text-base-content/60 mt-2">
            Map showing the distribution of total ETK (energy) generated in each
            provinsi di Pulau Jawa.
          </div>
        </div>
      </div>
      {/* Datagrid */}
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">Recent Transactions</h2>
          <Datagrid
            tableData={apiMonitorTableData}
            tableHeaderData={apiMonitorTableHeaderData}
            showCheckboxes={false}
            tableOptions={tableOptions}
          />
          <div className="text-xs text-base-content/60 mt-2">
            List of recent ETK transactions on the platform, showing ETK amount,
            price per ETK (IDRS), and total IDRS for each transaction.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
