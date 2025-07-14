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
import { useEffect, useRef, useState } from "react";
import ConversionMinimal from "../../components/conversion/ConversionMinimal";
import { apiCall } from "../../utils/api";

const PowerConversion = () => {
  // State for settlement estimator data
  const [settlementData, setSettlementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  const fetchSettlementData = async () => {
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
  };

  useEffect(() => {
    // Initial fetch
    fetchSettlementData();

    // Set up interval to fetch every second
    intervalRef.current = setInterval(() => {
      fetchSettlementData();
    }, 1000);

    // Initial fetch of settlement history
    refetchSettlementHistory(currentScope, limit);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
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
              first_change={"ETKS"}
              second_change={"kWhS"}
              rate={3}
              balanceKey="etk_balance"
            />

            {/* Periodic Settlement Estimator */}
            <div className="divider">Periodic Settlement Estimator</div>

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
                  calculates your net energy (export - import)
                </p>
                <p>
                  • <strong>ETK Conversion:</strong> Net energy is converted to
                  ETK tokens (1 kWh = 1 ETK)
                </p>
                <p>
                  • <strong>Minimum Requirement:</strong> At least 100Wh (0.1
                  kWh) net energy is needed for settlement execution
                </p>
                <p>
                  • <strong>Positive Net:</strong> Export {">"}Import = ETK
                  minted to your account
                </p>
                <p>
                  • <strong>Negative Net:</strong> Import {">"} Export = ETK
                  burned from your account
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
                <div className="mb-2">
                  <span className="font-semibold">
                    {settlementData.status === "EXPORTING"
                      ? "Exporting"
                      : settlementData.status === "IMPORTING"
                      ? "Importing"
                      : "Idle"}
                  </span>{" "}
                  <span className="text-base-content/60">
                    ({settlementData.periodMinutes} minute period)
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">
                    Current power:{" "}
                    <span className="font-semibold">
                      {settlementData.currentPowerKw} kW
                    </span>
                  </span>
                </div>

                <div className="text-xs text-base-content/60 mb-2">
                  Average power:{" "}
                  <span className="font-semibold">
                    {settlementData.averagePowerKw} kW
                  </span>
                  <br />
                  Estimated ETK{" "}
                  {settlementData.status === "EXPORTING"
                    ? "to be gained"
                    : settlementData.status === "IMPORTING"
                    ? "to be burned"
                    : "no change"}{" "}
                  at settlement:{" "}
                  <span className="font-semibold">
                    {settlementData.estimatedEtkAtSettlement} ETK
                  </span>
                  <br />
                  Running ETK:{" "}
                  <span className="font-semibold">
                    {settlementData.currentRunningEtk} ETK
                  </span>
                  <br />
                  Net Energy:{" "}
                  <span className="font-semibold">
                    {settlementData.netEnergyWh} Wh
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-base-200 rounded h-3 mb-1">
                  <div
                    className={`h-3 rounded ${
                      settlementData.status === "EXPORTING"
                        ? "bg-primary"
                        : settlementData.status === "IMPORTING"
                        ? "bg-error"
                        : "bg-base-content"
                    }`}
                    style={{ width: `${settlementData.progressPercentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between text-xs text-base-content/60">
                  <span>
                    Start: {formatTime(settlementData.periodStartTime)}
                  </span>
                  <span>Current: {formatTime(settlementData.currentTime)}</span>
                  <span>End: {formatTime(settlementData.periodEndTime)}</span>
                </div>

                <div className="text-xs text-base-content/60 mt-2">
                  Time remaining:{" "}
                  <span className="font-semibold">
                    {settlementData.timeRemaining}
                  </span>
                </div>

                {/* Settlement Readiness Indicator */}
                <div className="mt-4 p-3 rounded-lg border">
                  {Math.abs(settlementData.netEnergyWh) >= 100 ? (
                    <div className="flex items-center gap-2 text-success">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold">Settlement Ready</div>
                        <div className="text-xs">
                          Net energy (
                          {Math.abs(settlementData.netEnergyWh).toFixed(2)} Wh)
                          meets minimum requirement (100 Wh)
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-warning">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold">Settlement Pending</div>
                        <div className="text-xs">
                          Net energy (
                          {Math.abs(settlementData.netEnergyWh).toFixed(2)} Wh)
                          below minimum requirement (100 Wh)
                        </div>
                        <div className="text-xs mt-1">
                          Need{" "}
                          {(100 - Math.abs(settlementData.netEnergyWh)).toFixed(
                            2
                          )}{" "}
                          Wh more for settlement execution
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Energy breakdown */}
                {settlementData.settlementEnergyWh && (
                  <div className="mt-4">
                    <div className="text-sm font-semibold mb-2">
                      Settlement Energy Breakdown:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span>Grid Export:</span>
                        <span className="font-mono text-primary">
                          {parseFloat(
                            settlementData.settlementEnergyWh.gridExport
                          ).toFixed(2)}{" "}
                          Wh
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Grid Import:</span>
                        <span className="font-mono text-error">
                          {parseFloat(
                            settlementData.settlementEnergyWh.gridImport
                          ).toFixed(2)}{" "}
                          Wh
                        </span>
                      </div>
                    </div>
                  </div>
                )}
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
