import React, { useState, useEffect, useCallback } from "react";
import { apiCall } from "../../utils/api";

const ConversionMinimal = ({ first_change }) => {
  const [selectedWallet, setSelectedWallet] = useState("");
  const [wallets, setWallets] = useState([]);
  const [primaryWalletAddress, setPrimaryWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [balances, setBalances] = useState({ ETK: 0, IDRS: 0 });
  const [settingPrimary, setSettingPrimary] = useState(false);

  // Define functions first
  const fetchProfile = useCallback(async () => {
    try {
      const response = await apiCall("/auth/profile");
      if (response.ok) {
        const data = await response.json();
        if (data.profile) {
          setPrimaryWalletAddress(data.profile.primaryWalletAddress || "");
          return data.profile.primaryWalletAddress;
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    return null;
  }, []);

  const fetchWallets = useCallback(async () => {
    try {
      const response = await apiCall("/wallet/list");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWallets(data.data);
          return data.data;
        }
      }
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
    return [];
  }, []);

  // Initialize wallet data on component mount
  const initializeWalletData = useCallback(async () => {
    try {
      // Fetch both profile and wallets in parallel
      const [profilePrimaryWallet, walletsData] = await Promise.all([
        fetchProfile(),
        fetchWallets(),
      ]);

      // Set selected wallet based on primary wallet from profile
      if (profilePrimaryWallet && walletsData.length > 0) {
        const primaryWallet = walletsData.find(
          (wallet) => wallet.walletAddress === profilePrimaryWallet
        );
        if (primaryWallet) {
          setSelectedWallet(primaryWallet.walletAddress);
        } else {
          // Fallback to first wallet if primary not found
          setSelectedWallet(walletsData[0].walletAddress);
        }
      } else if (walletsData.length > 0) {
        // If no primary wallet, use first wallet
        setSelectedWallet(walletsData[0].walletAddress);
      }
    } catch (error) {
      console.error("Error initializing wallet data:", error);
    }
  }, [fetchProfile, fetchWallets]);

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

  // Load wallets and profile on component mount
  useEffect(() => {
    initializeWalletData();
  }, [initializeWalletData]);

  // Fetch wallet balances when wallet changes
  useEffect(() => {
    if (selectedWallet) {
      fetchWalletBalances();
    }
  }, [selectedWallet, fetchWalletBalances]);

  // Auto-hide error message after 1 second
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Auto-hide result message after 1 second
  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setResult("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const setPrimaryWallet = async (walletAddress) => {
    try {
      setSettingPrimary(true);
      const response = await apiCall(`/wallet/${walletAddress}/primary`, {
        method: "POST",
      });

      if (response.ok) {
        setResult("Primary wallet updated successfully");
        // Refresh wallet data to get updated primary wallet info
        await initializeWalletData();
        setError("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to set primary wallet");
      }
    } catch (error) {
      console.error("Error setting primary wallet:", error);
      setError("Network error while setting primary wallet");
    } finally {
      setSettingPrimary(false);
    }
  };

  const handleWalletChange = (e) => {
    const newWalletAddress = e.target.value;
    setSelectedWallet(newWalletAddress);
    setResult("");
    setError("");

    // Set as primary wallet when selected
    if (newWalletAddress) {
      setPrimaryWallet(newWalletAddress);
    }
  };

  return (
    <>
      <p className="text-base-content/60 mb-2">
        Energy Settlement - Automatic conversion of{" "}
        <span className="font-mono">kWh</span> to{" "}
        <span className="font-mono">{first_change}</span> tokens based on your
        energy meter readings
      </p>

      {/* Wallet selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-base-content mb-1">
          Primary Wallet for Energy Settlement
        </label>
        <select
          className="select select-bordered w-full"
          value={selectedWallet}
          onChange={handleWalletChange}
          disabled={settingPrimary}
        >
          <option value="" disabled>
            Select primary wallet
          </option>
          {wallets.map((wallet) => (
            <option key={wallet.walletAddress} value={wallet.walletAddress}>
              {wallet.walletName} ({wallet.walletAddress.slice(0, 6)}...
              {wallet.walletAddress.slice(-4)})
              {wallet.walletAddress === primaryWalletAddress
                ? " (Primary)"
                : ""}
            </option>
          ))}
        </select>
        {settingPrimary && (
          <p className="text-xs text-base-content/60 mt-1">
            <span className="loading loading-spinner loading-xs mr-1"></span>
            Setting as primary wallet...
          </p>
        )}
      </div>

      {/* Balance Display */}
      <div className="mb-6 grid grid-cols-1 gap-4">
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
      </div>

      <div className="mb-4 flex justify-between items-center">
        <button
          className="btn btn-xs btn-outline btn-primary"
          type="button"
          onClick={fetchWalletBalances}
          disabled={loading || !selectedWallet}
        >
          {loading ? "Loading..." : "Refresh Balance"}
        </button>
        {/* <button
          className="btn btn-xs btn-outline btn-secondary"
          type="button"
          onClick={initializeWalletData}
          disabled={settingPrimary}
        >
          {settingPrimary ? "Updating..." : "Refresh Wallets"}
        </button> */}
      </div>
    </>
  );
};

export default ConversionMinimal;
