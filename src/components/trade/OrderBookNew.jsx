import React from "react";

function formatNumber(num) {
  return num?.toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

const OrderBook = ({ orderbook, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (!orderbook) {
    return (
      <div className="text-center py-8 text-base-content/60">
        No orderbook data available
      </div>
    );
  }

  const { buyOrders = [], sellOrders = [], summary } = orderbook;
  const maxRows = 8;

  // Sort orders - sell orders descending (highest first), buy orders descending (highest first)
  const sortedSellOrders = [...sellOrders]
    .sort((a, b) => b.priceIdrsPerEtk - a.priceIdrsPerEtk)
    .slice(0, maxRows);
  const sortedBuyOrders = [...buyOrders]
    .sort((a, b) => b.priceIdrsPerEtk - a.priceIdrsPerEtk)
    .slice(0, maxRows);

  const maxSellAmount = Math.max(
    ...sortedSellOrders.map((o) => o.totalAmountEtk),
    1
  );
  const maxBuyAmount = Math.max(
    ...sortedBuyOrders.map((o) => o.totalAmountEtk),
    1
  );

  // Calculate mid price
  const midPrice =
    summary?.bestBidPrice && summary?.bestAskPrice
      ? (summary.bestBidPrice + summary.bestAskPrice) / 2
      : null;

  return (
    <>
      <div className="flex flex-col text-xs font-mono h-full justify-center">
        {/* Header */}
        <div className="flex font-bold text-base-content/70 border-b-2 border-base-300 pb-1 mb-1">
          <div className="w-1/6 text-left">Amount</div>
          <div className="w-2/3 text-center">Price (IDRS/ETK)</div>
          <div className="w-1/6 text-right">Amount</div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          {/* Sell Orders (descending by price) */}
          <div className="flex flex-col-reverse justify-center">
            {Array.from({ length: maxRows }).map((_, i) => {
              const order = sortedSellOrders[i];
              if (!order) {
                return (
                  <div
                    key={`sell-empty-${i}`}
                    className="flex items-center group"
                  >
                    <div className="w-1/6 text-left base-content">-</div>
                    <div className="w-2/3 text-center base-content bg-base-200 opacity-80">
                      -
                    </div>
                    <div className="w-1/6 text-right base-content">-</div>
                  </div>
                );
              }
              const width = (order.totalAmountEtk / maxSellAmount) * 100;
              return (
                <div
                  key={`sell-${i}`}
                  className="flex items-center group relative"
                >
                  <div className="w-1/6 text-left base-content">-</div>
                  <div className="w-2/3 text-center text-error relative">
                    <span className="absolute right-0 top-0 h-full w-full bg-base-200 opacity-80 rounded"></span>
                    <span
                      className="absolute right-0 top-0 h-full bg-error/20 opacity-60 rounded"
                      style={{ width: width + "%" }}
                    ></span>
                    <span className="relative z-10">
                      {formatNumber(order.priceIdrsPerEtk)}
                    </span>
                  </div>
                  <div className="w-1/6 text-right text-error">
                    {formatNumber(order.totalAmountEtk)}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Mid Price Row */}
          <div className="flex items-center my-1 justify-center">
            <div className="w-1/6"></div>
            <div className="w-2/3 text-center text-xs text-base-content/60 bg-base-200 rounded py-0.5">
              Mid: {midPrice ? formatNumber(midPrice) : "-"}
            </div>
            <div className="w-1/6"></div>
          </div>
          {/* Buy Orders (descending by price) */}
          <div className="flex flex-col justify-center">
            {Array.from({ length: maxRows }).map((_, i) => {
              const order = sortedBuyOrders[i];
              if (!order) {
                return (
                  <div
                    key={`buy-empty-${i}`}
                    className="flex items-center group"
                  >
                    <div className="w-1/6 text-left base-content">-</div>
                    <div className="w-2/3 text-center base-content bg-base-200 opacity-80">
                      -
                    </div>
                    <div className="w-1/6 text-right base-content">-</div>
                  </div>
                );
              }
              const width = (order.totalAmountEtk / maxBuyAmount) * 100;
              return (
                <div
                  key={`buy-${i}`}
                  className="flex items-center group relative"
                >
                  <div className="w-1/6 text-left text-success">
                    {formatNumber(order.totalAmountEtk)}
                  </div>
                  <div className="w-2/3 text-center text-success relative">
                    <span className="absolute left-0 top-0 h-full w-full bg-base-200 opacity-80 rounded"></span>
                    <span
                      className="absolute left-0 top-0 h-full bg-success/20 opacity-60 rounded"
                      style={{ width: width + "%" }}
                    ></span>
                    <span className="relative z-10">
                      {formatNumber(order.priceIdrsPerEtk)}
                    </span>
                  </div>
                  <div className="w-1/6 text-right base-content">-</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Orderbook Summary */}
      {summary && (
        <div className="mt-4 p-3 bg-base-200 rounded-lg">
          <div className="text-xs text-base-content/70 space-y-1">
            <div className="flex justify-between">
              <span>Spread:</span>
              <span className="font-mono">
                {formatNumber(summary.spread)} (
                {summary.spreadPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span>Buy Volume:</span>
              <span className="font-mono text-success">
                {formatNumber(summary.totalBuyVolume)} ETK
              </span>
            </div>
            <div className="flex justify-between">
              <span>Sell Volume:</span>
              <span className="font-mono text-error">
                {formatNumber(summary.totalSellVolume)} ETK
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderBook;
