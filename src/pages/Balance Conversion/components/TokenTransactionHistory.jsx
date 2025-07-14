import React, { useMemo } from "react";
import Datagrid from "../../../components/datagrid/Datagrid";
import { EyeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const TokenTransactionHistory = ({
  transactions,
  loading,
  metadata,
  onScopeChange,
  currentScope,
  currentTokenType,
}) => {
  const tableHeaderData = useMemo(
    () => [
      { columnName: "Type", sort: true, filter: true },
      { columnName: "Wallet", sort: true, filter: false },
      {
        columnName: `Amount (${currentTokenType || "Token"})`,
        sort: true,
        filter: false,
      },
      { columnName: "Date", sort: true, filter: false },
      { columnName: "TX Hash", sort: false, filter: false },
    ],
    [currentTokenType]
  );

  const tableData = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    return transactions.map((transaction, index) => {
      const formatAmount = (amount) => {
        return parseFloat(amount).toLocaleString("id-ID", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      };

      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("id-ID", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      const formatTxHash = (transaction) => {
        // Get hash from details first, then fallback to blockchainTxHash
        let txHash = null;
        if (transaction.details && transaction.details.txHash) {
          txHash = transaction.details.txHash;
        } else if (transaction.blockchainTxHash) {
          txHash = transaction.blockchainTxHash;
        }

        if (!txHash) return "-";

        return {
          text: `${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
          decorator: "link",
          href: `http://34.101.197.110:8999/#section=explorer&widgetId=txn-detail&data="${txHash}"`,
          target: "_blank",
        };
      };

      const getTypeDecorator = (type) => {
        const typeMap = {
          TOKEN_MINT: { type: "success", badge: true },
          TOKEN_BURN: { type: "error", badge: true },
        };

        const displayText =
          type === "TOKEN_MINT"
            ? "Mint"
            : type === "TOKEN_BURN"
            ? "Burn"
            : type;

        return {
          text: displayText,
          decorator: {
            status: typeMap[type] || { type: "info", badge: true },
          },
        };
      };

      const formatWalletAddress = (details) => {
        if (!details || !details.walletAddress) return "";
        // Show wallet address with anonymization (censoring) for privacy
        const address = details.walletAddress;
        return address.length > 12
          ? `${address.slice(0, 8)}...${address.slice(-4)}`
          : address;
      };

      return [
        transaction.logId || index + 1, // ID for row selection
        getTypeDecorator(transaction.transactionType),
        formatWalletAddress(transaction.details),
        formatAmount(transaction.amountPrimary),
        formatDate(transaction.transactionTimestamp),
        formatTxHash(transaction),
      ];
    });
  }, [transactions]);

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
        return "My Transactions";
      case "public":
        return "Public Transactions";
      default:
        return "My Transactions";
    }
  };

  const getScopeDescription = (scope) => {
    switch (scope) {
      case "own":
        return "View your own token transactions";
      case "public":
        return "View public token transactions for transparency";
      default:
        return "View your own token transactions";
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 border rounded"
          >
            <div className="skeleton h-4 w-16"></div>
            <div className="skeleton h-4 w-24"></div>
            <div className="skeleton h-4 w-12"></div>
            <div className="skeleton h-4 w-32"></div>
            <div className="skeleton h-4 w-20"></div>
          </div>
        ))}
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
            <span className="hidden sm:inline">Token:</span>
            <span className="font-semibold">{currentTokenType || "All"}</span>
            <span className="divider divider-horizontal hidden sm:block"></span>
            <span className="hidden sm:inline">Showing:</span>
            <span className="font-semibold">{transactions?.length || 0}</span>
            <span className="hidden sm:inline">transactions</span>
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
              You are viewing public token transactions to promote transparency
              in the P2P energy trading network.
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      {!transactions || transactions.length === 0 ? (
        <div className="text-center py-8 text-base-content/60">
          <div className="flex flex-col items-center gap-2">
            {getScopeIcon(currentScope)}
            <div>
              No token transactions found for{" "}
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

export default TokenTransactionHistory;
