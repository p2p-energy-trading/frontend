// import React, { useContext, useEffect, useState } from 'react'
import ChartPrice from "../../components/trade/ChartPrice";

// import { colorsInDarkMode, colorsInLightMode } from "./utils/tradeUtils";
import OrderBook from "../../components/trade/OrderBook";
import Battery from "../../components/energy conversion/Battery";
import BatterySimulator from "../../simulator/BatterySimulator";
import Conversion from "../../components/conversion/Conversion";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import {
  ArrowPathRoundedSquareIcon,
  Battery0Icon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import ConversionMinimal from "../../components/conversion/ConversionMinimal";

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

const PowerConversion = () => {
  // const [colors, setColors] = useState({});
  // const context = useContext(AppContext);

  // useEffect(() => {
  //     console.log("context in trade: ", context);
  //     if (context.theme) {
  //         setColors(colorsInLightMode);
  //     } else {
  //         setColors(colorsInDarkMode);
  //     }
  // }, [context]);

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-4 w-full">
        {/* Energy Conversion with Periodic Settlement */}
        <div className="card card-border bg-base-100 border-base-300 border-2">
          <div className="card-body">
            <h2 className="card-title font-bold flex items-center gap-2">
              <BoltIcon className="size-5 text-primary" />
              Energy Conversion
            </h2>

            {/* ETK Balance Display */}
            <ConversionMinimal
              first_change={"ETKS"}
              second_change={"kWhS"}
              rate={3}
              balanceKey="etk_balance"
            />

            {/* Periodic Settlement Estimator */}
            <div className="divider">Periodic Settlement Estimator</div>

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

            {/* Progress bar */}
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
      </div>
    </>
  );
};

export default PowerConversion;
