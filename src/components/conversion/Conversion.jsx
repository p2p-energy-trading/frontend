import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";

const Conversion = ({ first_change, second_change, rate }) => {
  const { user } = useAuth();
  const [tab, setTab] = useState("deposit");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balances, setBalances] = useState({ ETK: 0, IDRS: 0 });

  // Define functions first
  const fetchWallets = async () => {
    try {
      const response = await apiCall("/wallet/list");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWallets(data.data);
          if (data.data.length > 0) {
            setSelectedWallet(data.data[0].walletAddress);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const fetchWalletBalances = useCallback(async () => {
    if (!selectedWallet) return;

    try {
      setLoading(true);
      const response = await apiCall(`/wallet/${selectedWallet}/balances`);
      if (response.ok) {
        const data = await response.json();
        setBalances(data);
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedWallet]);

  // Load wallets on component mount
  useEffect(() => {
    if (user?.wallets && user.wallets.length > 0) {
      setWallets(user.wallets);
      if (user.wallets[0]) {
        setSelectedWallet(user.wallets[0].walletAddress);
      }
    } else {
      fetchWallets();
    }
  }, [user]);

  // Fetch wallet balances when wallet changes
  useEffect(() => {
    if (selectedWallet) {
      fetchWalletBalances();
    }
  }, [selectedWallet, fetchWalletBalances]);

  const handleWalletChange = (e) => {
    setSelectedWallet(e.target.value);
    setResult("");
    setError("");
  };

  // Deposit IDR → IDRS (ON_RAMP)
  const handleDeposit = async (e) => {
    e.preventDefault();
    if (!depositAmount || Number(depositAmount) <= 0) return;
    if (!selectedWallet) {
      setError("Please select a wallet");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await apiCall("/wallet/idrs-conversion", {
        method: "POST",
        body: JSON.stringify({
          walletAddress: selectedWallet,
          conversionType: "ON_RAMP",
          amount: Number(depositAmount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setResult(
            `✅ Successfully converted ${depositAmount} ${second_change} to ${data.data.idrsAmount} ${first_change}`
          );
          setDepositAmount("");
          // Refresh balance
          await fetchWalletBalances();
        } else {
          setError(data.message || "Conversion failed");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Conversion failed");
      }
    } catch (error) {
      console.error("Deposit error:", error);
      setError("Network error during conversion");
    } finally {
      setLoading(false);
    }
  };

  // Withdraw IDRS → IDR (OFF_RAMP)
  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;
    if (!selectedWallet) {
      setError("Please select a wallet");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await apiCall("/wallet/idrs-conversion", {
        method: "POST",
        body: JSON.stringify({
          walletAddress: selectedWallet,
          conversionType: "OFF_RAMP",
          amount: Number(withdrawAmount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setResult(
            `✅ Successfully converted ${withdrawAmount} ${first_change} to ${data.data.idrAmount} ${second_change}`
          );
          setWithdrawAmount("");
          // Refresh balance
          await fetchWalletBalances();
        } else {
          setError(data.message || "Conversion failed");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Conversion failed");
      }
    } catch (error) {
      console.error("Withdraw error:", error);
      setError("Network error during conversion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-base-content/60 mb-2">
        Withdraw <span className="font-mono">{first_change}</span> &rarr;{" "}
        <span className="font-mono">{second_change}</span> / Deposit{" "}
        <span className="font-mono">{second_change}</span> &rarr;{" "}
        <span className="font-mono">{first_change}</span>
      </p>

      {/* Wallet selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-base-content mb-1">
          Wallet
        </label>
        <select
          className="select select-bordered w-full"
          value={selectedWallet}
          onChange={handleWalletChange}
        >
          <option value="" disabled>
            Select wallet
          </option>
          {wallets.map((wallet) => (
            <option key={wallet.walletAddress} value={wallet.walletAddress}>
              {wallet.walletName} ({wallet.walletAddress.slice(0, 6)}...
              {wallet.walletAddress.slice(-4)})
            </option>
          ))}
        </select>
      </div>

      {/* Balance Display */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-base-200 rounded-lg px-4 py-2 flex flex-col items-center">
          <span className="text-xs text-base-content/60">ETK Balance</span>
          <span className="font-bold text-primary text-lg font-mono">
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              balances.ETK.toLocaleString("id-ID", { minimumFractionDigits: 2 })
            )}
          </span>
        </div>
        <div className="bg-base-200 rounded-lg px-4 py-2 flex flex-col items-center">
          <span className="text-xs text-base-content/60">IDRS Balance</span>
          <span className="font-bold text-secondary text-lg font-mono">
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              balances.IDRS.toLocaleString("id-ID", {
                minimumFractionDigits: 2,
              })
            )}
          </span>
        </div>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm text-base-content/60">
          Current Rate: 1 {second_change} = {rate} {first_change}
        </span>
        <button
          className="btn btn-xs btn-outline btn-primary"
          type="button"
          onClick={fetchWalletBalances}
          disabled={loading || !selectedWallet}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 py-2 text-center font-semibold border-b-2 transition-all ${
            tab === "deposit"
              ? "border-primary text-primary"
              : "border-transparent text-base-content/60 hover:text-primary"
          }`}
          type="button"
          onClick={() => {
            setTab("deposit");
            setResult("");
            setError("");
          }}
        >
          Deposit (ON-RAMP)
        </button>
        <button
          className={`flex-1 py-2 text-center font-semibold border-b-2 transition-all ${
            tab === "withdraw"
              ? "border-primary text-primary"
              : "border-transparent text-base-content/60 hover:text-primary"
          }`}
          type="button"
          onClick={() => {
            setTab("withdraw");
            setResult("");
            setError("");
          }}
        >
          Withdraw (OFF-RAMP)
        </button>
      </div>

      {/* Deposit Panel */}
      {tab === "deposit" && (
        <form className="space-y-4" onSubmit={handleDeposit}>
          <div>
            <label className="block font-medium mb-1">
              Amount ({second_change})
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="input input-bordered w-full"
              required
              placeholder="e.g. 10000"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              disabled={loading || !selectedWallet}
            />
            <div className="text-xs text-base-content/60 mt-1">
              Receive:{" "}
              <span className="font-mono">
                {depositAmount
                  ? (Number(depositAmount) * rate).toFixed(2)
                  : "0.00"}{" "}
                {first_change}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={loading || !selectedWallet || !depositAmount}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              `Deposit (Mint ${first_change})`
            )}
          </button>
        </form>
      )}

      {/* Withdraw Panel */}
      {tab === "withdraw" && (
        <form className="space-y-4" onSubmit={handleWithdraw}>
          <div>
            <label className="block font-medium mb-1">
              Amount ({first_change})
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="input input-bordered w-full"
              required
              placeholder="e.g. 10000"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              disabled={loading || !selectedWallet}
            />
            <div className="text-xs text-base-content/60 mt-1">
              Receive:{" "}
              <span className="font-mono">
                {withdrawAmount
                  ? (Number(withdrawAmount) / rate).toFixed(2)
                  : "0.00"}{" "}
                {second_change}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary"
            disabled={
              loading ||
              !selectedWallet ||
              !withdrawAmount ||
              balances.IDRS < Number(withdrawAmount)
            }
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Processing...
              </>
            ) : (
              `Withdraw (Burn ${first_change})`
            )}
          </button>
          {balances.IDRS < Number(withdrawAmount) && withdrawAmount && (
            <div className="text-xs text-error mt-1">
              Insufficient {first_change} balance
            </div>
          )}
        </form>
      )}

      {/* Result */}
      {result && (
        <div className="alert alert-success mt-6 shadow-sm">
          <span>{result}</span>
        </div>
      )}

      {/* Info tambahan */}
      <div className="mt-6 text-xs text-base-content/60">
        <div>
          ⚡️ Exchange rate: <span className="font-mono">1:1 (No fees)</span> |
          Est. block time: <span className="font-mono">~5s</span>
        </div>
        <div>🔒 All transactions are secured on blockchain and auditable.</div>
      </div>
    </>
  );
};

export default Conversion;
