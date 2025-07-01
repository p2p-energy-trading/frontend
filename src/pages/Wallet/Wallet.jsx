import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiCall } from "../../utils/api";

const Wallet = () => {
  const { user, token } = useAuth();
  const [action, setAction] = useState("create");
  const [privateKey, setPrivateKey] = useState("");
  const [walletName, setWalletName] = useState("");
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch wallets from API or use cached data from user profile
  const fetchWallets = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      // First try to use wallets from user profile if available
      if (user?.wallets && user.wallets.length > 0) {
        setWallets(user.wallets);
        setLoading(false);
        return;
      }

      // Fallback to API call if no wallets in profile
      const response = await apiCall("/wallet/list");

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setWallets(data.data);
        } else {
          setError(data.message || "Failed to fetch wallets");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch wallets");
      }
    } catch (error) {
      console.error("Error fetching wallets:", error);
      setError("Network error while fetching wallets");
    } finally {
      setLoading(false);
    }
  }, [user?.wallets]);

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
          // Refresh wallet list
          await fetchWallets();
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
          // Refresh wallet list
          await fetchWallets();
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
          setSuccess(data.message);
          setTimeout(() => setSuccess(""), 3000);
          return { success: true };
        }
      }
      return { success: false, error: "Failed to activate wallet" };
    } catch (error) {
      console.error("Error activating wallet:", error);
      return { success: false, error: "Network error" };
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
          setSuccess(data.message);
          setTimeout(() => setSuccess(""), 3000);
          return { success: true };
        }
      }
      return { success: false, error: "Failed to deactivate wallet" };
    } catch (error) {
      console.error("Error deactivating wallet:", error);
      return { success: false, error: "Network error" };
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
          setSuccess(data.message);
          setTimeout(() => setSuccess(""), 3000);
          return { success: true };
        }
      }
      return { success: false, error: "Failed to set primary wallet" };
    } catch (error) {
      console.error("Error setting primary wallet:", error);
      return { success: false, error: "Network error" };
    }
  };

  // Load wallets on component mount or when user data changes
  useEffect(() => {
    if (token) {
      fetchWallets();
    }
  }, [token, fetchWallets]);

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
        return;
      }

      const result = await createWallet(walletName.trim());
      if (result.success) {
        setWalletName("");
        setAction("create");
        setSuccess(result.message || "Wallet created successfully");
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.error);
      }
    } else if (action === "import") {
      if (!privateKey.trim()) {
        setError("Private key is required");
        return;
      }

      const result = await importWallet(privateKey.trim(), walletName.trim());
      if (result.success) {
        setPrivateKey("");
        setWalletName("");
        setAction("create");
        setSuccess(result.message || "Wallet imported successfully");
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.error);
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
    <div className="w-full">
      <div className="card bg-base-100 border-2 border-base-300 rounded-xl shadow">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4 text-primary">
            Wallet Management
          </h2>

          {/* User Info */}
          {user && (
            <div className="alert alert-info mb-4">
              <div>
                <strong>User:</strong> {user.name} ({user.email})
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="alert alert-success mb-4">
              <span>{success}</span>
            </div>
          )}

          {/* Success Display */}
          {success && (
            <div className="alert alert-success mb-4">
              <span>{success}</span>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="alert alert-error mb-4">
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
                className="select select-bordered w-full"
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
                className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
                  id="private_key"
                  name="private_key"
                  placeholder="Enter your private key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  required={action === "import"}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full">
              {action === "create" ? "Create Wallet" : "Import Wallet"}
            </button>
          </form>

          <div className="divider my-8"></div>

          {/* Wallet List */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-base-content">
              Your Wallets
            </h3>
            <button
              className="btn btn-sm btn-outline"
              onClick={fetchWallets}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <ul className="space-y-4">
              {wallets.map((wallet) => (
                <li
                  key={wallet.walletAddress}
                  className="card bg-base-200 border border-base-300 rounded-lg"
                >
                  <div className="card-body p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-lg font-semibold text-primary">
                        {wallet.walletName}
                      </div>
                      <div className="flex gap-2">
                        <div
                          className={`badge ${
                            wallet.isActive ? "badge-success" : "badge-error"
                          }`}
                        >
                          {wallet.isActive ? "Active" : "Inactive"}
                        </div>
                        <div className="badge badge-outline">
                          {wallet.importMethod === "GENERATED"
                            ? "Generated"
                            : "Imported"}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-base-content/60 mb-1">
                      Address:
                    </div>
                    <div className="font-mono text-sm break-all text-primary mb-3">
                      {wallet.walletAddress}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-base-content/60 mb-1">
                          Created:
                        </div>
                        <div className="text-base-content/80">
                          {formatDate(wallet.createdAt)}
                        </div>
                      </div>
                      <div>
                        <div className="text-base-content/60 mb-1">
                          Last Used:
                        </div>
                        <div className="text-base-content/80">
                          {formatDate(wallet.lastUsedAt)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() =>
                          wallet.isActive
                            ? deactivateWallet(wallet.walletAddress)
                            : activateWallet(wallet.walletAddress)
                        }
                      >
                        {wallet.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        className="btn btn-xs btn-secondary"
                        onClick={() => setPrimaryWallet(wallet.walletAddress)}
                        disabled={wallet.isActive}
                      >
                        Set as Primary
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
