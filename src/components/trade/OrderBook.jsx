import React from "react";

// Contoh data
const sellOrders = [
    { price: 32.55, amount: 1.0 },
    { price: 32.55, amount: 1.0 },
    { price: 32.60, amount: 1.8 },
    { price: 32.65, amount: 1.2 },
    { price: 32.70, amount: 2.5 },
    { price: 32.75, amount: 1.7 },
];
const buyOrders = [
    { price: 32.50, amount: 1.2 },
    { price: 32.45, amount: 2.1 },
    { price: 32.40, amount: 0.8 },
    { price: 32.35, amount: 1.5 },
    { price: 32.30, amount: 2.0 },
    { price: 32.30, amount: 2.0 },
];
const maxRows = 8;
const maxSellAmount = Math.max(...sellOrders.map(o => o.amount), 1);
const maxBuyAmount = Math.max(...buyOrders.map(o => o.amount), 1);
const midPrice = 32.52;

function formatNumber(num) {
    return num?.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const OrderBook = () => (
    <>
        <div className="flex flex-col text-xs font-mono h-full justify-center">
            {/* Header */}
            <div className="flex font-bold text-base-content/70 border-b-2 border-base-300 pb-1 mb-1">
                <div className="w-1/6 text-left">Amount</div>
                <div className="w-2/3 text-center">Price (ETK/IDRS)</div>
                <div className="w-1/6 text-right">Amount</div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
                {/* Sell Orders (descending by price) */}
                <div className="flex flex-col-reverse justify-center">
                    {Array.from({ length: maxRows }).map((_, i) => {
                        const order = sellOrders[i];
                        if (!order) {
                            return (
                                <div key={`sell-empty-${i}`} className="flex items-center group">
                                    <div className="w-1/6 text-left base-content">-</div>
                                    <div className="w-2/3 text-center base-content bg-base-200 opacity-80">-</div>
                                    <div className="w-1/6 text-right base-content">-</div>
                                </div>
                            );
                        }
                        const width = (order.amount / maxSellAmount) * 100;
                        return (
                            <div key={`sell-${i}`} className="flex items-center group relative">
                                <div className="w-1/6 text-left base-content">-</div>
                                <div className="w-2/3 text-center text-error relative">
                                    {/* Gray background */}
                                    <span className="absolute right-0 top-0 h-full w-full bg-base-200 opacity-80 rounded"></span>
                                    {/* Red highlight */}
                                    <span
                                        className="absolute right-0 top-0 h-full bg-error/20 opacity-60 rounded"
                                        style={{ width: `${width}%` }}
                                    ></span>
                                    <span className="relative z-10">{formatNumber(order.price)}</span>
                                </div>
                                <div className="w-1/6 text-right text-error">{formatNumber(order.amount)}</div>
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
                        const order = buyOrders[i];
                        if (!order) {
                            return (
                                <div key={`buy-empty-${i}`} className="flex items-center group">
                                    <div className="w-1/6 text-left base-content">-</div>
                                    <div className="w-2/3 text-center base-content bg-base-200 opacity-80">-</div>
                                    <div className="w-1/6 text-right base-content">-</div>
                                </div>
                            );
                        }
                        const width = (order.amount / maxBuyAmount) * 100;
                        return (
                            <div key={`buy-${i}`} className="flex items-center group relative">
                                <div className="w-1/6 text-left text-success">{formatNumber(order.amount)}</div>
                                <div className="w-2/3 text-center text-success relative">
                                    {/* Gray background */}
                                    <span className="absolute left-0 top-0 h-full w-full bg-base-200 opacity-80 rounded"></span>
                                    {/* Green highlight */}
                                    <span
                                        className="absolute left-0 top-0 h-full bg-success/20 opacity-60 rounded"
                                        style={{ width: `${width}%` }}
                                    ></span>
                                    <span className="relative z-10">{formatNumber(order.price)}</span>
                                </div>
                                <div className="w-1/6 text-right base-content">-</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        {/* Optional: show order details on hover */}
        {/* <div className="mt-2 text-xs text-base-300">Hover an order for details</div> */}
    </>
);

export default OrderBook