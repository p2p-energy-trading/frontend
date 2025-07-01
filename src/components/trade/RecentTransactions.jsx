import React, { useMemo } from "react";
import Datagrid from "../datagrid/Datagrid";

const RecentTransactions = ({ recentTrades, loading }) => {
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
      `${trade.buyerWalletAddress.slice(
        0,
        6
      )}...${trade.buyerWalletAddress.slice(-4)}`,
      `${trade.sellerWalletAddress.slice(
        0,
        6
      )}...${trade.sellerWalletAddress.slice(-4)}`,
      trade.blockchainTxHash
        ? {
            text: `${trade.blockchainTxHash.slice(
              0,
              6
            )}...${trade.blockchainTxHash.slice(-4)}`,
            decorator: "link",
          }
        : "-",
    ]);
  }, [recentTrades]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (!recentTrades || recentTrades.length === 0) {
    return (
      <div className="text-center py-8 text-base-content/60">
        No recent trades available
      </div>
    );
  }

  return (
    <Datagrid
      tableData={tableData}
      tableHeaderData={tableHeaderData}
      itemsPerPageOptions={[5, 10, 20]}
      defaultItemsPerPage={10}
    />
  );
};

export default RecentTransactions;
