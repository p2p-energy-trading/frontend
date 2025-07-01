import React, { useContext, useEffect, useState } from "react";
import ChartPrice from "../../components/trade/ChartPrice";
import { AppContext } from "../../context/context";
import {
  colorsInDarkMode,
  colorsInLightMode,
  initialData,
} from "./helper/tradeUtils";
import OrderBook from "../../components/trade/OrderBook";
import Transact from "../../components/trade/Transact";
import RecentTransactions from "../../components/trade/RecentTransactions";
import MarketStats from "./components/MarketStats";
import OrderBookDetailed from "./components/OrderBookDetailed";
import useTradingApi from "./hooks/useTradingApi";
import { useAuth } from "../../context/AuthContext";
import {
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ClipboardDocumentListIcon,
  ReceiptRefundIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const Trade = () => {
  const [colors, setColors] = useState({});
  const [showDetailedOrderbook, setShowDetailedOrderbook] = useState(false);
  const context = useContext(AppContext);
  const { user } = useAuth();

  const {
    recentTrades,
    orderbook,
    orderbookDetailed,
    marketStats,
    placeOrder,
    cancelOrder,
    refreshAllData,
    loading,
    error,
    isPlacingOrder,
    orderError,
    isCancellingOrder,
    cancelError,
  } = useTradingApi();

  useEffect(() => {
    console.log("context in trade: ", context);
    if (context.theme) {
      setColors(colorsInLightMode);
    } else {
      setColors(colorsInDarkMode);
    }
  }, [context]);

  return (
    <div className="space-y-6 w-full">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Energy Trading Market</h1>
        <button
          className="btn btn-sm btn-outline"
          onClick={refreshAllData}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      {/* Market Statistics */}
      <div className="card card-border bg-base-100 border-base-300 border-2">
        <div className="card-body">
          <h2 className="card-title flex items-center gap-2">
            <ChartBarIcon className="size-5 text-primary" />
            Market Statistics
          </h2>
          <MarketStats marketStats={marketStats} loading={loading} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {/* Market Price Chart */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <ArrowTrendingUpIcon className="size-5 text-primary" />
              Market Price Chart
              <div className="badge badge-warning">Using Sample Data</div>
            </h2>
            <ChartPrice data={initialData} colors={colors} />
          </div>
        </div>

        {/* Order Book */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-1 xl:col-span-1">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <ClipboardDocumentListIcon className="size-5 text-primary" />
              Order Book
            </h2>
            <OrderBook orderbook={orderbook} loading={loading} />
          </div>
        </div>

        {/* Trading Interface */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-1 xl:col-span-2">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <BanknotesIcon className="size-5 text-primary" />
              Place Order
            </h2>
            <Transact
              placeOrder={placeOrder}
              isPlacingOrder={isPlacingOrder}
              orderError={orderError}
            />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <ReceiptRefundIcon className="size-5 text-primary" />
              Recent Transactions
            </h2>
            <RecentTransactions recentTrades={recentTrades} loading={loading} />
          </div>
        </div>

        {/* Detailed Order Book */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="card-title flex items-center gap-2">
                <DocumentTextIcon className="size-5 text-primary" />
                Detailed Order Book
              </h2>
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setShowDetailedOrderbook(!showDetailedOrderbook)}
              >
                {showDetailedOrderbook ? "Hide" : "Show"} Details
              </button>
            </div>

            {showDetailedOrderbook && (
              <>
                {cancelError && (
                  <div className="alert alert-error alert-sm mb-4">
                    <span>{cancelError}</span>
                  </div>
                )}
                <OrderBookDetailed
                  orderbookDetailed={orderbookDetailed}
                  loading={loading}
                  cancelOrder={cancelOrder}
                  isCancellingOrder={isCancellingOrder}
                  user={user}
                />
              </>
            )}

            {!showDetailedOrderbook && (
              <div className="text-center py-8 text-base-content/60">
                Click "Show Details" to view complete order book with cancel
                functionality
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trade;
