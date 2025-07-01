import React from "react";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ScaleIcon,
} from "@heroicons/react/24/outline";

const MarketStats = ({ marketStats, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (!marketStats) {
    return (
      <div className="text-center py-8 text-base-content/60">
        No market data available
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(volume);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Last Price */}
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-figure text-primary">
          <CurrencyDollarIcon className="w-8 h-8" />
        </div>
        <div className="stat-title text-xs">Last Price</div>
        <div className="stat-value text-lg text-primary">
          {formatPrice(marketStats.lastPrice)}
        </div>
        <div className="stat-desc text-xs">IDRS per ETK</div>
      </div>

      {/* Current Market Price */}
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-figure text-secondary">
          <ArrowTrendingUpIcon className="w-8 h-8" />
        </div>
        <div className="stat-title text-xs">Market Price</div>
        <div className="stat-value text-lg text-secondary">
          {formatPrice(marketStats.currentMarketPrice)}
        </div>
        <div className="stat-desc text-xs">IDRS per ETK</div>
      </div>

      {/* 24h Volume */}
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-figure text-accent">
          <ChartBarIcon className="w-8 h-8" />
        </div>
        <div className="stat-title text-xs">24h Volume</div>
        <div className="stat-value text-lg text-accent">
          {formatVolume(marketStats.volume24h)}
        </div>
        <div className="stat-desc text-xs">ETK traded</div>
      </div>

      {/* 24h Trades */}
      <div className="stat bg-base-200 rounded-lg p-4">
        <div className="stat-figure text-info">
          <ScaleIcon className="w-8 h-8" />
        </div>
        <div className="stat-title text-xs">24h Trades</div>
        <div className="stat-value text-lg text-info">
          {marketStats.tradesCount24h}
        </div>
        <div className="stat-desc text-xs">transactions</div>
      </div>

      {/* Market Liquidity */}
      <div className="col-span-2 md:col-span-4">
        <div className="card bg-base-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <ScaleIcon className="w-4 h-4" />
            Market Liquidity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-xs text-base-content/60">ETK Supply</div>
              <div className="font-semibold text-primary">
                {formatVolume(marketStats.marketLiquidity.etkSupply)} ETK
              </div>
            </div>
            <div>
              <div className="text-xs text-base-content/60">IDRS Supply</div>
              <div className="font-semibold text-secondary">
                {formatPrice(marketStats.marketLiquidity.idrsSupply)} IDRS
              </div>
            </div>
            <div>
              <div className="text-xs text-base-content/60">Buy Orders</div>
              <div className="font-semibold text-success">
                {marketStats.marketLiquidity.buyOrderCount}
              </div>
            </div>
            <div>
              <div className="text-xs text-base-content/60">Sell Orders</div>
              <div className="font-semibold text-error">
                {marketStats.marketLiquidity.sellOrderCount}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Average Price */}
      <div className="col-span-2">
        <div className="stat bg-base-200 rounded-lg p-4">
          <div className="stat-title text-xs">24h Average Price</div>
          <div className="stat-value text-lg">
            {formatPrice(marketStats.averagePrice24h)}
          </div>
          <div className="stat-desc text-xs">IDRS per ETK</div>
        </div>
      </div>
    </div>
  );
};

export default MarketStats;
