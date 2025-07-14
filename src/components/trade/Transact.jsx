import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";

// Helper function for Indonesian number formatting
const formatIndonesian = (number, minimumFractionDigits = 2) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits,
    maximumFractionDigits: minimumFractionDigits,
  }).format(number);
};

const Transact = ({ placeOrder, isPlacingOrder, orderError }) => {
  const { user } = useAuth();
  const [action, setAction] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [validationError, setValidationError] = useState("");

  // Balance states
  const [balances, setBalances] = useState(null);
  const [balancesLoading, setBalancesLoading] = useState(false);
  const [balancesError, setBalancesError] = useState("");

  const userWallets = user?.wallets || [];

  // Fetch wallet balances
  const fetchBalances = useCallback(async (walletAddress) => {
    if (!walletAddress) {
      setBalances(null);
      return;
    }

    try {
      setBalancesLoading(true);
      setBalancesError("");

      const response = await apiCall(`/wallet/${walletAddress}/balances`);

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          setBalances({ ETK: data.ETK, IDRS: data.IDRS });
        } else {
          setBalancesError(data.message || "Failed to fetch balances");
          setBalances(null);
        }
      } else {
        let errorMessage = "Failed to fetch balances";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        setBalancesError(errorMessage);
        setBalances(null);
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
      setBalancesError("Network error while fetching balances");
      setBalances(null);
    } finally {
      setBalancesLoading(false);
    }
  }, []);

  // Fetch balances when wallet changes
  useEffect(() => {
    if (selectedWallet) {
      fetchBalances(selectedWallet);
    }
  }, [selectedWallet, fetchBalances]);

  // Calculator functions
  const calculateTradeResult = () => {
    if (!amount || !price || !balances || !action) return null;

    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(price);
    const totalValue = amountNum * priceNum;

    const currentETK = balances.ETK || 0;
    const currentIDRS = balances.IDRS || 0;

    if (action === "buy") {
      // Buying ETK with IDRS
      const newETK = currentETK + amountNum;
      const newIDRS = currentIDRS - totalValue;
      return {
        type: "buy",
        spend: totalValue,
        receive: amountNum,
        newETK,
        newIDRS,
        sufficient: currentIDRS >= totalValue,
      };
    } else {
      // Selling ETK for IDRS
      const newETK = currentETK - amountNum;
      const newIDRS = currentIDRS + totalValue;
      return {
        type: "sell",
        spend: amountNum,
        receive: totalValue,
        newETK,
        newIDRS,
        sufficient: currentETK >= amountNum,
      };
    }
  };

  const tradeResult = calculateTradeResult();

  const handleWalletChange = (e) => {
    setSelectedWallet(e.target.value);
    setValidationError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    // Validation
    if (!selectedWallet) {
      setValidationError("Please select a wallet");
      return;
    }
    if (!action) {
      setValidationError("Please select Buy or Sell");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setValidationError("Please enter a valid amount");
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setValidationError("Please enter a valid price");
      return;
    }

    // Check if user has sufficient balance
    if (tradeResult && !tradeResult.sufficient) {
      if (action === "buy") {
        setValidationError("Insufficient IDRS balance");
      } else {
        setValidationError("Insufficient ETK balance");
      }
      return;
    }

    const orderType = action === "buy" ? "BID" : "ASK";
    const result = await placeOrder(selectedWallet, orderType, amount, price);

    if (result.success) {
      // Reset form on success
      setAmount("");
      setPrice("");
      setAction(null);
      setSelectedWallet("");
      setBalances(null);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Order Form */}
      <div className="order-2 lg:order-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Display */}
          {(orderError || validationError) && (
            <div className="alert alert-error alert-sm">
              <span>{orderError || validationError}</span>
            </div>
          )}

          <fieldset className="fieldset">
            <legend className="fieldset-legend pt-0">Wallet:</legend>
            <select
              value={selectedWallet}
              onChange={handleWalletChange}
              className="select w-full"
              disabled={isPlacingOrder}
            >
              <option value="">Pick a wallet</option>
              {userWallets.map((wallet) => (
                <option key={wallet.walletAddress} value={wallet.walletAddress}>
                  {wallet.walletName} ({wallet.walletAddress.slice(0, 6)}...
                  {wallet.walletAddress.slice(-4)})
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend pt-0">Action:</legend>
            <div className="flex gap-2">
              <button
                type="button"
                className={`btn flex-1 ${
                  action === "buy" ? "btn-success" : "btn-outline"
                }`}
                onClick={() => setAction("buy")}
                disabled={isPlacingOrder}
              >
                Buy (BID)
              </button>
              <button
                type="button"
                className={`btn flex-1 ${
                  action === "sell" ? "btn-error" : "btn-outline"
                }`}
                onClick={() => setAction("sell")}
                disabled={isPlacingOrder}
              >
                Sell (ASK)
              </button>
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend pt-0">Amount (ETK)</legend>
            <input
              type="number"
              step="0.001"
              min="0"
              className="input w-full"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isPlacingOrder}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend pt-0">Price (IDRS/ETK)</legend>
            <input
              type="number"
              step="0.01"
              min="0"
              className="input w-full"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isPlacingOrder}
            />
          </fieldset>

          <div className="card-actions justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                isPlacingOrder || (tradeResult && !tradeResult.sufficient)
              }
            >
              {isPlacingOrder ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Trade Calculator */}
      <div className="order-1 lg:order-2">
        {/* Current Balances */}
        <div className="card bg-base-200 border border-base-300 mb-4">
          <div className="card-body p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">Current Balances</h4>
              {selectedWallet && balancesError && (
                <button
                  type="button"
                  className="btn btn-xs btn-outline"
                  onClick={() => fetchBalances(selectedWallet)}
                  disabled={balancesLoading}
                >
                  {balancesLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Retry"
                  )}
                </button>
              )}
            </div>
            {!selectedWallet ? (
              <div className="text-center py-4 text-base-content/60">
                <svg
                  className="w-8 h-8 mx-auto mb-2 opacity-30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <p className="text-xs">Select a wallet to view balances</p>
              </div>
            ) : balancesLoading ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs">ETK:</span>
                  <div className="skeleton h-4 w-16"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">IDRS:</span>
                  <div className="skeleton h-4 w-16"></div>
                </div>
              </div>
            ) : balancesError ? (
              <div className="space-y-2">
                <div className="text-error text-xs">{balancesError}</div>
                <div className="text-xs text-base-content/60">
                  Selected wallet: {selectedWallet.slice(0, 6)}...
                  {selectedWallet.slice(-4)}
                </div>
              </div>
            ) : balances && typeof balances === "object" ? (
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-warning font-medium">ETK:</span>
                  <span className="text-xs font-mono">
                    {formatIndonesian(parseFloat(balances.ETK || 0))}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-success font-medium">
                    IDRS:
                  </span>
                  <span className="text-xs font-mono">
                    {formatIndonesian(parseFloat(balances.IDRS || 0))}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-base-content/60">
                Loading wallet balances...
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-200 border border-base-300 sticky top-4 lg:h-fit">
          <div className="card-body p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Trade Calculator
            </h4>

            {!action || !amount || !price ? (
              <div className="space-y-3 text-center text-base-content/60">
                <div className="text-sm">
                  {!action && "Select Buy or Sell action"}
                  {action && !amount && "Enter amount to trade"}
                  {action && amount && !price && "Enter price per ETK"}
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>Action:</span>
                    <span className="font-medium">
                      {action
                        ? action === "buy"
                          ? "Buy ETK"
                          : "Sell ETK"
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-mono">{amount || "0"} ETK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-mono">{price || "0"} IDRS/ETK</span>
                  </div>
                  {amount && price && (
                    <div className="flex justify-between pt-2 border-t border-base-300">
                      <span>Total Value:</span>
                      <span className="font-mono font-medium">
                        {(
                          parseFloat(amount || 0) * parseFloat(price || 0)
                        ).toFixed(2)}{" "}
                        IDRS
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : tradeResult ? (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-base-content/70">
                    {tradeResult.type === "buy"
                      ? "You will spend:"
                      : "You will sell:"}
                  </span>
                  <span className="font-mono font-medium">
                    {tradeResult.type === "buy"
                      ? `${formatIndonesian(tradeResult.spend)} IDRS`
                      : `${formatIndonesian(tradeResult.spend)} ETK`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">
                    {tradeResult.type === "buy"
                      ? "You will receive:"
                      : "You will receive:"}
                  </span>
                  <span className="font-mono font-medium text-success">
                    {tradeResult.type === "buy"
                      ? `${formatIndonesian(tradeResult.receive)} ETK`
                      : `${formatIndonesian(tradeResult.receive)} IDRS`}
                  </span>
                </div>

                {balances && (
                  <>
                    <div className="divider my-2"></div>

                    <div className="space-y-2">
                      <div className="text-xs font-medium text-base-content/80">
                        After this trade:
                      </div>
                      <div className="flex justify-between">
                        <span className="text-warning">ETK Balance:</span>
                        <span
                          className={`font-mono ${
                            tradeResult.newETK >= 0
                              ? "text-base-content"
                              : "text-error"
                          }`}
                        >
                          {formatIndonesian(tradeResult.newETK)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-success">IDRS Balance:</span>
                        <span
                          className={`font-mono ${
                            tradeResult.newIDRS >= 0
                              ? "text-base-content"
                              : "text-error"
                          }`}
                        >
                          {formatIndonesian(tradeResult.newIDRS)}
                        </span>
                      </div>
                    </div>

                    {!tradeResult.sufficient && (
                      <div className="alert alert-warning alert-sm mt-3">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.734 0L4.08 15.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span className="text-xs">
                          Insufficient{" "}
                          {tradeResult.type === "buy" ? "IDRS" : "ETK"} balance
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transact;
