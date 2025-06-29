import { useContext, useEffect, useMemo } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";
import MetricCard from "./components/MetricCard";
import DeviceInfo from "./components/DeviceInfo";
import TimeWindowSelector from "./components/TimeWindowSelector";
import BatteryCard from "./components/BatteryCard";
import GridStatusCard from "./components/GridStatusCard";
import EnergyHistorySection from "./components/EnergyHistorySection";
import useSmartMeterData from "./hooks/useSmartMeterData";
import { useChartColors } from "./helper/chartColors";
import { chartOptions } from "./helper/chartOptions";
import {
  getSolarChartData,
  getConsumeChartData,
  getGridChartData,
  getHistoryBarData,
} from "./helper/chartData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { AppContext } from "../../context/context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SmartMeter = () => {
  const {
    selectedDevice,
    setSelectedDevice,
    lastUpdate,
    deviceConnected,
    // timeWindow,
    // setTimeWindow,
    solar,
    consume,
    battery,
    batteryPercent,
    grid,
    gridStatus,
    energyHistory,
    batteryFlow,
    batteryStatus,
  } = useSmartMeterData();

  const { theme } = useContext(AppContext); // listen theme from context

  useEffect(() => {
    console.log("Theme changed:", theme);
  }, [theme]);

  const {
    colorAccent,
    colorSuccess,
    colorWarning,
    colorError,
    colorBaseContent,
  } = useChartColors(theme); // pass theme as dependency

  const solarChartData = useMemo(
    () => getSolarChartData(energyHistory, colorWarning),
    [colorWarning, energyHistory]
  );
  const consumeChartData = useMemo(
    () => getConsumeChartData(energyHistory, colorError),
    [colorError, energyHistory]
  );
  const gridChartData = useMemo(
    () =>
      getGridChartData(
        energyHistory,
        gridStatus,
        colorSuccess,
        colorError,
        colorWarning,
        colorBaseContent
      ),
    [
      colorSuccess,
      colorError,
      colorWarning,
      gridStatus,
      energyHistory,
      colorBaseContent,
    ]
  );
  const historyBarData = useMemo(
    () =>
      getHistoryBarData(
        energyHistory,
        colorWarning,
        colorError,
        colorAccent,
        colorSuccess
      ),
    [energyHistory, colorWarning, colorError, colorAccent, colorSuccess]
  );

  return (
    <div className="w-full card card-border border-2 border-base-200 bg-base-100  p-8 space-y-8 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BoltIcon className="w-7 h-7 text-primary" />
          Smart Meter Dashboard
        </h2>
        {/* <span className="flex items-center gap-2 text-xs">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              deviceConnected ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
          {deviceConnected ? "Device Connected" : "Disconnected"}
        </span> */}
      </div>

      {/* Device Info */}
      <DeviceInfo
        selectedDevice={selectedDevice}
        setSelectedDevice={setSelectedDevice}
        lastUpdate={lastUpdate}
        deviceConnected={deviceConnected}
      />

      {/* Time Window Selector */}
      {/* <TimeWindowSelector
        timeWindow={timeWindow}
        setTimeWindow={setTimeWindow}
      /> */}

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <MetricCard
          icon={
            <svg
              className="w-6 h-6 text-warning"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="5"
                strokeWidth={2}
                stroke="currentColor"
              />
              <path
                strokeLinecap="round"
                strokeWidth={2}
                stroke="currentColor"
                d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34l-1.41-1.41m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
              />
            </svg>
          }
          label="Solar Generation"
          value={solar.toFixed(2)}
          unit="kW"
          color="text-warning"
          chart={
            <div className="w-full h-16 relative">
              <Line options={chartOptions} data={solarChartData} height={48} />
            </div>
          }
          description={"Realtime solar panel output"}
        />
        <MetricCard
          icon={
            <svg
              className="w-6 h-6 text-error"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeWidth={2}
                stroke="currentColor"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          }
          label="Power Consumption"
          value={consume.toFixed(2)}
          unit="kW"
          color="text-error"
          chart={
            <div className="w-full h-16 relative">
              <Line
                options={chartOptions}
                data={consumeChartData}
                height={48}
              />
            </div>
          }
          description={"Realtime power consumption"}
        />
        <BatteryCard
          battery={battery}
          batteryPercent={batteryPercent}
          batteryStatus={batteryStatus}
          batteryFlow={batteryFlow}
          description={"Battery status and flow"}
        />
      </div>

      {/* Grid Status */}
      <GridStatusCard
        gridStatus={gridStatus}
        grid={grid}
        gridChartData={gridChartData}
      />

      {/* Energy History */}
      <EnergyHistorySection
        energyHistory={energyHistory}
        historyBarData={historyBarData}
      />
    </div>
  );
};

export default SmartMeter;
