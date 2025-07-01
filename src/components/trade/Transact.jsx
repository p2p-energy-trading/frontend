import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Transact = ({ placeOrder, isPlacingOrder, orderError }) => {
  const { user } = useAuth();
  const [action, setAction] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [validationError, setValidationError] = useState("");

  const userWallets = user?.wallets || [];

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

    const orderType = action === "buy" ? "BID" : "ASK";
    const result = await placeOrder(selectedWallet, orderType, amount, price);

    if (result.success) {
      // Reset form on success
      setAmount("");
      setPrice("");
      setAction(null);
      setSelectedWallet("");
    }
  };

  return (
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
          onChange={(e) => setSelectedWallet(e.target.value)}
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
          disabled={isPlacingOrder}
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
  );
};

export default Transact;
