import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";
import MetricCard from "./components/MetricCard";
import DeviceInfoApi from "./components/DeviceInfoApi";
import BatteryCard from "./components/BatteryCard";
import GridStatusCard from "./components/GridStatusCard";
import EnergyHistorySection from "./components/EnergyHistorySection";
import DeviceControlPanel from "./components/DeviceControlPanel";
import useSmartMeterApi from "./hooks/useSmartMeterApi";
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
import { apiCall } from "../../utils/api";

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
    selectedMeter,
    setSelectedMeter,
    userProfile,
    lastUpdate,
    deviceConnected,
    solar,
    consume,
    batteryPercent,
    batteryRate,
    grid,
    gridStatus,
    energyHistory,
    batteryStatus,
    deviceStatus,
    sendControlCommand,
    isControlling,
    controlError,
    loading,
    error,
    refreshData,
    timestamp,
  } = useSmartMeterApi();

  // Check if user is Prosumer or Consumer - handle async loading
  const isProsumer = userProfile?.data?.profile?.role === "Prosumer";
  const userRole = userProfile?.data?.profile || null;

  useEffect(() => {
    if (userProfile) {
      // console.log("User Profile:", userProfile);
      // console.log("User Role:", userRole?.role);
      // console.log("Is Prosumer:", isProsumer);
    }
  }, [isProsumer, userProfile, userRole]);

  // Separate state for energy history data
  const [energyHistoryData, setEnergyHistoryData] = useState([]);
  const [energyHistoryLoading, setEnergyHistoryLoading] = useState(false);

  // Fetch energy history data from separate API
  const fetchEnergyHistory = useCallback(async () => {
    if (!selectedMeter) return;

    try {
      setEnergyHistoryLoading(true);
      const response = await apiCall(
        `/energy/history/hourly?hours=12&meterId=${selectedMeter.meterId}`
      );

      if (response.ok) {
        const data = await response.json();

        // console.log("Fetched energy history data:", data);

        if (data.success) {
          setEnergyHistoryData(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching energy history:", error);
    } finally {
      setEnergyHistoryLoading(false);
    }
  }, [selectedMeter]);

  // Fetch energy history on component mount and periodically
  useEffect(() => {
    fetchEnergyHistory();

    // Refresh energy history every 60 seconds
    const interval = setInterval(fetchEnergyHistory, 60000);
    return () => clearInterval(interval);
  }, [fetchEnergyHistory]);

  const { theme } = useContext(AppContext); // listen theme from context

  useEffect(() => {
    // console.log("Theme changed:", theme);
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

  // Process energy history data for EnergyHistorySection
  const processedEnergyHistory = useMemo(() => {
    // Limit to last 12 hours and format time properly
    return (
      energyHistoryData
        // .slice(-12) // Take only last 12 hours
        .map((item) => {
          // Parse ISO timestamp and format to HH:mm - HH:mm range using UTC
          const date = new Date(item.timestamp);
          const startHours = date.getUTCHours().toString().padStart(2, "0");
          const startMinutes = date.getUTCMinutes().toString().padStart(2, "0");

          // Calculate end time (1 hour later)
          const endDate = new Date(date.getTime() + 60 * 60 * 1000);
          const endHours = endDate.getUTCHours().toString().padStart(2, "0");
          const endMinutes = endDate
            .getUTCMinutes()
            .toString()
            .padStart(2, "0");

          return {
            time: `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`,
            solar: item.solar || 0,
            usage: item.consumption || 0,
            grid: item.net || 0,
            battery: item.battery || 0,
          };
        })
    );
  }, [energyHistoryData]);

  // Create chart data for EnergyHistorySection
  const energyHistoryBarData = useMemo(
    () =>
      getHistoryBarData(
        processedEnergyHistory,
        colorWarning,
        colorError,
        colorAccent
      ),
    [processedEnergyHistory, colorWarning, colorError, colorAccent]
  );

  return (
    <div className="w-full card card-border border-2 border-base-300 bg-base-100 p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BoltIcon className="w-7 h-7 text-primary" />
          Smart Meter Dashboard
        </h2>
        <button
          className="btn btn-sm btn-outline hidden"
          onClick={refreshData}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="space-y-8">
          {/* Device Info Skeleton */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <div className="skeleton h-6 w-32 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="skeleton h-4 w-24 mb-2"></div>
                  <div className="skeleton h-8 w-full"></div>
                </div>
                <div>
                  <div className="skeleton h-4 w-20 mb-2"></div>
                  <div className="skeleton h-6 w-32"></div>
                </div>
                <div>
                  <div className="skeleton h-4 w-28 mb-2"></div>
                  <div className="skeleton h-6 w-24"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Metrics Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 border-2 border-base-300"
              >
                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="skeleton h-6 w-6 rounded"></div>
                    <div className="skeleton h-5 w-32"></div>
                  </div>
                  <div className="skeleton h-8 w-20 mb-2"></div>
                  <div className="skeleton h-16 w-full mb-4"></div>
                  <div className="skeleton h-4 w-40"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid Status Skeleton */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <div className="skeleton h-6 w-28 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="skeleton h-4 w-32"></div>
                  <div className="skeleton h-6 w-24"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-6 w-20"></div>
                </div>
                <div className="skeleton h-48 w-full"></div>
              </div>
            </div>
          </div>

          {/* Device Control Panel Skeleton */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <div className="skeleton h-6 w-40 mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="space-y-2">
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-10 w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Energy History Skeleton */}
          <div className="card bg-base-100 border-2 border-base-300">
            <div className="card-body">
              <div className="skeleton h-6 w-32 mb-4"></div>
              <div className="skeleton h-64 w-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Device Info */}
          <DeviceInfoApi
            selectedMeter={selectedMeter}
            setSelectedMeter={setSelectedMeter}
            userProfile={userProfile}
            lastUpdate={lastUpdate}
            timestamp={timestamp}
            deviceConnected={deviceConnected}
            deviceStatus={deviceStatus}
          />

          {/* Main Metrics */}
          <div
            className={`grid grid-cols-1 ${
              isProsumer ? "md:grid-cols-3" : "md:grid-cols-2"
            } gap-8 w-full`}
          >
            {isProsumer && (
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
                      r="4"
                      strokeWidth={2}
                      stroke="currentColor"
                    />
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      stroke="currentColor"
                      d="M12 2v2M12 20v2M22 12h-2M4 12H2M19.07 4.93l-1.41 1.41M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41M6.34 17.66l-1.41 1.41"
                    />
                  </svg>
                }
                label="Solar Generation"
                value={solar}
                unit="W"
                color="text-warning"
                chart={
                  <div className="w-full h-16 relative">
                    <Line
                      options={chartOptions}
                      data={solarChartData}
                      height={48}
                    />
                  </div>
                }
                description={"Real-time solar panel output"}
              />
            )}
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
              value={consume}
              unit="W"
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
              description={"Real-time power consumption"}
            />
            <BatteryCard
              batteryStatus={batteryStatus}
              batteryRate={batteryRate}
              batteryPercent={batteryPercent}
            />
          </div>

          {/* Grid Status & Device Control Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            {/* Grid Status */}
            <GridStatusCard
              gridStatus={gridStatus}
              grid={grid}
              gridChartData={gridChartData}
            />

            {/* Device Control Panel */}
            <DeviceControlPanel
              deviceStatus={deviceStatus}
              sendControlCommand={sendControlCommand}
              isControlling={isControlling}
              controlError={controlError}
              selectedMeter={selectedMeter}
              userProfile={userRole}
            />
          </div>

          {/* Energy History */}
          <EnergyHistorySection
            historyBarData={energyHistoryBarData}
            loading={energyHistoryLoading}
            isProsumer={isProsumer}
          />
        </>
      )}
    </div>
  );
};

export default SmartMeter;
