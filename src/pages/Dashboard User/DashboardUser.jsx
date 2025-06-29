import { useEffect, useRef, useState } from "react";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";
import MultipleBarChart from "../../components/charts/MultipleBarChart";
import Datagrid from "../../components/datagrid/Datagrid.jsx";

// Dummy data user (ganti dengan data dari backend/user context)
const userStats = [
  { label: "Saldo ETK", value: "1,200" },
  { label: "Saldo IDRS", value: "Rp 8.500.000" },
  { label: "Total Transaksi", value: "24" },
  { label: "Role", value: "Prosumer" },
];

// Dummy data energy generation & burning user per bulan
const userEnergyGenBurnData = [
  { label: "Jan", generation: 120, burning: 80 },
  { label: "Feb", generation: 150, burning: 100 },
  { label: "Mar", generation: 180, burning: 120 },
  { label: "Apr", generation: 200, burning: 140 },
  { label: "May", generation: 220, burning: 160 },
  { label: "Jun", generation: 180, burning: 130 },
];

const userEnergyGenBurnSeries = [
  { key: "generation", label: "Energy Generation (kWh)", color: "primary" },
  {
    key: "burning",
    label: "Energy Burning/Withdrawal (kWh)",
    color: "secondary",
  },
];

// Dummy data transaksi user
const userTransactions = [
  // [ID, Tanggal, Tipe, Jumlah ETK, Harga per ETK, Total IDRS]
  [1, "2025-05-15 10:00", "Buy", 100, 1000, 100000],
  [2, "2025-05-14 09:30", "Sell", 50, 1050, 52500],
  [3, "2025-05-13 14:20", "Buy", 80, 1020, 81600],
  [4, "2025-05-12 11:10", "Sell", 60, 1100, 66000],
];

// Header datagrid
const userTransactionHeader = [
  { columnName: "Timestamp", sort: true, filter: false },
  { columnName: "Tipe", sort: false, filter: false },
  { columnName: "Jumlah ETK", sort: false, filter: false },
  { columnName: "Harga per ETK (IDRS)", sort: false, filter: false },
  { columnName: "Total IDRS", sort: false, filter: false },
];

// Dummy data chart volume trading user per bulan
const userMonthlyVolume = [
  { label: "Jan", value: 200 },
  { label: "Feb", value: 350 },
  { label: "Mar", value: 400 },
  { label: "Apr", value: 320 },
  { label: "May", value: 500 },
  { label: "Jun", value: 420 },
];

// Dummy realtime exporting/importing state
const settlementPeriodMinutes = 10;
const settlementPeriodSeconds = settlementPeriodMinutes * 60;

// Simulasi fluktuasi export/import power (kW)
function getRandomExportPower() {
  // Fluktuasi antara 3kW - 5kW
  return +(3 + Math.random() * 2).toFixed(2);
}
function getRandomImportPower() {
  // Fluktuasi antara 1kW - 2.5kW
  return +(1 + Math.random() * 1.5).toFixed(2);
}

const DashboardUser = () => {
  // State untuk estimator
  const [mode, setMode] = useState("export"); // "export" | "import"
  const [currentPower, setCurrentPower] = useState(getRandomExportPower());
  const [elapsed, setElapsed] = useState(0); // detik
  const [powerHistory, setPowerHistory] = useState([getRandomExportPower()]);

  // Timer untuk simulasi realtime
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // Simulasi fluktuasi power tiap detik
      const power =
        mode === "export" ? getRandomExportPower() : getRandomImportPower();
      setCurrentPower(power);
      setElapsed((prev) => (prev < settlementPeriodSeconds ? prev + 1 : prev));
      setPowerHistory((prev) =>
        prev.length < settlementPeriodSeconds
          ? [...prev, power]
          : [...prev.slice(1), power]
      );
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [mode]);

  // Reset saat settlement selesai
  useEffect(() => {
    if (elapsed >= settlementPeriodSeconds) {
      setElapsed(0);
      setPowerHistory([]);
    }
  }, [elapsed]);

  // Rata-rata power selama periode berjalan
  const avgPower =
    powerHistory.length > 0
      ? powerHistory.reduce((a, b) => a + b, 0) / powerHistory.length
      : 0;

  // Estimasi ETK yang akan didapatkan/diburning pada settlement
  // ETK = (avgPower kW) * (elapsed detik / 3600 detik)
  const etkNow = (avgPower * (elapsed / 3600)).toFixed(3);

  // Estimasi ETK jika periode penuh
  const etkFull = (avgPower * (settlementPeriodSeconds / 3600)).toFixed(3);

  // Progress bar
  const progress = Math.min((elapsed / settlementPeriodSeconds) * 100, 100);

  // Format waktu
  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  return (
    <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 col-span-2 md:col-span-2 xl:col-span-4">
        <h1 className="text-3xl font-bold">My Energy Trading Dashboard</h1>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 col-span-2 md:col-span-2 xl:col-span-4">
        {userStats.map((stat) => (
          <div
            key={stat.label}
            className="card bg-base-100 border-2 border-base-300"
          >
            <div className="card-body p-4 items-center">
              <div className="text-2xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-base-content/60">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Periodic Settlement Estimator */}
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">Periodic Settlement Estimator</h2>
          <div className="mb-2">
            <span className="font-semibold">
              {mode === "export" ? "Exporting" : "Importing"}
            </span>{" "}
            <span className="text-base-content/60">
              (periode {settlementPeriodMinutes} menit)
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm">
              Power sekarang:{" "}
              <span className="font-semibold">{currentPower} kW</span>
            </span>
            <button
              className="btn btn-xs btn-outline ml-2"
              onClick={() => {
                setMode((m) => (m === "export" ? "import" : "export"));
                setElapsed(0);
                setPowerHistory([]);
              }}
            >
              Switch to {mode === "export" ? "Import" : "Export"}
            </button>
          </div>
          <div className="text-xs text-base-content/60 mb-2">
            Rata-rata power:{" "}
            <span className="font-semibold">{avgPower.toFixed(2)} kW</span>
            <br />
            Estimasi ETK {mode === "export" ? "didapatkan" : "diburning"} saat
            settlement: <span className="font-semibold">{etkFull} ETK</span>
            <br />
            ETK berjalan: <span className="font-semibold">{etkNow} ETK</span>
          </div>
          {/* Progress bar pindah ke sini */}
          <div className="w-full bg-base-200 rounded h-3 mb-1">
            <div
              className={`h-3 rounded ${
                mode === "export" ? "bg-primary" : "bg-error"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-base-content/60">
            <span>Mulai: 00:00</span>
            <span>Sekarang: {formatTime(elapsed)}</span>
            <span>Selesai: {formatTime(settlementPeriodSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Energy Generation & Burning User */}
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">
            Energy Generation & Energy Burning
          </h2>
          <MultipleBarChart
            data={userEnergyGenBurnData}
            series={userEnergyGenBurnSeries}
          />
          <div className="text-xs text-base-content/60 mt-2">
            Grafik perbandingan energi (ETK) yang Anda hasilkan dan
            burning/withdrawal setiap bulan.
          </div>
        </div>
      </div>

      {/* User Monthly Volume */}
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">
            Volume Trading Saya per Bulan (ETK)
          </h2>
          <BarChart data={userMonthlyVolume} color="primary" />
          <div className="text-xs text-base-content/60 mt-2">
            Total volume ETK yang Anda perdagangkan setiap bulan.
          </div>
        </div>
      </div>

      {/* User Transactions */}
      <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
        <div className="card-body">
          <h2 className="card-title mb-2">Transaksi Saya Terbaru</h2>
          <Datagrid
            tableData={userTransactions.map(([id, ...rest]) => rest)}
            tableHeaderData={userTransactionHeader}
            showCheckboxes={false}
            tableOptions={{
              numberOfRows: 5,
              rowHeight: 12,
              headerHeight: 40,
              pagination: false,
              search: false,
            }}
          />
          <div className="text-xs text-base-content/60 mt-2">
            Daftar transaksi ETK Anda, baik pembelian maupun penjualan, beserta
            detail harga dan total IDRS.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
