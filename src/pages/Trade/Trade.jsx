import React, { useContext, useEffect, useState } from "react";
import ChartPrice from "../../components/trade/ChartPrice";
import { AppContext } from "../../context/context";
import { colorsInDarkMode, colorsInLightMode } from "./helper/tradeUtils";
import OrderBook from "../../components/trade/OrderBook";
import Transact from "../../components/trade/Transact";
import RecentTransactions from "../../components/trade/RecentTransactions";
import RecentOrderTransactions from "./components/RecentOrderTransactions";
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
  const [selectedInterval, setSelectedInterval] = useState("1s");

  // State for scope management
  const [tradesScope, setTradesScope] = useState("own");
  const [ordersScope, setOrdersScope] = useState("own");
  const [tradesLimit, setTradesLimit] = useState(50);
  const [ordersLimit, setOrdersLimit] = useState(50);
  const [ordersStatus, setOrdersStatus] = useState("all");

  const context = useContext(AppContext);
  const { user } = useAuth();

  const {
    orders,
    recentTrades,
    orderbook,
    orderbookDetailed,
    marketStats,
    priceHistory,
    tradesMetadata,
    ordersMetadata,
    placeOrder,
    cancelOrder,
    refreshAllData,
    fetchPriceHistory,
    fetchRecentTrades,
    fetchOrders,
    loading,
    error,
    isPlacingOrder,
    orderError,
    isCancellingOrder,
    cancelError,
  } = useTradingApi();

  // Handle scope changes
  const handleTradesScopeChange = (newScope) => {
    // Ensure scope is valid
    const validScope = ["own", "public"].includes(newScope) ? newScope : "own";
    setTradesScope(validScope);
    fetchRecentTrades(validScope, tradesLimit);
  };

  const handleOrdersScopeChange = (newScope) => {
    // Ensure scope is valid
    const validScope = ["own", "public"].includes(newScope) ? newScope : "own";
    setOrdersScope(validScope);
    fetchOrders(
      validScope,
      ordersStatus === "all" ? null : ordersStatus,
      ordersLimit
    );
  };

  const handleTradesLimitChange = (newLimit) => {
    setTradesLimit(newLimit);
    fetchRecentTrades(tradesScope, newLimit);
  };

  const handleOrdersLimitChange = (newLimit) => {
    setOrdersLimit(newLimit);
    fetchOrders(
      ordersScope,
      ordersStatus === "all" ? null : ordersStatus,
      newLimit
    );
  };

  const handleOrdersStatusChange = (newStatus) => {
    setOrdersStatus(newStatus);
    fetchOrders(
      ordersScope,
      newStatus === "all" ? null : newStatus,
      ordersLimit
    );
  };

  useEffect(() => {
    // console.log("context in trade: ", context);
    if (context.theme) {
      setColors(colorsInLightMode);
    } else {
      setColors(colorsInDarkMode);
    }
  }, [context]);

  // Auto-refresh price history based on selected interval
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchPriceHistory(selectedInterval);

    // Set up interval-based refresh
    const getIntervalMs = (interval) => {
      switch (interval) {
        case "1s":
          return 1000;
        case "1m":
          return 60000;
        case "5m":
          return 300000;
        case "1h":
          return 3600000;
        default:
          return 1000;
      }
    };

    const refreshInterval = setInterval(() => {
      fetchPriceHistory(selectedInterval);
    }, getIntervalMs(selectedInterval));

    return () => clearInterval(refreshInterval);
  }, [user, selectedInterval, fetchPriceHistory]);

  // Handle interval change
  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  // Transform price history data for chart
  const transformPriceHistoryData = (data) => {
    if (!data || !Array.isArray(data)) return [];

    const transformed = data
      .map((item) => {
        // Handle different timestamp formats
        let time = item.timestamp || item.time;

        // Convert ISO string to Unix timestamp (seconds)
        if (typeof time === "string") {
          time = Math.floor(new Date(time).getTime() / 1000);
        } else if (typeof time === "number" && time > 1000000000000) {
          // Convert milliseconds to seconds if needed
          time = Math.floor(time / 1000);
        }

        return {
          time: time,
          value: parseFloat(item.price || item.close || item.value || 0),
        };
      })
      .filter((item) => item.time && !isNaN(item.value) && !isNaN(item.time)); // Filter out invalid entries

    // console.log("Transformed chart data:", transformed.slice(0, 3));
    return transformed;
  };

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
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="stat">
                  <div className="skeleton h-4 w-24 mb-2"></div>
                  <div className="skeleton h-8 w-16"></div>
                </div>
              ))}
            </div>
          ) : (
            <MarketStats marketStats={marketStats} loading={loading} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {/* Market Price Chart */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="card-title flex items-center gap-2">
                <ArrowTrendingUpIcon className="size-5 text-primary" />
                Market Price Chart
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/70">Interval:</span>
                <select
                  className="select select-sm select-bordered"
                  value={selectedInterval}
                  onChange={(e) => handleIntervalChange(e.target.value)}
                >
                  <option value="1s">1 Second</option>
                  <option value="1m">1 Minute</option>
                  <option value="5m">5 Minutes</option>
                  <option value="1h">1 Hour</option>
                </select>
              </div>
            </div>
            {loading ? (
              <div className="skeleton h-64 w-full"></div>
            ) : transformPriceHistoryData(priceHistory).length > 0 ? (
              <ChartPrice
                data={transformPriceHistoryData(priceHistory)}
                colors={colors}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-base-content/60">
                <div className="text-center">
                  <div className="text-lg font-medium mb-2">
                    No Price Data Available
                  </div>
                  <div className="text-sm">
                    Waiting for market data for {selectedInterval} interval...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Order Book */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-1 xl:col-span-1">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <ClipboardDocumentListIcon className="size-5 text-primary" />
              Order Book
            </h2>
            {loading ? (
              <div className="space-y-2">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-5/6"></div>
                <div className="skeleton h-4 w-2/3"></div>
                <div className="skeleton h-4 w-4/5"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-3/4"></div>
                <div className="skeleton h-4 w-5/6"></div>
              </div>
            ) : (
              <OrderBook orderbook={orderbook} loading={loading} />
            )}
          </div>
        </div>
        {/* Trading Interface */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-1 xl:col-span-2">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <BanknotesIcon className="size-5 text-primary" />
              Place Order
            </h2>
            {loading ? (
              <div className="space-y-4">
                {/* Wallet Selection Skeleton */}
                <div>
                  <div className="skeleton h-4 w-16 mb-2"></div>
                  <div className="skeleton h-10 w-full"></div>
                </div>

                {/* Balance Display Skeleton */}
                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="skeleton h-4 w-24"></div>
                      <div className="skeleton h-6 w-12"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center justify-between">
                        <div className="skeleton h-3 w-8"></div>
                        <div className="skeleton h-3 w-12"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="skeleton h-3 w-10"></div>
                        <div className="skeleton h-3 w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons Skeleton */}
                <div>
                  <div className="skeleton h-4 w-12 mb-2"></div>
                  <div className="flex gap-2">
                    <div className="skeleton h-10 flex-1"></div>
                    <div className="skeleton h-10 flex-1"></div>
                  </div>
                </div>

                {/* Amount and Price Skeleton */}
                <div className="skeleton h-10 w-full"></div>
                <div className="skeleton h-10 w-full"></div>

                {/* Calculator Skeleton */}
                <div className="card bg-base-200 border border-base-300">
                  <div className="card-body p-3">
                    <div className="skeleton h-4 w-20 mb-2"></div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <div className="skeleton h-3 w-16"></div>
                        <div className="skeleton h-3 w-20"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="skeleton h-3 w-18"></div>
                        <div className="skeleton h-3 w-20"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button Skeleton */}
                <div className="flex justify-end">
                  <div className="skeleton h-12 w-32"></div>
                </div>
              </div>
            ) : (
              <Transact
                placeOrder={placeOrder}
                isPlacingOrder={isPlacingOrder}
                orderError={orderError}
              />
            )}
          </div>
        </div>{" "}
        {/* Recent Trade Transactions */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="card-title flex items-center gap-2">
                <ReceiptRefundIcon className="size-5 text-primary" />
                Recent Trade Transactions
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {/* Limit Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-base-content/70 hidden sm:inline">
                    Show:
                  </span>
                  <select
                    className="select select-sm select-bordered w-20"
                    value={tradesLimit}
                    onChange={(e) =>
                      handleTradesLimitChange(parseInt(e.target.value))
                    }
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => fetchRecentTrades(tradesScope, tradesLimit)}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Refresh"
                  )}
                </button>
              </div>
            </div>
            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-4 w-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <RecentTransactions
                recentTrades={recentTrades}
                loading={loading}
                metadata={tradesMetadata}
                currentScope={tradesScope}
                onScopeChange={handleTradesScopeChange}
              />
            )}
          </div>
        </div>
        {/* Recent Place Order Transactions */}
        <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
          <div className="card-body">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <h2 className="card-title flex items-center gap-2">
                <DocumentTextIcon className="size-5 text-primary" />
                Recent Place Order Transactions
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() =>
                    fetchOrders(
                      ordersScope,
                      ordersStatus === "all" ? null : ordersStatus,
                      ordersLimit
                    )
                  }
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Refresh"
                  )}
                </button>
              </div>
            </div>
            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border rounded"
                  >
                    <div className="skeleton h-4 w-16"></div>
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-24"></div>
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-16"></div>
                  </div>
                ))}
              </div>
            ) : (
              <RecentOrderTransactions
                orders={orders}
                loading={loading}
                cancelOrder={cancelOrder}
                isCancellingOrder={isCancellingOrder}
                metadata={ordersMetadata}
                currentScope={ordersScope}
                currentStatus={ordersStatus}
                currentLimit={ordersLimit}
                onScopeChange={handleOrdersScopeChange}
                onStatusChange={handleOrdersStatusChange}
                onLimitChange={handleOrdersLimitChange}
              />
            )}
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
                {loading ? (
                  <div className="space-y-2">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border rounded"
                      >
                        <div className="skeleton h-4 w-16"></div>
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-24"></div>
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-8 w-16"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <OrderBookDetailed
                    orderbookDetailed={orderbookDetailed}
                    loading={loading}
                    cancelOrder={cancelOrder}
                    isCancellingOrder={isCancellingOrder}
                    user={user}
                  />
                )}
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
