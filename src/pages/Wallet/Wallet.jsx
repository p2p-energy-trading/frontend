import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";
import { WalletIcon } from "@heroicons/react/24/outline";

const Wallet = () => {
  const { token } = useAuth();
  const [action, setAction] = useState("create");
  const [privateKey, setPrivateKey] = useState("");
  const [walletName, setWalletName] = useState("");
  const [wallets, setWallets] = useState([]);
  const [primaryWalletAddress, setPrimaryWalletAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch profile to get primary wallet address
  const fetchProfile = useCallback(async () => {
    try {
      const response = await apiCall("/auth/profile");
      if (response.ok) {
        const data = await response.json();
        if (data.profile) {
          setPrimaryWalletAddress(data.profile.primaryWalletAddress || "");
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, []);

  // Fetch wallets from wallet list endpoint
  const fetchWallets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiCall("/wallet/list");

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWallets(data.data);
        } else {
          const errorMessage = data.message || "Failed to fetch wallets";
          setError(errorMessage);
          setTimeout(() => setError(""), 3000);
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to fetch wallets";
        setError(errorMessage);
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error("Error fetching wallets:", error);
      const errorMessage = "Network error while fetching wallets";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new wallet
  const createWallet = async (walletName) => {
    try {
      const response = await apiCall("/wallet/create", {
        method: "POST",
        body: JSON.stringify({
          walletName,
          importMethod: "GENERATED",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Refresh wallet list and profile
          await fetchWallets();
          await fetchProfile();
          return { success: true, message: data.message };
        } else {
          return {
            success: false,
            error: data.message || "Failed to create wallet",
          };
        }
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Failed to create wallet",
        };
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
      return { success: false, error: "Network error" };
    }
  };

  // Import existing wallet
  const importWallet = async (privateKey, walletName) => {
    try {
      const response = await apiCall("/wallet/create", {
        method: "POST",
        body: JSON.stringify({
          walletName: walletName || "Imported Wallet",
          importMethod: "IMPORTED_PRIVATE_KEY",
          privateKey,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Refresh wallet list and profile
          await fetchWallets();
          await fetchProfile();
          return { success: true, message: data.message };
        } else {
          return {
            success: false,
            error: data.message || "Failed to import wallet",
          };
        }
      } else {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.message || "Failed to import wallet",
        };
      }
    } catch (error) {
      console.error("Error importing wallet:", error);
      return { success: false, error: "Network error" };
    }
  };

  // Activate wallet
  const activateWallet = async (walletAddress) => {
    try {
      const response = await apiCall(`/wallet/${walletAddress}/activate`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchWallets();
          await fetchProfile();
          setSuccess(data.message);
          setTimeout(() => setSuccess(""), 3000);
          return { success: true };
        }
      }
      const errorMessage = "Failed to activate wallet";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
      return { success: false, error: errorMessage };
    } catch (error) {
      console.error("Error activating wallet:", error);
      const errorMessage = "Network error";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
      return { success: false, error: errorMessage };
    }
  };

  // Deactivate wallet
  const deactivateWallet = async (walletAddress) => {
    try {
      const response = await apiCall(`/wallet/${walletAddress}/deactivate`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchWallets();
          await fetchProfile();
          setSuccess(data.message);
          setTimeout(() => setSuccess(""), 3000);
          return { success: true };
        }
      }
      const errorMessage = "Failed to deactivate wallet";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
      return { success: false, error: errorMessage };
    } catch (error) {
      console.error("Error deactivating wallet:", error);
      const errorMessage = "Network error";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
      return { success: false, error: errorMessage };
    }
  };

  // Set primary wallet
  const setPrimaryWallet = async (walletAddress) => {
    try {
      const response = await apiCall(`/wallet/${walletAddress}/primary`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchProfile(); // Refresh profile to get updated primary wallet
          await fetchWallets(); // Refresh wallet list
          setSuccess(data.message);
          setTimeout(() => setSuccess(""), 3000);
          return { success: true };
        }
      }
      const errorMessage = "Failed to set primary wallet";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
      return { success: false, error: errorMessage };
    } catch (error) {
      console.error("Error setting primary wallet:", error);
      const errorMessage = "Network error";
      setError(errorMessage);
      setTimeout(() => setError(""), 3000);
      return { success: false, error: errorMessage };
    }
  };

  // Load wallets and profile on component mount
  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchWallets();
    }
  }, [token, fetchProfile, fetchWallets]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
    if (e.target.value === "create") {
      setPrivateKey("");
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (action === "create") {
      if (!walletName.trim()) {
        setError("Wallet name is required");
        setTimeout(() => setError(""), 3000);
        return;
      }

      const result = await createWallet(walletName.trim());
      if (result.success) {
        setWalletName("");
        setAction("create");
        setSuccess(result.message || "Wallet created successfully");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.error);
        setTimeout(() => setError(""), 3000);
      }
    } else if (action === "import") {
      if (!privateKey.trim()) {
        setError("Private key is required");
        setTimeout(() => setError(""), 3000);
        return;
      }

      const result = await importWallet(privateKey.trim(), walletName.trim());
      if (result.success) {
        setPrivateKey("");
        setWalletName("");
        setAction("create");
        setSuccess(result.message || "Wallet imported successfully");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.error);
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="card bg-base-100 border-2 border-base-300 rounded-xl shadow">
        <div className="card-body p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-4">
            <WalletIcon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            Wallet Management
          </h2>

          {/* Success Message */}
          {success && (
            <div className="alert alert-success mb-4 text-sm">
              <span>{success}</span>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="alert alert-error mb-4 text-sm">
              <span>{error}</span>
            </div>
          )}

          {/* Create/Import Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="action"
                className="block text-sm font-medium mb-1"
              >
                Action
              </label>
              <select
                className="select select-bordered w-full text-sm"
                id="action"
                name="action"
                required
                value={action}
                onChange={handleActionChange}
              >
                <option value="create">Create New Wallet</option>
                <option value="import">Import Existing Wallet</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="wallet_name"
                className="block text-sm font-medium mb-1"
              >
                Wallet Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full text-sm"
                id="wallet_name"
                name="wallet_name"
                placeholder="Enter wallet name"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required={action === "create"}
              />
            </div>

            {action === "import" && (
              <div>
                <label
                  htmlFor="private_key"
                  className="block text-sm font-medium mb-1"
                >
                  Private Key
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full text-sm"
                  id="private_key"
                  name="private_key"
                  placeholder="Enter your private key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  required={action === "import"}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full text-sm">
              {action === "create" ? "Create Wallet" : "Import Wallet"}
            </button>
          </form>

          <div className="divider my-8"></div>

          {/* Wallet List */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-base-content">
              Your Wallets
            </h3>
            <button
              className="btn btn-sm btn-outline w-full sm:w-auto"
              onClick={() => {
                fetchProfile();
                fetchWallets();
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {/* Skeleton wallet cards */}
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="card bg-base-200 border border-base-300 rounded-lg"
                >
                  <div className="card-body p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div className="skeleton h-5 sm:h-6 w-24 sm:w-32"></div>
                      <div className="flex flex-wrap gap-2">
                        <div className="skeleton h-4 sm:h-5 w-12 sm:w-16 rounded-full"></div>
                        <div className="skeleton h-4 sm:h-5 w-16 sm:w-20 rounded-full"></div>
                      </div>
                    </div>

                    <div className="skeleton h-3 w-12 sm:w-16 mb-1"></div>
                    <div className="skeleton h-3 sm:h-4 w-full mb-3"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div>
                        <div className="skeleton h-3 w-10 sm:w-12 mb-1"></div>
                        <div className="skeleton h-3 sm:h-4 w-20 sm:w-24"></div>
                      </div>
                      <div>
                        <div className="skeleton h-3 w-12 sm:w-16 mb-1"></div>
                        <div className="skeleton h-3 sm:h-4 w-16 sm:w-20"></div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <div className="skeleton h-5 sm:h-6 w-16 sm:w-20"></div>
                      <div className="skeleton h-5 sm:h-6 w-20 sm:w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-4">
              {wallets.map((wallet) => (
                <li
                  key={wallet.walletAddress}
                  className="card bg-base-200 border border-base-300 rounded-lg"
                >
                  <div className="card-body p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                      <div className="text-base sm:text-lg font-semibold text-primary truncate">
                        {wallet.walletName}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <div
                          className={`badge badge-sm ${
                            wallet.isActive ? "badge-success" : "badge-error"
                          }`}
                        >
                          {wallet.isActive ? "Active" : "Inactive"}
                        </div>
                        {wallet.walletAddress === primaryWalletAddress && (
                          <div className="badge badge-sm badge-primary">
                            Primary
                          </div>
                        )}
                        <div className="badge badge-sm badge-outline">
                          {wallet.importMethod === "GENERATED"
                            ? "Generated"
                            : "Imported"}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-base-content/60 mb-1">
                      Address:
                    </div>
                    <div className="font-mono text-xs sm:text-sm break-all text-primary mb-3 bg-base-300 p-2 rounded">
                      {wallet.walletAddress}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs">
                      <div>
                        <div className="text-base-content/60 mb-1">
                          Created:
                        </div>
                        <div className="text-base-content/80 text-xs">
                          {formatDate(wallet.createdAt)}
                        </div>
                      </div>
                      <div>
                        <div className="text-base-content/60 mb-1">
                          Last Used:
                        </div>
                        <div className="text-base-content/80 text-xs">
                          {formatDate(wallet.lastUsedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 mt-4">
                      <button
                        className="btn btn-xs btn-primary flex-1 sm:flex-none"
                        onClick={() =>
                          wallet.isActive
                            ? deactivateWallet(wallet.walletAddress)
                            : activateWallet(wallet.walletAddress)
                        }
                      >
                        {wallet.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="btn btn-xs btn-secondary flex-1 sm:flex-none"
                        onClick={() => setPrimaryWallet(wallet.walletAddress)}
                        disabled={wallet.walletAddress === primaryWalletAddress}
                      >
                        {wallet.walletAddress === primaryWalletAddress
                          ? "Primary Wallet"
                          : "Set as Primary"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {wallets.length === 0 && !loading && (
                <li className="text-base-content/60 text-sm text-center py-8">
                  No wallets found. Create or import your first wallet above.
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
