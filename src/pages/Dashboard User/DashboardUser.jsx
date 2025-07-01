import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";
import MultipleBarChart from "../../components/charts/MultipleBarChart";

const DashboardUser = () => {
  const { user } = useAuth();

  // API Data States
  const [dashboardStats, setDashboardStats] = useState(null);
  const [energyChart, setEnergyChart] = useState(null);
  const [realTimeEnergy, setRealTimeEnergy] = useState(null);
  const [tradingPerformance, setTradingPerformance] = useState(null);
  const [energySummary, setEnergySummary] = useState(null);
  const [deviceHealth, setDeviceHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API Functions
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        statsRes,
        energyChartRes,
        realTimeRes,
        tradingRes,
        energySumRes,
        deviceRes,
      ] = await Promise.all([
        apiCall("/dashboard/stats"),
        apiCall("/dashboard/energy-chart?days=30"),
        apiCall("/dashboard/real-time-energy"),
        apiCall("/dashboard/trading-performance?days=30"),
        apiCall("/dashboard/energy-summary?period=monthly"),
        apiCall("/dashboard/device-health"),
      ]);

      // Process stats
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) {
          setDashboardStats(statsData.data);
        }
      }

      // Process energy chart
      if (energyChartRes.ok) {
        const chartData = await energyChartRes.json();
        if (chartData.success) {
          setEnergyChart(chartData.data);
        }
      }

      // Process real-time energy
      if (realTimeRes.ok) {
        const realTimeData = await realTimeRes.json();
        if (realTimeData.success) {
          setRealTimeEnergy(realTimeData.data);
        }
      }

      // Process trading performance
      if (tradingRes.ok) {
        const tradingData = await tradingRes.json();
        if (tradingData.success) {
          setTradingPerformance(tradingData.data);
        }
      }

      // Process energy summary
      if (energySumRes.ok) {
        const energyData = await energySumRes.json();
        if (energyData.success) {
          setEnergySummary(energyData.data);
        }
      }

      // Process device health
      if (deviceRes.ok) {
        const deviceData = await deviceRes.json();
        if (deviceData.success) {
          setDeviceHealth(deviceData.data);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchDashboardData();

      // console.log("Fetching dashboard data for user:", user.name);
      // console.log("Stats:", dashboardStats);
      // console.log("Realtime Res:", realTimeEnergy);
      // Set up auto-refresh every 30 seconds for real-time data
      const interval = setInterval(fetchDashboardData, 30000);
      return () => clearInterval(interval);
    }
  }, [user, fetchDashboardData]);

  return (
    <div className="w-full mx-auto grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 col-span-2 md:col-span-2 xl:col-span-4">
        <h1 className="text-3xl font-bold">My Energy Trading Dashboard</h1>
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="col-span-2 md:col-span-2 xl:col-span-4 flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {/* User Stats from API */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 col-span-2 md:col-span-2 xl:col-span-4">
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body p-4 items-center">
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats?.balances?.ETK?.toLocaleString("id-ID") ||
                    "0"}
                </div>
                <div className="text-sm text-base-content/60">Saldo ETK</div>
              </div>
            </div>
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body p-4 items-center">
                <div className="text-2xl font-bold text-primary">
                  Rp{" "}
                  {dashboardStats?.balances?.IDRS?.toLocaleString("id-ID") ||
                    "0"}
                </div>
                <div className="text-sm text-base-content/60">Saldo IDRS</div>
              </div>
            </div>
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body p-4 items-center">
                <div className="text-2xl font-bold text-primary">
                  {dashboardStats?.tradingStats?.totalTrades || "0"}
                </div>
                <div className="text-sm text-base-content/60">
                  Total Transaksi
                </div>
              </div>
            </div>
            <div className="card bg-base-100 border-2 border-base-300">
              <div className="card-body p-4 items-center">
                <div className="text-2xl font-bold text-primary">
                  {user?.name || "Prosumer"}
                </div>
                <div className="text-sm text-base-content/60">Role</div>
              </div>
            </div>
          </div>

          {/* Device Health Status */}
          {deviceHealth && (
            <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
              <div className="card-body">
                <h2 className="card-title mb-2">Smart Meter Status</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat">
                    <div className="stat-title">Total Devices</div>
                    <div className="stat-value text-primary">
                      {deviceHealth.totalDevices}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Online Devices</div>
                    <div className="stat-value text-success">
                      {deviceHealth.onlineDevices}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Health Score</div>
                    <div className="stat-value text-info">
                      {deviceHealth.healthPercentage}%
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Settlements Today</div>
                    <div className="stat-value text-secondary">
                      {deviceHealth.settlementsToday}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Energy Data */}
          {realTimeEnergy && (
            <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
              <div className="card-body">
                <h2 className="card-title mb-2">Real-time Energy Status</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat">
                    <div className="stat-title">Current Generation</div>
                    <div className="stat-value text-primary">
                      {realTimeEnergy.timeSeries[0]?.solar?.toFixed(2) || "0"} kW
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Current Consumption</div>
                    <div className="stat-value text-warning">
                      {realTimeEnergy.timeSeries[0]?.load?.toFixed(2) || "0"} kW
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Grid Export</div>
                    <div className="stat-value text-success">
                      {realTimeEnergy.timeSeries[0]?.gridExport?.toFixed(2) || "0"} kW
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Grid Import</div>
                    <div className="stat-value text-error">
                      {realTimeEnergy.timeSeries[0]?.gridImport?.toFixed(2) || "0"} kW
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Energy Generation & Consumption Chart */}
          {energyChart && (
            <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
              <div className="card-body">
                <h2 className="card-title mb-2">
                  Energy Generation & Consumption (30 Days)
                </h2>
                <MultipleBarChart
                  data={energyChart.map((item) => ({
                    label: new Date(item.date).toLocaleDateString("id-ID", {
                      month: "short",
                      day: "numeric",
                    }),
                    generation: item.generation,
                    consumption: item.consumption,
                  }))}
                  series={[
                    {
                      key: "generation",
                      label: "Generation (kWh)",
                      color: "primary",
                    },
                    {
                      key: "consumption",
                      label: "Consumption (kWh)",
                      color: "secondary",
                    },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Trading Performance */}
          {tradingPerformance && (
            <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
              <div className="card-body">
                <h2 className="card-title mb-2">
                  Trading Performance (30 Days)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat">
                    <div className="stat-title">Total Trades</div>
                    <div className="stat-value text-primary">
                      {tradingPerformance.summary.totalTrades}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Volume (ETK)</div>
                    <div className="stat-value text-secondary">
                      {tradingPerformance.summary.totalVolume.toLocaleString(
                        "id-ID"
                      )}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Net Profit</div>
                    <div
                      className={`stat-value ${
                        tradingPerformance.financial.netProfit >= 0
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      Rp{" "}
                      {tradingPerformance.financial.netProfit.toLocaleString(
                        "id-ID"
                      )}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Profit Margin</div>
                    <div className="stat-value text-info">
                      {tradingPerformance.financial.profitMargin}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Energy Summary */}
          {energySummary && (
            <div className="card bg-base-100 border-2 border-base-300 col-span-2 md:col-span-2 xl:col-span-4">
              <div className="card-body">
                <h2 className="card-title mb-2">
                  Energy Summary{/* ({energySummary.period}) */}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="stat">
                    <div className="stat-title">Today Generation</div>
                    <div className="stat-value text-primary">
                      {energySummary.generation.today.toFixed(2)} kWh
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Today Consumption</div>
                    <div className="stat-value text-warning">
                      {energySummary.consumption.today.toFixed(2)} kWh
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Total ETK Minted</div>
                    <div className="stat-value text-success">
                      {energySummary.settlements.etkMinted.toFixed(2)}
                    </div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Total ETK Burned</div>
                    <div className="stat-value text-error">
                      {energySummary.settlements.etkBurned.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardUser;
