import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";
import MultipleBarChart from "../../components/charts/MultipleBarChart";
import { formatPower, formatEnergy } from "../../utils/formatUnits";

const DashboardUser = () => {
  const { user } = useAuth();

  // Check if user is Prosumer or Consumer
  const isProsumer = user?.role === "Prosumer";

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
        apiCall("/stat/stats"),
        apiCall("/energy/chart?days=7"),
        apiCall("/energy/real-time"),
        apiCall("/trading/performance?days=30"),
        apiCall("/energy/summary?period=monthly"),
        apiCall("/smart-meters/health"),
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

      // // console.log("Fetching dashboard data for user:", user.name);
      // // console.log("Stats:", dashboardStats);
      // // console.log("Realtime Res:", realTimeEnergy);
      // Set up auto-refresh every 30 seconds for real-time data
      const interval = setInterval(fetchDashboardData, 30000);
      return () => clearInterval(interval);
    }
  }, [user, fetchDashboardData]);

  return (
    <div className="w-full mx-auto p-2 sm:p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:gap-4 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">
            My Energy Trading Dashboard
          </h1>
          {error && (
            <div className="alert alert-error text-sm">
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <>
            {/* Stats Cards Skeleton */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="card bg-base-100 border-2 border-base-300"
                  >
                    <div className="card-body p-3 sm:p-4 items-center">
                      <div className="skeleton h-6 sm:h-8 w-16 sm:w-20 mb-2"></div>
                      <div className="skeleton h-3 sm:h-4 w-12 sm:w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Health Skeleton */}
            <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="card-body p-3 sm:p-4">
                <div className="skeleton h-5 sm:h-6 w-32 sm:w-40 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="stat">
                      <div className="skeleton h-3 sm:h-4 w-20 sm:w-24 mb-2"></div>
                      <div className="skeleton h-6 sm:h-8 w-12 sm:w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-time Energy Skeleton */}
            <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="card-body p-3 sm:p-4">
                <div className="skeleton h-5 sm:h-6 w-40 sm:w-48 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="stat">
                      <div className="skeleton h-3 sm:h-4 w-24 sm:w-32 mb-2"></div>
                      <div className="skeleton h-6 sm:h-8 w-16 sm:w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart Skeleton */}
            <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="card-body p-3 sm:p-4">
                <div className="skeleton h-5 sm:h-6 w-48 sm:w-64 mb-4"></div>
                <div className="skeleton h-48 sm:h-64 w-full"></div>
              </div>
            </div>

            {/* Trading Performance Skeleton */}
            <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="card-body p-3 sm:p-4">
                <div className="skeleton h-5 sm:h-6 w-40 sm:w-48 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="stat">
                      <div className="skeleton h-3 sm:h-4 w-20 sm:w-24 mb-2"></div>
                      <div className="skeleton h-6 sm:h-8 w-12 sm:w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Energy Summary Skeleton */}
            <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="card-body p-3 sm:p-4">
                <div className="skeleton h-5 sm:h-6 w-32 sm:w-40 mb-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="stat">
                      <div className="skeleton h-3 sm:h-4 w-24 sm:w-28 mb-2"></div>
                      <div className="skeleton h-6 sm:h-8 w-16 sm:w-20"></div>
                    </div>
                  ))}
                </div>
                {/* Energy Export/Import Balance Skeleton */}
                <div className="card bg-base-200 border border-base-300 p-3 sm:p-4">
                  <div className="skeleton h-4 sm:h-5 w-40 sm:w-48 mb-3 mx-auto"></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-base-100 rounded-lg border border-base-300 p-3">
                      <div className="skeleton h-3 sm:h-4 w-24 sm:w-32 mb-2 mx-auto"></div>
                      <div className="skeleton h-6 sm:h-8 w-16 sm:w-20 mb-1 mx-auto"></div>
                      <div className="skeleton h-3 w-20 sm:w-24 mx-auto"></div>
                    </div>
                    <div className="bg-base-100 rounded-lg border border-base-300 p-3">
                      <div className="skeleton h-3 sm:h-4 w-24 sm:w-32 mb-2 mx-auto"></div>
                      <div className="skeleton h-6 sm:h-8 w-16 sm:w-20 mb-1 mx-auto"></div>
                      <div className="skeleton h-3 w-20 sm:w-24 mx-auto"></div>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-base-100 border border-base-300 rounded">
                    <div className="skeleton h-3 sm:h-4 w-32 sm:w-40 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* User Stats from API */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="card bg-base-100 border-2 border-base-300">
                  <div className="card-body p-3 sm:p-4 items-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                      {dashboardStats?.balances?.ETK
                        ? new Intl.NumberFormat("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(dashboardStats.balances.ETK)
                        : "0,00"}
                    </div>
                    <div className="text-xs sm:text-sm text-base-content/60 text-center">
                      ETK Balance
                    </div>
                  </div>
                </div>
                <div className="card bg-base-100 border-2 border-base-300">
                  <div className="card-body p-3 sm:p-4 items-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                      Rp
                      {dashboardStats?.balances?.IDRS
                        ? new Intl.NumberFormat("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(dashboardStats.balances.IDRS)
                        : "0,00"}
                    </div>
                    <div className="text-xs sm:text-sm text-base-content/60 text-center">
                      IDRS Balance
                    </div>
                  </div>
                </div>
                <div className="card bg-base-100 border-2 border-base-300">
                  <div className="card-body p-3 sm:p-4 items-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">
                      {dashboardStats?.tradingStats?.totalTrades || "0"}
                    </div>
                    <div className="text-xs sm:text-sm text-base-content/60 text-center">
                      Total Transactions
                    </div>
                  </div>
                </div>
                <div className="card bg-base-100 border-2 border-base-300">
                  <div className="card-body p-3 sm:p-4 items-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary truncate max-w-full">
                      {user?.role || "Prosumer"}
                    </div>
                    <div className="text-xs sm:text-sm text-base-content/60 text-center">
                      Role
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Health Status */}
            {deviceHealth && (
              <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <div className="card-body p-3 sm:p-4">
                  <h2 className="card-title text-lg sm:text-xl mb-2">
                    Smart Meter Status
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Total Devices
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-primary">
                        {deviceHealth.totalDevices}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Online Devices
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-success">
                        {deviceHealth.onlineDevices}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Health Score
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-info">
                        {deviceHealth.healthPercentage}%
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Settlements Today
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-secondary">
                        {deviceHealth.settlementsToday}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Real-time Energy Data */}
            {realTimeEnergy && (
              <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <div className="card-body p-3 sm:p-4">
                  <h2 className="card-title text-lg sm:text-xl mb-2">
                    Real-time Energy Status
                  </h2>
                  <div
                    className={`grid grid-cols-1 ${
                      isProsumer
                        ? "sm:grid-cols-2 xl:grid-cols-4"
                        : "sm:grid-cols-2"
                    } gap-3 sm:gap-4`}
                  >
                    {isProsumer && (
                      <div className="stat">
                        <div className="stat-title text-xs sm:text-sm truncate">
                          Current Generation
                        </div>
                        <div className="stat-value text-base sm:text-lg lg:text-xl text-primary">
                          {(() => {
                            const formatted = formatPower(
                              realTimeEnergy.timeSeries[0]?.solar || 0
                            );
                            return (
                              <>
                                {formatted.value}
                                <span className="sm:text-lg lg:text-xl">
                                  {" "}
                                  {formatted.unit}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Current Consumption
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-warning">
                        {(() => {
                          const formatted = formatPower(
                            realTimeEnergy.timeSeries[0]?.consumption || 0
                          );
                          return (
                            <>
                              {formatted.value}
                              <span className="sm:text-lg lg:text-xl"> {formatted.unit}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    {isProsumer && (
                      <div className="stat">
                        <div className="stat-title text-xs sm:text-sm truncate">
                          Grid Export
                        </div>
                        <div className="stat-value text-base sm:text-lg lg:text-xl text-success">
                          {(() => {
                            const formatted = formatPower(
                              realTimeEnergy.timeSeries[0]?.gridExport || 0
                            );
                            return (
                              <>
                                {formatted.value}
                                <span className="sm:text-lg lg:text-xl">
                                  {" "}
                                  {formatted.unit}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Grid Import
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-error">
                        {(() => {
                          const formatted = formatPower(
                            realTimeEnergy.timeSeries[0]?.gridImport || 0
                          );
                          return (
                            <>
                              {formatted.value}
                              <span className="sm:text-lg lg:text-xl"> {formatted.unit}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Energy Generation & Consumption Chart */}
            {energyChart && (
              <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <div className="card-body p-3 sm:p-4">
                  <h2 className="card-title text-lg sm:text-xl mb-2">
                    {isProsumer
                      ? "Energy Generation & Consumption (7 Days)"
                      : "Energy Consumption (7 Days)"}
                  </h2>
                  <div className="w-full overflow-x-auto">
                    <MultipleBarChart
                      data={energyChart.map((item) => ({
                        label: new Date(
                          item.timestamp || item.date
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        }),
                        generation: item.generation,
                        consumption: item.consumption,
                      }))}
                      series={
                        isProsumer
                          ? [
                              {
                                key: "generation",
                                label: "Generation",
                                color: "primary",
                              },
                              {
                                key: "consumption",
                                label: "Consumption",
                                color: "secondary",
                              },
                            ]
                          : [
                              {
                                key: "consumption",
                                label: "Consumption",
                                color: "secondary",
                              },
                            ]
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Trading Performance */}
            {tradingPerformance && (
              <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <div className="card-body p-3 sm:p-4">
                  <h2 className="card-title text-lg sm:text-xl mb-2">
                    Trading Performance (30 Days)
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Total Trades
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-primary">
                        {tradingPerformance.summary.totalTrades}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Volume (ETK)
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-secondary">
                        {tradingPerformance.summary.totalVolume.toLocaleString(
                          "id-ID"
                        )}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Total Earnings
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-success">
                        Rp{" "}
                        {tradingPerformance.financial.totalEarnings.toLocaleString(
                          "id-ID"
                        )}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Total Spending
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-warning">
                        Rp{" "}
                        {tradingPerformance.financial.totalSpending.toLocaleString(
                          "id-ID"
                        )}
                      </div>
                    </div>
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Net Profit
                      </div>
                      <div
                        className={`stat-value text-base sm:text-lg lg:text-xl ${
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
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Profit Margin
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-info">
                        {tradingPerformance.financial.profitMargin}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Energy Summary */}
            {energySummary && (
              <div className="card bg-base-100 border-2 border-base-300 col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <div className="card-body p-3 sm:p-4">
                  <h2 className="card-title text-lg sm:text-xl mb-2">
                    Energy Summary{/* ({energySummary.period}) */}
                  </h2>

                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 ${
                      isProsumer ? "xl:grid-cols-4" : "xl:grid-cols-2"
                    } gap-3 sm:gap-4 mb-4`}
                  >
                    {isProsumer && (
                      <div className="stat">
                        <div className="stat-title text-xs sm:text-sm truncate">
                          Today Generation
                        </div>
                        <div className="stat-value text-base sm:text-lg lg:text-xl text-primary">
                          {(() => {
                            const formatted = formatEnergy(
                              energySummary.generation.today * 1000
                            );
                            return (
                              <>
                                {formatted.value}
                                <span className="text-sm">
                                  {" "}
                                  {formatted.unit}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Today Consumption
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-warning">
                        {(() => {
                          const formatted = formatEnergy(
                            energySummary.consumption.today
                          );
                          return (
                            <>
                              {formatted.value}
                              <span className="text-sm"> {formatted.unit}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    {isProsumer && (
                      <div className="stat">
                        <div className="stat-title text-xs sm:text-sm truncate">
                          Total ETK Minted
                        </div>
                        <div className="stat-value text-base sm:text-lg lg:text-xl text-success">
                          {energySummary.settlements.etkMinted.toFixed(2)}
                        </div>
                      </div>
                    )}
                    <div className="stat">
                      <div className="stat-title text-xs sm:text-sm truncate">
                        Total ETK Burned
                      </div>
                      <div className="stat-value text-base sm:text-lg lg:text-xl text-error">
                        {energySummary.settlements.etkBurned.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Energy Import Balance */}
                  <div className="card bg-base-200 border border-base-300 p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-center">
                      {isProsumer
                        ? "Energy Export/Import Balance"
                        : "Energy Import Balance"}
                    </h3>
                    <div
                      className={`grid grid-cols-1 ${
                        isProsumer ? "sm:grid-cols-2" : ""
                      } gap-3 sm:gap-4`}
                    >
                      {isProsumer && (
                        <div className="text-center p-3 bg-base-100 rounded-lg border border-base-300">
                          <div className="text-xs sm:text-sm text-success/80 font-medium mb-1">
                            Total Energy Exported
                          </div>
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-success">
                            {(() => {
                              const formatted = formatEnergy(
                                energySummary.settlements.etkMinted * 1000
                              );
                              return (
                                <>
                                  {formatted.value}
                                  <span className="text-sm sm:text-base ml-1">
                                    {formatted.unit}
                                  </span>
                                </>
                              );
                            })()}
                          </div>
                          <div className="text-xs text-success/70 mt-1">
                            = {energySummary.settlements.etkMinted.toFixed(2)}{" "}
                            ETK Minted
                          </div>
                        </div>
                      )}
                      <div className="text-center p-3 bg-base-100 rounded-lg border border-base-300">
                        <div className="text-xs sm:text-sm text-error/80 font-medium mb-1">
                          Total Energy Imported
                        </div>
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-error">
                          {(() => {
                            const formatted = formatEnergy(
                              energySummary.settlements.etkBurned * 1000
                            );
                            return (
                              <>
                                {formatted.value}
                                <span className="text-sm sm:text-base ml-1">
                                  {formatted.unit}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                        <div className="text-xs text-error/70 mt-1">
                          = {energySummary.settlements.etkBurned.toFixed(2)} ETK
                          Burned
                        </div>
                      </div>
                    </div>
                    {isProsumer && (
                      <div className="mt-3 p-2 bg-base-100 border border-base-300 rounded text-center">
                        <div className="text-xs sm:text-sm text-base-content/80">
                          Net Energy Balance:
                          <span
                            className={`font-bold ml-1 ${
                              energySummary.settlements.etkMinted -
                                energySummary.settlements.etkBurned >=
                              0
                                ? "text-success"
                                : "text-error"
                            }`}
                          >
                            {(() => {
                              const netEnergy =
                                (energySummary.settlements.etkMinted -
                                  energySummary.settlements.etkBurned) *
                                1000;
                              const formatted = formatEnergy(netEnergy);
                              return `${formatted.value} ${formatted.unit}`;
                            })()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardUser;
