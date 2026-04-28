import ChartPrice from "../../components/trade/ChartPrice";
import OrderBook from "../../components/trade/OrderBook";
import Battery from "../../components/energy conversion/Battery";
import BatterySimulator from "../../simulator/BatterySimulator";
import Conversion from "../../components/conversion/Conversion";
import SettlementHistory from "./components/SettlementHistory";
import useSettlementHistory from "./hooks/useSettlementHistory";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import {
  ArrowPathRoundedSquareIcon,
  Battery0Icon,
  BoltIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState, useCallback } from "react";
import ConversionMinimal from "../../components/conversion/ConversionMinimal";
import { apiCall } from "../../utils/api";
import { formatPower, formatEnergy } from "../../utils/formatUnits";
import { useAuth } from "../../context/AuthContext";

const PowerConversion = () => {
  const { user } = useAuth();
  const isProsumer = user?.role === "Prosumer";

  // State for settlement estimator data
  const [settlementData, setSettlementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [etkBalance, setEtkBalance] = useState(0);

  // State for settlement history scope
  const [currentScope, setCurrentScope] = useState("own");
  const [limit, setLimit] = useState(10);
  const [localSettlementError, setLocalSettlementError] = useState("");

  // Settlement history hook
  const {
    settlements,
    loading: settlementHistoryLoading,
    error: settlementHistoryError,
    metadata,
    refetch: refetchSettlementHistory,
  } = useSettlementHistory();

  // Timer to fetch API every second
  const intervalRef = useRef();

  // Handle settlement history error auto-hide
  useEffect(() => {
    if (settlementHistoryError) {
      setLocalSettlementError(settlementHistoryError);
      const timer = setTimeout(() => {
        setLocalSettlementError("");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setLocalSettlementError("");
    }
  }, [settlementHistoryError]);

  // Handle scope change
  const handleScopeChange = (newScope) => {
    // Ensure scope is valid
    const validScope = ["own", "public"].includes(newScope) ? newScope : "own";
    setCurrentScope(validScope);
    refetchSettlementHistory(validScope, limit);
  };

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    refetchSettlementHistory(currentScope, newLimit);
  };

  // Fetch settlement estimator data
  const fetchSettlementData = useCallback(async () => {
    try {
      const response = await apiCall("/energy/settlement-estimator");
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setSettlementData(result.data);
          setError(null);
        } else {
          const errorMessage = "Failed to fetch settlement data";
          setError(errorMessage);
          setTimeout(() => setError(null), 3000);
        }
      } else {
        const errorMessage = "API call failed";
        setError(errorMessage);
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      console.error("Settlement estimator API error:", err);
      const errorMessage = "Network error";
      setError(errorMessage);
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch ETK balance
  const fetchEtkBalance = useCallback(async () => {
    try {
      // Get user's primary wallet address
      const profileResponse = await apiCall("/auth/profile");
      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        const primaryWallet = profileData?.data?.profile?.primaryWalletAddress;

        if (primaryWallet) {
          const response = await apiCall(`/wallet/${primaryWallet}/balances`);
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              setEtkBalance(result.data.ETK || 0);
            }
          }
        }
      }
      // console.log("ETK balance fetched:", etkBalance);
    } catch (err) {
      console.error("Error fetching ETK balance:", err);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchSettlementData();
    fetchEtkBalance();

    // Set up interval to fetch every second
    intervalRef.current = setInterval(() => {
      fetchSettlementData();
      fetchEtkBalance();
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchSettlementData, fetchEtkBalance]);

  // Separate effect for settlement history
  useEffect(() => {
    refetchSettlementHistory(currentScope, limit);
  }, [currentScope, limit, refetchSettlementHistory]);

  // Format time helper function
  const formatTime = (timeString) => {
    if (!timeString) return "00:00";
    return timeString;
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
              first_change={"ETK"}
              second_change={"Wh"}
              rate={3}
              balanceKey="etk_balance"
            />

            {/* Periodic Settlement Estimator */}
            <div className="divider">Periodic Settlement</div>

            {/* Explanation Section */}
            <div className="mb-4 p-4 bg-info/10 rounded-lg border border-info/20">
              <h3 className="font-semibold text-info mb-2 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                How Settlement Works
              </h3>
              <div className="text-sm text-base-content/70 space-y-2">
                <p>
                  • <strong>Automatic Settlement:</strong> Every{" "}
                  {settlementData?.periodMinutes || 5} minutes, the system
                  calculates your{" "}
                  {isProsumer
                    ? "net energy (export - import)"
                    : "energy consumption"}
                </p>
                <p>
                  • <strong>ETK Conversion:</strong>{" "}
                  {isProsumer ? "Net energy" : "Energy consumed"} is converted
                  to ETK tokens (1 kWh = 1 ETK)
                </p>
                <p>
                  • <strong>Minimum Requirement:</strong> At least 100 Wh{" "}
                  {isProsumer ? "net energy" : "consumed"} is needed for
                  settlement execution
                </p>
                {isProsumer && (
                  <p>
                    • <strong>Negative Net:</strong> Export {">"} Import = ETK
                    minted to your wallet
                  </p>
                )}
                <p>
                  • <strong>Positive Net:</strong>{" "}
                  {isProsumer ? "Import > Export" : "Energy imported"} = ETK
                  burned from your wallet
                </p>
                <p>
                  • <strong>Insufficient ETK:</strong> If ETK balance is
                  insufficient, settlement will not proceed. Import relay shuts
                  off until balance is restored.
                </p>
              </div>
            </div>

            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            {loading ? (
              <div className="space-y-4">
                {/* Status skeleton */}
                <div className="mb-2">
                  <div className="skeleton h-5 w-32 mb-1"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>

                {/* Power info skeleton */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="skeleton h-4 w-48"></div>
                </div>

                {/* Details skeleton */}
                <div className="space-y-2 mb-2">
                  <div className="skeleton h-3 w-40"></div>
                  <div className="skeleton h-3 w-56"></div>
                  <div className="skeleton h-3 w-32"></div>
                  <div className="skeleton h-3 w-28"></div>
                </div>

                {/* Progress bar skeleton */}
                <div className="w-full bg-base-200 rounded h-3 mb-1">
                  <div className="skeleton h-3 w-2/3 rounded"></div>
                </div>

                {/* Time info skeleton */}
                <div className="flex justify-between text-xs mb-2">
                  <div className="skeleton h-3 w-16"></div>
                  <div className="skeleton h-3 w-20"></div>
                  <div className="skeleton h-3 w-18"></div>
                </div>

                {/* Remaining time skeleton */}
                <div className="skeleton h-3 w-24 mt-2"></div>

                {/* Energy breakdown skeleton */}
                <div className="mt-4">
                  <div className="skeleton h-4 w-48 mb-2"></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex justify-between">
                      <div className="skeleton h-3 w-20"></div>
                      <div className="skeleton h-3 w-16"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="skeleton h-3 w-20"></div>
                      <div className="skeleton h-3 w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : settlementData ? (
              <>
                {/* 1. Settlement Status Header */}
                <div
                  className={`mb-4 p-3 rounded-lg border ${
                    settlementData.status === "EXPORTING"
                      ? "bg-primary/10 border-primary/20 text-success"
                      : settlementData.status === "IMPORTING"
                      ? "bg-error/10 border-error/20 text-error"
                      : "bg-base-content/10 border-base-content/20 text-base-content"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        {settlementData.status === "EXPORTING"
                          ? "🟢 Exporting"
                          : settlementData.status === "IMPORTING"
                          ? "🔴 Importing"
                          : "⚪ Idle"}
                      </div>
                      <div className="text-xs text-base-content/60 mt-1">
                        {settlementData.periodMinutes} minute settlement period
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Power Information Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="p-3 rounded-lg bg-base-200">
                    <div className="text-xs text-base-content/60 mb-1">
                      Current Power
                    </div>
                    <div className="text-lg font-bold font-mono">
                      {(() => {
                        const formatted = formatPower(
                          settlementData.currentPowerKw
                        );
                        return (
                          <>
                            {formatted.value}
                            <span className="text-xs ml-1">
                              {formatted.unit}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-base-200">
                    <div className="text-xs text-base-content/60 mb-1">
                      Average Power
                    </div>
                    <div className="text-lg font-bold font-mono">
                      {(() => {
                        const formatted = formatPower(
                          settlementData.averagePowerKw
                        );
                        return (
                          <>
                            {formatted.value}
                            <span className="text-xs ml-1">
                              {formatted.unit}
                            </span>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* 3. Settlement Progress */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-base-content/70 mb-2">
                    Settlement Progress
                  </div>
                  <div className="w-full bg-base-300 rounded h-3 mb-2 overflow-hidden">
                    <div
                      className={`h-3 rounded transition-all bg-base-content`}
                      style={{ width: `${settlementData.progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-base-content/60">
                    <div>
                      <div className="text-[10px] opacity-70">Start</div>
                      <div className="font-mono font-semibold">
                        {formatTime(settlementData.periodStartTime)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] opacity-70">Current</div>
                      <div className="font-mono font-semibold">
                        {formatTime(settlementData.currentTime)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] opacity-70">End</div>
                      <div className="font-mono font-semibold">
                        {formatTime(settlementData.periodEndTime)}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-base-content/60 mt-2 flex items-center justify-between">
                    <span>Time Remaining:</span>
                    <span className="font-mono font-semibold text-primary">
                      {settlementData.timeRemaining}
                    </span>
                  </div>
                </div>

                {/* 4. Energy Summary Card */}
                {settlementData.settlementEnergyWh && (
                  <div className="mb-4 p-4 rounded-lg bg-base-200" style={{}}>
                    {/* Net Energy Main */}
                    <div className="mb-3">
                      <div className="text-xs font-semibold text-base-content/60 mb-1">
                        Net Energy
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div
                          className={`text-3xl font-bold font-mono ${
                            settlementData.netEnergyWh >= 0
                              ? "text-primary"
                              : "text-error"
                          }`}
                        >
                          {(() => {
                            const formatted = formatEnergy(
                              Math.abs(settlementData.netEnergyWh)
                            );
                            return formatted.value;
                          })()}
                        </div>
                        <div className="text-sm text-base-content/60">
                          {
                            formatEnergy(Math.abs(settlementData.netEnergyWh))
                              .unit
                          }
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    {isProsumer && (
                      <div
                        className="mt-3 p-2 rounded text-xs font-semibold"
                        style={{
                          backgroundColor:
                            settlementData.netEnergyWh > 0
                              ? "rgb(34, 197, 94, 0.1)"
                              : settlementData.netEnergyWh < 0
                              ? "rgb(239, 68, 68, 0.1)"
                              : "rgb(107, 114, 128, 0.1)",
                          color:
                            settlementData.netEnergyWh > 0
                              ? "rgb(34, 197, 94)"
                              : settlementData.netEnergyWh < 0
                              ? "rgb(239, 68, 68)"
                              : "rgb(107, 114, 128)",
                        }}
                      >
                        {settlementData.netEnergyWh > 0 ? (
                          <span>More energy exported than imported</span>
                        ) : settlementData.netEnergyWh < 0 ? (
                          <span>More energy imported than exported</span>
                        ) : (
                          <span>Export and import balanced</span>
                        )}
                      </div>
                    )}

                    {/* Export & Import Sub-info */}
                    <div className="divider my-2"></div>
                    <div
                      className={`grid ${
                        isProsumer ? "grid-cols-2" : "grid-cols-1"
                      } gap-2 text-xs mb-3`}
                    >
                      {isProsumer && (
                        <div className="flex items-center justify-between p-2 rounded bg-base-100">
                          <span className="text-base-content/70">Export</span>
                          <span className="font-mono font-semibold text-primary">
                            {
                              formatEnergy(
                                settlementData.settlementEnergyWh.gridExport
                              ).formatted
                            }
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between p-2 rounded bg-base-100">
                        <span className="text-base-content/70">Import</span>
                        <span className="font-mono font-semibold text-error">
                          {
                            formatEnergy(
                              settlementData.settlementEnergyWh.gridImport
                            ).formatted
                          }
                        </span>
                      </div>
                    </div>

                    {/* Running ETK */}
                    <div
                      className="mb-3 p-2 rounded-lg"
                      style={{
                        backgroundColor:
                          settlementData.netEnergyWh > 0
                            ? "rgb(34, 197, 94, 0.1)"
                            : settlementData.netEnergyWh < 0
                            ? "rgb(239, 68, 68, 0.1)"
                            : "rgb(107, 114, 128, 0.1)",
                      }}
                    >
                      <div className="text-xs text-base-content/60 mb-1">
                        ETK{" "}
                        {settlementData.netEnergyWh > 0
                          ? "to be gained"
                          : settlementData.netEnergyWh < 0
                          ? "to be burned"
                          : "no change"}
                      </div>
                      <div className="flex items-baseline justify-between">
                        <div
                          className={`text-2xl font-bold font-mono ${
                            settlementData.netEnergyWh >= 0
                              ? "text-primary"
                              : "text-error"
                          }`}
                        >
                          {Math.abs(settlementData.currentRunningEtk).toFixed(
                            2
                          )}
                        </div>
                        <div className="text-xs text-base-content/60">ETK</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Settlement Readiness Indicator */}
                <div
                  className="p-3 rounded-lg "
                  style={{
                    backgroundColor:
                      Math.abs(settlementData.netEnergyWh) >= 100 &&
                      (settlementData.netEnergyWh >= 0 ||
                        etkBalance >=
                          Math.abs(settlementData.currentRunningEtk))
                        ? "rgb(34, 197, 94, 0.05)"
                        : "rgb(245, 158, 11, 0.05)",
                  }}
                >
                  {Math.abs(settlementData.netEnergyWh) >= 100 &&
                  (settlementData.netEnergyWh >= 0 ||
                    etkBalance >=
                      Math.abs(settlementData.currentRunningEtk)) ? (
                    <div className="flex items-start gap-2">
                      <div className="text-success mt-0.5">✓</div>
                      <div>
                        <div className="font-semibold text-sm text-success">
                          Settlement Ready
                        </div>
                        <div className="text-xs text-base-content/60 mt-0.5">
                          Net energy meets minimum requirement (
                          {formatEnergy(100).formatted})
                        </div>
                        {settlementData.netEnergyWh < 0 && (
                          <div className="text-xs text-success mt-2 p-2 rounded bg-success/10">
                            ✓ Your ETK balance ({etkBalance.toFixed(2)} ETK) is
                            sufficient to burn (
                            {Math.abs(settlementData.currentRunningEtk).toFixed(
                              2
                            )}{" "}
                            ETK)
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <div className="text-warning mt-0.5">⚠</div>
                      <div>
                        <div className="font-semibold text-sm text-warning">
                          Settlement Pending
                        </div>
                        {Math.abs(settlementData.netEnergyWh) < 100 ? (
                          <div className="text-xs text-base-content/60 mt-0.5">
                            Need{" "}
                            {
                              formatEnergy(
                                100 - Math.abs(settlementData.netEnergyWh)
                              ).formatted
                            }{" "}
                            more for settlement execution
                          </div>
                        ) : (
                          <div className="text-xs text-base-content/60 mt-0.5">
                            Insufficient ETK balance. You have{" "}
                            <span className="font-semibold">
                              {etkBalance.toFixed(2)} ETK
                            </span>
                            , but need{" "}
                            <span className="font-semibold">
                              {Math.abs(
                                settlementData.currentRunningEtk
                              ).toFixed(2)}{" "}
                              ETK
                            </span>{" "}
                            to complete settlement
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-base-content/60">
                No settlement data available
              </div>
            )}
          </div>
        </div>

        {/* Settlement History */}
        <div className="card card-border bg-base-100 border-base-300 border-2">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="card-title font-bold flex items-center gap-2">
                <DocumentTextIcon className="size-5 text-primary" />
                Settlement History
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {/* Limit Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-base-content/70 hidden sm:inline">
                    Show:
                  </span>
                  <select
                    className="select select-sm select-bordered w-20"
                    value={limit}
                    onChange={(e) =>
                      handleLimitChange(parseInt(e.target.value))
                    }
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => refetchSettlementHistory(currentScope, limit)}
                  disabled={settlementHistoryLoading}
                >
                  {settlementHistoryLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Refresh"
                  )}
                </button>
              </div>
            </div>

            {localSettlementError && (
              <div className="alert alert-error alert-sm mb-4">
                <span>{localSettlementError}</span>
              </div>
            )}

            {settlementHistoryLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border rounded"
                  >
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-32"></div>
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-16"></div>
                  </div>
                ))}
              </div>
            ) : (
              <SettlementHistory
                settlements={settlements}
                loading={settlementHistoryLoading}
                metadata={metadata}
                currentScope={currentScope}
                onScopeChange={handleScopeChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PowerConversion;
