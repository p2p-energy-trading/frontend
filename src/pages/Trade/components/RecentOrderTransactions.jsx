import React, { useMemo } from "react";
import Datagrid from "../../../components/datagrid/Datagrid";
import { useAuth } from "../../../context/AuthContext";
import { EyeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const RecentOrderTransactions = ({
  orders,
  loading,
  cancelOrder,
  isCancellingOrder,
  metadata,
  onScopeChange,
  currentScope,
  currentStatus,
  currentLimit,
  onStatusChange,
  onLimitChange,
}) => {
  const { user } = useAuth();

  const tableHeaderData = useMemo(
    () => [
      { columnName: "Order ID", sort: false, filter: false },
      { columnName: "Wallet", sort: true, filter: false },
      { columnName: "Type", sort: true, filter: true },
      { columnName: "Amount (ETK)", sort: true, filter: false },
      { columnName: "Price (IDRS/ETK)", sort: true, filter: false },
      { columnName: "Status", sort: true, filter: false },
      { columnName: "Created", sort: true, filter: false },
      { columnName: "Placed Tx", sort: false, filter: false },
      { columnName: "Filled Tx", sort: false, filter: false },
      { columnName: "Cancelled Tx", sort: false, filter: false },
      { columnName: "Actions", sort: false, filter: false },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    // Check if an order can be cancelled
    const canCancelOrder = (order) => {
      // Order can be cancelled if:
      // 1. Status is OPEN or PARTIALLY_FILLED
      // 2. User owns the order (check wallet address)
      const isCancellableStatus =
        order.statusOnChain === "OPEN" ||
        order.statusOnChain === "PARTIALLY_FILLED";
      const isUserOrder = user?.wallets?.some(
        (wallet) => wallet.walletAddress === order.walletAddress
      );
      return isCancellableStatus && isUserOrder;
    };

    // Handle cancel order
    const handleCancelOrder = async (order) => {
      if (!cancelOrder) return;

      // Determine if it's a buy order (BID) or sell order (ASK)
      const isBuyOrder = order.orderType === "BID";

      try {
        await cancelOrder(order.orderId, isBuyOrder);
      } catch (error) {
        console.error("Error cancelling order:", error);
      }
    };

    return orders.map((order, index) => {
      const formatAmount = (amount) => {
        return new Intl.NumberFormat("id-ID", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }).format(parseFloat(amount));
      };

      const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(parseFloat(price));
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

      const formatTxHash = (txHash) => {
        if (!txHash) return "-";
        return {
          text: `${txHash.slice(0, 6)}...${txHash.slice(-4)}`,
          decorator: "link",
          href: `${
            import.meta.env.VITE_BLOCKCHAIN_EXPLORER_URL
          }/#section=explorer&widgetId=txn-detail&data="${txHash}"`,
          target: "_blank",
        };
      };

      const getStatusDecorator = (status) => {
        const statusMap = {
          OPEN: { type: "info", badge: true },
          FILLED: { type: "success", badge: true },
          PARTIALLY_FILLED: { type: "warning", badge: true },
          CANCELLED: { type: "error", badge: true },
        };

        return {
          text: status,
          decorator: {
            status: statusMap[status] || { type: "info", badge: true },
          },
        };
      };

      const getOrderTypeDecorator = (orderType) => {
        const orderTypeMap = {
          BID: { type: "success", badge: true },
          ASK: { type: "error", badge: true },
        };

        return {
          text: orderType,
          decorator: {
            status: orderTypeMap[orderType] || { type: "info", badge: true },
          },
        };
      };

      const formatWalletAddress = (walletAddress) => {
        if (!walletAddress) return "Unknown";
        if (currentScope === "own") {
          // For own scope, show if it's user's wallet
          // const isUserWallet = user?.wallets?.some(
          //   (wallet) => wallet.walletAddress === walletAddress
          // );
          return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
        }
        return `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
      };

      return [
        order.orderId || index + 1, // ID for row selection
        order.orderId,
        formatWalletAddress(order.walletAddress),
        getOrderTypeDecorator(order.orderType),
        formatAmount(order.amountEtk),
        formatPrice(order.priceIdrsPerEtk),
        getStatusDecorator(order.statusOnChain),
        formatDate(order.createdAtOnChain),
        formatTxHash(order.blockchainTxHashPlaced),
        formatTxHash(order.blockchainTxHashFilled),
        formatTxHash(order.blockchainTxHashCancelled),
        // Actions column - show cancel button for cancellable orders
        canCancelOrder(order)
          ? {
              text: "Cancel",
              decorator: "button",
              className: "btn btn-sm btn-error",
              onClick: () => handleCancelOrder(order),
              disabled: isCancellingOrder,
              loading: isCancellingOrder,
            }
          : "-",
      ];
    });
  }, [orders, isCancellingOrder, cancelOrder, user?.wallets, currentScope]);

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
        return "My Orders";
      case "public":
        return "Public Orders";
      default:
        return "My Orders";
    }
  };

  const getScopeDescription = (scope) => {
    switch (scope) {
      case "own":
        return "View your own order transactions";
      case "public":
        return "View public order transactions for transparency";
      default:
        return "View your own order transactions";
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
            <span className="hidden sm:inline">Status:</span>
            <span className="font-semibold">
              {currentStatus === "all" ? "All" : currentStatus}
            </span>
            <span className="divider divider-horizontal hidden sm:block"></span>
            <span className="hidden sm:inline">Limit:</span>
            <span className="font-semibold">{currentLimit}</span>
            <span className="divider divider-horizontal hidden sm:block"></span>
            <span className="hidden sm:inline">Showing:</span>
            <span className="font-semibold">{metadata.count}</span>
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-base-content/70 hidden sm:inline">
            Filter by:
          </span>
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-base-content/70">Status:</span>
            <select
              className="select select-sm select-bordered min-w-[120px]"
              value={currentStatus}
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="all">All</option>
              <option value="OPEN">Open</option>
              <option value="FILLED">Filled</option>
              <option value="PARTIALLY_FILLED">Partially Filled</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Limit Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-base-content/70">Limit:</span>
            <select
              className="select select-sm select-bordered w-20"
              value={currentLimit}
              onChange={(e) => onLimitChange(parseInt(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transparency Notice for Public Scope */}
      {currentScope === "public" && (
        <div className="alert alert-info">
          <GlobeAltIcon className="w-5 h-5" />
          <div>
            <div className="font-bold">Public Transparency View</div>
            <div className="text-sm">
              You are viewing public order transactions to promote transparency
              in the P2P energy trading network.
            </div>
          </div>
        </div>
      )}

      {/* Data Table */}
      {!orders || orders.length === 0 ? (
        <div className="text-center py-8 text-base-content/60">
          <div className="flex flex-col items-center gap-2">
            {getScopeIcon(currentScope)}
            <div>
              No order transactions available for{" "}
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

export default RecentOrderTransactions;
