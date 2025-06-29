import React, { useContext, useEffect, useState } from 'react'
import ChartPrice from '../../components/trade/ChartPrice';
import { AppContext } from '../../context/context';
import { colorsInDarkMode, colorsInLightMode, initialData } from "./helper/tradeUtils";
import OrderBook from '../../components/trade/OrderBook';
import Transact from '../../components/trade/Transact';
import RecentTransactions from '../../components/trade/RecentTransactions';
import { ArrowTrendingUpIcon, BanknotesIcon, ClipboardDocumentListIcon, ReceiptRefundIcon } from '@heroicons/react/24/outline';

const Trade = () => {
    const [colors, setColors] = useState({});
    const context = useContext(AppContext);

    useEffect(() => {
        console.log("context in trade: ", context);
        if (context.theme) {
            setColors(colorsInLightMode);
        } else {
            setColors(colorsInDarkMode);
        }
    }, [context]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                        <ArrowTrendingUpIcon className="size-5 text-primary" />
                        Market Price
                    </h2>
                    <ChartPrice data={initialData} colors={colors} />
                </div>
            </div>
            <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-1 xl:col-span-1">
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                        <ClipboardDocumentListIcon className="size-5 text-primary" />
                        Order Book
                    </h2>
                    <OrderBook />
                </div>
            </div>
            <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-1 xl:col-span-2">
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                        <BanknotesIcon className="size-5 text-primary" />
                        Trade
                    </h2>
                    <Transact />
                    <p></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Trade</button>
                    </div>
                </div>
            </div>
            <div className="card card-border bg-base-100 border-base-300 border-2 col-span-1 sm:col-span-2 xl:col-span-3">
                <div className="card-body">
                    <h2 className="card-title flex items-center gap-2">
                        <ReceiptRefundIcon className="size-5 text-primary" />
                        Recent Transactions
                    </h2>
                    <RecentTransactions />
                </div>
            </div>
        </div>
    )
}

export default Trade