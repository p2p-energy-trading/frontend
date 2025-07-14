import {
  CurrencyDollarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import Conversion from "../../components/conversion/Conversion";
import TokenTransactionHistory from "./components/TokenTransactionHistory";
import useTokenTransactionHistory from "./hooks/useTokenTransactionHistory";

const BalanceConversion = () => {
  // State for transaction history scope and settings
  const [currentScope, setCurrentScope] = useState("own");
  const [currentTokenType, setCurrentTokenType] = useState("IDRS");
  const [limit, setLimit] = useState(10);
  const [localError, setLocalError] = useState("");

  // Token transaction history hook
  const {
    transactions,
    loading: transactionHistoryLoading,
    error: transactionHistoryError,
    metadata,
    refetch: refetchTransactionHistory,
  } = useTokenTransactionHistory();

  // Handle error auto-hide
  useEffect(() => {
    if (transactionHistoryError) {
      setLocalError(transactionHistoryError);
      const timer = setTimeout(() => {
        setLocalError("");
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setLocalError("");
    }
  }, [transactionHistoryError]);

  // Handle scope change
  const handleScopeChange = (newScope) => {
    // Ensure scope is valid
    const validScope = ["own", "public"].includes(newScope) ? newScope : "own";
    setCurrentScope(validScope);
    refetchTransactionHistory(validScope, limit, currentTokenType);
  };

  // Handle token type change
  const handleTokenTypeChange = (newTokenType) => {
    setCurrentTokenType(newTokenType);
    refetchTransactionHistory(currentScope, limit, newTokenType);
  };

  // Handle limit change
  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    refetchTransactionHistory(currentScope, newLimit, currentTokenType);
  };

  // Initial fetch and refresh when dependencies change
  useEffect(() => {
    refetchTransactionHistory(currentScope, limit, currentTokenType);
  }, [currentScope, limit, currentTokenType, refetchTransactionHistory]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-4 w-full">
      <div className="card card-border bg-base-100 border-base-300 border-2">
        <div className="card-body">
          {/* <h2 className="card-title">Convertion</h2> */}
          <h2 className="card-title font-bold flex items-center gap-2">
            <CurrencyDollarIcon className="size-5 text-primary" />
            Balance Conversion
          </h2>
          {/* <OrderBook /> */}
          <Conversion first_change={"IDRS"} second_change={"IDR"} rate={1} />
        </div>
      </div>

      {/* Token Transaction History */}
      <div className="card card-border bg-base-100 border-base-300 border-2">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h2 className="card-title font-bold flex items-center gap-2">
              <DocumentTextIcon className="size-5 text-primary" />
              Token Transaction History
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              {/* Token Type Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/70 hidden sm:inline">
                  Token:
                </span>
                <select
                  className="select select-sm select-bordered"
                  value={currentTokenType}
                  onChange={(e) => handleTokenTypeChange(e.target.value)}
                >
                  <option value="IDRS">IDRS</option>
                  <option value="ETK">ETK</option>
                  <option value="">All</option>
                </select>
              </div>

              {/* Limit Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/70 hidden sm:inline">
                  Show:
                </span>
                <select
                  className="select select-sm select-bordered w-20"
                  value={limit}
                  onChange={(e) => handleLimitChange(parseInt(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <button
                className="btn btn-sm btn-outline"
                onClick={() =>
                  refetchTransactionHistory(
                    currentScope,
                    limit,
                    currentTokenType
                  )
                }
                disabled={transactionHistoryLoading}
              >
                {transactionHistoryLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  "Refresh"
                )}
              </button>
            </div>
          </div>

          {localError && (
            <div className="alert alert-error alert-sm mb-4">
              <span>{localError}</span>
            </div>
          )}

          <TokenTransactionHistory
            transactions={transactions}
            loading={transactionHistoryLoading}
            metadata={metadata}
            currentScope={currentScope}
            currentTokenType={currentTokenType}
            onScopeChange={handleScopeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BalanceConversion;
