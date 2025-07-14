import React, { useMemo } from "react";
import Datagrid from "../datagrid/Datagrid";
import { EyeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const RecentTransactions = ({
  recentTrades,
  loading,
  metadata,
  onScopeChange,
  currentScope,
}) => {
  const tableHeaderData = useMemo(
    () => [
      { columnName: "Time", sort: true, filter: false },
      { columnName: "Type", sort: true, filter: true },
      { columnName: "Amount (ETK)", sort: true, filter: false },
      { columnName: "Price (IDRS/ETK)", sort: true, filter: false },
      { columnName: "Total (IDRS)", sort: true, filter: false },
      { columnName: "Buyer", sort: false, filter: false },
      { columnName: "Seller", sort: false, filter: false },
      { columnName: "TX Hash", sort: false, filter: false },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (!recentTrades || recentTrades.length === 0) return [];

    return recentTrades.map((trade, index) => [
      trade.tradeId || index + 1, // ID for row selection
      new Date(trade.tradeTimestamp).toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      "TRADE", // Since this is a completed trade
      parseFloat(trade.tradedEtkAmount).toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }),
      parseFloat(trade.priceIdrsPerEtk).toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
      parseFloat(trade.totalIdrsValue).toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }),
      trade.buyerWalletAddress
        ? `${trade.buyerWalletAddress.slice(
            0,
            6
          )}...${trade.buyerWalletAddress.slice(-4)}`
        : "Unknown",
      trade.sellerWalletAddress
        ? `${trade.sellerWalletAddress.slice(
            0,
            6
          )}...${trade.sellerWalletAddress.slice(-4)}`
        : "Unknown",
      trade.blockchainTxHash
        ? {
            text: `${trade.blockchainTxHash.slice(
              0,
              6
            )}...${trade.blockchainTxHash.slice(-4)}`,
            decorator: "link",
            href: `${
              import.meta.env.VITE_BLOCKCHAIN_EXPLORER_URL
            }/#section=explorer&widgetId=txn-detail&data="${
              trade.blockchainTxHash
            }"`,
            target: "_blank",
          }
        : "-",
    ]);
  }, [recentTrades]);

  const getScopeIcon = (scope) => {
    switch (scope) {
      case "own":
        return <EyeIcon className="w-4 h-4" />;
      case "public":
        return <GlobeAltIcon className="w-4 h-4" />;
      default:
        return <EyeIcon className="w-4 h-4" />;
    }
  };

  const getScopeLabel = (scope) => {
    switch (scope) {
      case "own":
        return "My Trades";
      case "public":
        return "Public Trades";
      default:
        return "My Trades";
    }
  };

  const getScopeDescription = (scope) => {
    switch (scope) {
      case "own":
        return "View your own trade transactions";
      case "public":
        return "View public trade transactions for transparency";
      default:
        return "View your own trade transactions";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  const tableOptions = {
    numberOfRows: Math.max(1, tableData.length), // Dynamic height based on data
    pagination: false, // Disable pagination to show all rows
    itemsPerPage: false, // Hide items per page selector
    actionButtons: false, // Hide action buttons
    exportButton: true, // Keep export functionality
    search: true, // Show search since we're showing all data
  };

  return (
    <div className="space-y-4">
      {/* Scope Selector */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {["own", "public"].map((scope) => (
            <button
              key={scope}
              onClick={() => onScopeChange(scope)}
              className={`btn btn-sm ${
                currentScope === scope
                  ? "btn-primary"
                  : "btn-outline btn-primary"
              }`}
              title={getScopeDescription(scope)}
            >
              {getScopeIcon(scope)}
              <span className="hidden sm:inline">{getScopeLabel(scope)}</span>
            </button>
          ))}
        </div>

        {/* Metadata Display */}
        {metadata && (
          <div className="text-sm text-base-content/70 flex flex-wrap items-center gap-2">
            <span className="hidden sm:inline">Scope:</span>
            <span className="font-semibold">{getScopeLabel(currentScope)}</span>
            <span className="divider divider-horizontal hidden sm:block"></span>
            <span className="hidden sm:inline">Showing:</span>
            <span className="font-semibold">{metadata.count}</span>
            <span className="hidden sm:inline">of {metadata.limit} max</span>
          </div>
        )}
      </div>

      {/* Transparency Notice for Public Scope */}
      {currentScope === "public" && (
        <div className="alert alert-info">
          <GlobeAltIcon className="w-5 h-5" />
          <div>
            <div className="font-bold">Public Transparency View</div>
            <div className="text-sm">
              You are viewing public trade transactions to promote transparency
              in the P2P energy trading network.
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      {!recentTrades || recentTrades.length === 0 ? (
        <div className="text-center py-8 text-base-content/60">
          <div className="flex flex-col items-center gap-2">
            {getScopeIcon(currentScope)}
            <div>
              No trade transactions available for{" "}
              {getScopeLabel(currentScope).toLowerCase()}
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          <Datagrid
            tableData={tableData}
            tableHeaderData={tableHeaderData}
            tableOptions={tableOptions}
          />
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;
