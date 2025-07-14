import React, { useMemo } from "react";
import Datagrid from "../../../components/datagrid/Datagrid";

const OrderBookDetailed = ({
  orderbookDetailed,
  loading,
  cancelOrder,
  isCancellingOrder,
  user,
}) => {
  const buyOrdersHeaderData = useMemo(
    () => [
      { columnName: "Order ID", sort: false, filter: false },
      { columnName: "Type", sort: true, filter: true },
      { columnName: "Amount (ETK)", sort: true, filter: false },
      { columnName: "Price (IDRS/ETK)", sort: true, filter: false },
      { columnName: "Total (IDRS)", sort: true, filter: false },
      { columnName: "Status", sort: true, filter: true },
      { columnName: "Created", sort: true, filter: false },
      { columnName: "Actions", sort: false, filter: false },
    ],
    []
  );

  const sellOrdersHeaderData = useMemo(
    () => [
      { columnName: "Order ID", sort: false, filter: false },
      { columnName: "Type", sort: true, filter: true },
      { columnName: "Amount (ETK)", sort: true, filter: false },
      { columnName: "Price (IDRS/ETK)", sort: true, filter: false },
      { columnName: "Total (IDRS)", sort: true, filter: false },
      { columnName: "Status", sort: true, filter: true },
      { columnName: "Created", sort: true, filter: false },
      { columnName: "Actions", sort: false, filter: false },
    ],
    []
  );

  const buyOrdersData = useMemo(() => {
    const processOrderData = (orders, isBuyOrder) => {
      if (!orders || orders.length === 0) return [];

      return orders.map((order) => [
        order.orderId, // Row ID
        order.orderId,
        order.orderType,
        parseFloat(order.amountEtk).toLocaleString("id-ID", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }),
        parseFloat(order.priceIdrsPerEtk).toLocaleString("id-ID", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
        parseFloat(order.totalIdrsValue).toLocaleString("id-ID", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
        {
          text: order.statusOnChain,
          level:
            order.statusOnChain === "OPEN"
              ? 2
              : order.statusOnChain === "FILLED"
              ? 3
              : 1,
          decorator: {
            status: {
              type:
                order.statusOnChain === "OPEN"
                  ? "info"
                  : order.statusOnChain === "FILLED"
                  ? "success"
                  : "warning",
              badge: true,
            },
          },
        },
        new Date(order.createdAtOnChain).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        user?.wallets?.some(
          (wallet) => wallet.walletAddress === order.walletAddress
        ) && order.statusOnChain === "OPEN" ? (
          <button
            className="btn btn-sm btn-error"
            onClick={() => cancelOrder(order.orderId, isBuyOrder)}
            disabled={isCancellingOrder}
          >
            {isCancellingOrder ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Cancel"
            )}
          </button>
        ) : (
          "-"
        ),
      ]);
    };

    return processOrderData(orderbookDetailed?.buyOrders, true);
  }, [orderbookDetailed?.buyOrders, isCancellingOrder, user, cancelOrder]);

  const sellOrdersData = useMemo(() => {
    const processOrderData = (orders, isBuyOrder) => {
      if (!orders || orders.length === 0) return [];

      return orders.map((order) => [
        order.orderId, // Row ID
        order.orderId,
        order.orderType,
        parseFloat(order.amountEtk).toLocaleString("id-ID", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }),
        parseFloat(order.priceIdrsPerEtk).toLocaleString("id-ID", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
        parseFloat(order.totalIdrsValue).toLocaleString("id-ID", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }),
        {
          text: order.statusOnChain,
          level:
            order.statusOnChain === "OPEN"
              ? 2
              : order.statusOnChain === "FILLED"
              ? 3
              : 1,
          decorator: {
            status: {
              type:
                order.statusOnChain === "OPEN"
                  ? "info"
                  : order.statusOnChain === "FILLED"
                  ? "success"
                  : "warning",
              badge: true,
            },
          },
        },
        new Date(order.createdAtOnChain).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        user?.wallets?.some(
          (wallet) => wallet.walletAddress === order.walletAddress
        ) && order.statusOnChain === "OPEN" ? (
          <button
            className="btn btn-sm btn-error"
            onClick={() => cancelOrder(order.orderId, isBuyOrder)}
            disabled={isCancellingOrder}
          >
            {isCancellingOrder ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Cancel"
            )}
          </button>
        ) : (
          "-"
        ),
      ]);
    };

    return processOrderData(orderbookDetailed?.sellOrders, false);
  }, [orderbookDetailed?.sellOrders, isCancellingOrder, user, cancelOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (!orderbookDetailed) {
    return (
      <div className="text-center py-8 text-base-content/60">
        No detailed orderbook data available
      </div>
    );
  }

  const buyOrdersTableOptions = {
    numberOfRows: Math.max(1, buyOrdersData.length), // Dynamic height based on data
    pagination: false, // Disable pagination to show all rows
    itemsPerPage: false, // Hide items per page selector
    actionButtons: false, // Hide action buttons
    exportButton: true, // Keep export functionality
    search: false, // Hide search since we're showing all data
  };

  const sellOrdersTableOptions = {
    numberOfRows: Math.max(1, sellOrdersData.length), // Dynamic height based on data
    pagination: false, // Disable pagination to show all rows
    itemsPerPage: false, // Hide items per page selector
    actionButtons: false, // Hide action buttons
    exportButton: true, // Keep export functionality
    search: false, // Hide search since we're showing all data
  };

  return (
    <div className="space-y-6">
      {/* Buy Orders (Bids) */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-success flex items-center gap-2">
          📈 Buy Orders (Bids)
          <span className="badge badge-success badge-sm">
            {buyOrdersData.length}
          </span>
        </h3>
        {buyOrdersData.length > 0 ? (
          <Datagrid
            tableData={buyOrdersData}
            tableHeaderData={buyOrdersHeaderData}
            tableOptions={buyOrdersTableOptions}
          />
        ) : (
          <div className="text-center py-4 text-base-content/60 bg-base-200 rounded-lg">
            No buy orders available
          </div>
        )}
      </div>

      {/* Sell Orders (Asks) */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-error flex items-center gap-2">
          📉 Sell Orders (Asks)
          <span className="badge badge-error badge-sm">
            {sellOrdersData.length}
          </span>
        </h3>
        {sellOrdersData.length > 0 ? (
          <Datagrid
            tableData={sellOrdersData}
            tableHeaderData={sellOrdersHeaderData}
            tableOptions={sellOrdersTableOptions}
          />
        ) : (
          <div className="text-center py-4 text-base-content/60 bg-base-200 rounded-lg">
            No sell orders available
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBookDetailed;
