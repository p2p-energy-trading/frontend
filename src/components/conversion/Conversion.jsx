import React, { useState } from 'react'

const dummyWallets = [
  { address: '0xABC123...', etk_balance: 12.5, idrs_balance: 20000 },
  { address: '0xDEF456...', etk_balance: 3.75, idrs_balance: 8000 },
  { address: '0xGHI789...', etk_balance: 0.0, idrs_balance: 1000 },
];

const Conversion = ({ first_change, second_change, rate, balanceKey }) => {
  const [tab, setTab] = useState('deposit');
  const [walletIdx, setWalletIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [balance, setBalance] = useState(dummyWallets[walletIdx][balanceKey]);

  // Simulasi refresh saldo
  const refreshBalance = () => {
    setLoading(true);
    setTimeout(() => {
      setBalance(dummyWallets[walletIdx][balanceKey]);
      setLoading(false);
    }, 1000);
  };

  // Ganti wallet
  const handleWalletChange = (e) => {
    const idx = e.target.selectedIndex - 1;
    setWalletIdx(idx);
    setBalance(dummyWallets[idx]?.[balanceKey] ?? 0);
    setResult('');
  };

  // Deposit KWH → ETK
  const handleDeposit = (e) => {
    e.preventDefault();
    if (!depositAmount || Number(depositAmount) <= 0) return;
    setResult(`✅ Minted ${(Number(depositAmount) * rate).toFixed(2)} ${first_change} for ${depositAmount} ${second_change} (rate 1 ${second_change} = ${rate} ${first_change})`);
    setDepositAmount('');
  };

  // Withdraw ETK → KWH
  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!withdrawAmount || Number(withdrawAmount) <= 0) return;
    setResult(`✅ Burned ${withdrawAmount} ${first_change} for ${(Number(withdrawAmount) / rate).toFixed(2)} ${second_change} (rate ${rate} ${first_change} = 1 ${second_change})`);
    setWithdrawAmount('');
  };

  return (
    <>

      <p className="text-base-content/60 mb-2">
        Withdraw <span className="font-mono">{first_change}</span> &rarr; <span className="font-mono">{second_change}</span> / Deposit <span className="font-mono">{second_change}</span> &rarr; <span className="font-mono">{first_change}</span>
      </p>
      {/* Wallet selector */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-base-content mb-1">Wallet</label>
        <select
          className="select select-bordered w-full"
          value={walletIdx}
          onChange={handleWalletChange}
        >
          <option disabled>Pilih wallet</option>
          {dummyWallets.map((w, i) => (
            <option key={w.address} value={i}>
              {w.address}
            </option>
          ))}
        </select>
      </div>
      {/* ETK Balance & Refresh */}
      <div className="mb-6 flex items-center gap-4">
        <div className="bg-base-200 rounded-lg px-4 py-2 flex flex-col items-center">
          <span className="text-xs text-base-content/60">Your {first_change} Balance</span>
          <span className="font-bold text-primary text-lg font-mono" id="energy-balance">
            {loading
              ? <span className="loading loading-spinner loading-xs"></span>
              : balance.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <button
          className="btn btn-xs btn-outline btn-primary ml-2"
          type="button"
          onClick={refreshBalance}
          disabled={loading}
        >
          Refresh
        </button>
      </div>
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`flex-1 py-2 text-center font-semibold border-b-2 transition-all ${tab === 'deposit' ? 'border-primary text-primary' : 'border-transparent text-base-content/60 hover:text-primary'}`}
          type="button"
          onClick={() => { setTab('deposit'); setResult(''); }}
        >
          Deposit
        </button>
        <button
          className={`flex-1 py-2 text-center font-semibold border-b-2 transition-all ${tab === 'withdraw' ? 'border-primary text-primary' : 'border-transparent text-base-content/60 hover:text-primary'}`}
          type="button"
          onClick={() => { setTab('withdraw'); setResult(''); }}
        >
          Withdraw
        </button>
      </div>
      {/* Deposit Panel */}
      {tab === 'deposit' && (
        <form className="space-y-4" onSubmit={handleDeposit}>
          <div>
            <label className="block font-medium mb-1">Amount ({second_change})</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="input input-bordered w-full"
              required
              placeholder="e.g. 1.00"
              value={depositAmount}
              onChange={e => setDepositAmount(e.target.value)}
            />
            <div className="text-xs text-base-content/60 mt-1">
              Receive: <span className="font-mono">{depositAmount ? (Number(depositAmount) * rate).toFixed(2) : '0.00'} {first_change}</span> (rate 1 {second_change} = {rate} {first_change})
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary"
          >
            Deposit (Mint {first_change})
          </button>
        </form>
      )}
      {/* Withdraw Panel */}
      {tab === 'withdraw' && (
        <form className="space-y-4" onSubmit={handleWithdraw}>
          <div>
            <label className="block font-medium mb-1">Amount ({first_change})</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="input input-bordered w-full"
              required
              placeholder="e.g. 1.00"
              value={withdrawAmount}
              onChange={e => setWithdrawAmount(e.target.value)}
            />
            <div className="text-xs text-base-content/60 mt-1">
              Receive: <span className="font-mono">{withdrawAmount ? (Number(withdrawAmount) / rate).toFixed(2) : '0.00'} {second_change}</span> (rate {rate} {first_change} = 1 {second_change})
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn btn-primary"
          >
            Withdraw (Burn {first_change})
          </button>
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
        <div>⚡️ Conversion fee: <span className="font-mono">0.5%</span> | Est. block time: <span className="font-mono">~5s</span></div>
        <div>🔒 All transactions are secured and auditable.</div>
      </div>
    </>
  )
}

export default Conversion