import React, { useState } from "react";

const Wallet = () => {
  const [action, setAction] = useState("create");
  const [privateKey, setPrivateKey] = useState("");
  const [wallets, setWallets] = useState([
    {
      address: "0xA1B2C3D4",
      private_key: "priv_12345678",
    },
    {
      address: "0xE5F6G7H8",
      private_key: "priv_abcdefgh",
    },
  ]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
    if (e.target.value === "create") setPrivateKey("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "create") {
      setWallets([
        ...wallets,
        {
          address: "0x" + Math.random().toString(16).slice(2, 10),
          private_key: "priv_" + Math.random().toString(36).slice(2, 10),
        },
      ]);
    } else if (action === "import" && privateKey) {
      setWallets([
        ...wallets,
        {
          address: "0x" + Math.random().toString(16).slice(2, 10),
          private_key: privateKey,
        },
      ]);
    }
    setPrivateKey("");
    setAction("create");
  };

  return (
    <div className="w-full">
      <div className="card bg-base-100 border-2 border-base-300 rounded-xl shadow">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold mb-4 text-primary">Wallets</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="action" className="block text-sm font-medium mb-1">
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
            {action === "import" && (
              <div>
                <label htmlFor="private_key" className="block text-sm font-medium mb-1">
                  Private Key
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  id="private_key"
                  name="private_key"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  required={action === "import"}
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
          <div className="divider my-8"></div>
          <h3 className="text-xl font-semibold mb-4 text-base-content">Your Wallets</h3>
          <ul className="space-y-4">
            {wallets.map((wallet, idx) => (
              <li
                key={idx}
                className="card bg-base-200 border border-base-300 rounded-lg"
              >
                <div className="card-body p-4">
                  <div className="text-xs text-base-content/60 mb-1">Address:</div>
                  <div className="font-mono text-sm break-all text-primary mb-2">
                    {wallet.address}
                  </div>
                  <div className="text-xs text-base-content/60 mb-1">Private Key:</div>
                  <div className="font-mono text-xs break-all text-base-content/80">
                    {wallet.private_key}
                  </div>
                </div>
              </li>
            ))}
            {wallets.length === 0 && (
              <li className="text-base-content/60 text-sm">No wallets yet.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wallet;