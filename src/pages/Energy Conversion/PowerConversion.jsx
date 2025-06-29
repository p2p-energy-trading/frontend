// import React, { useContext, useEffect, useState } from 'react'
import ChartPrice from '../../components/trade/ChartPrice';

// import { colorsInDarkMode, colorsInLightMode } from "./utils/tradeUtils";
import OrderBook from '../../components/trade/OrderBook';
import Battery from '../../components/energy conversion/Battery';
import BatterySimulator from '../../simulator/BatterySimulator';
import Conversion from '../../components/conversion/Conversion';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { ArrowPathRoundedSquareIcon, Battery0Icon, BoltIcon } from '@heroicons/react/24/outline';

const PowerConversion = () => {
    // const [colors, setColors] = useState({});
    // const context = useContext(AppContext);

    // useEffect(() => {
    //     console.log("context in trade: ", context);
    //     if (context.theme) {
    //         setColors(colorsInLightMode);
    //     } else {
    //         setColors(colorsInDarkMode);
    //     }
    // }, [context]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-4 w-full">
            <div className="card card-border bg-base-100 border-base-300 border-2">
                <div className="card-body">
                    <h2 className="card-title font-bold flex items-center gap-2">
                        <Battery0Icon className="size-5 text-primary" />
                        Battery
                    </h2>
                    <BatterySimulator />
                    {/* <Battery /> */}
                </div>
            </div>
            <div className="card card-border bg-base-100 border-base-300 border-2">
                <div className="card-body">
                    {/* <h2 className="card-title">Convertion</h2> */}
                    <h2 className="card-title font-bold flex items-center gap-2">
                        <BoltIcon className="size-5 text-primary" />
                        Energy Conversion
                    </h2>
                    {/* <OrderBook /> */}
                    <Conversion first_change={'ETKS'} second_change={'kWhS'} rate={3} balanceKey="etk_balance" />
                </div>
            </div>
        </div>
    )
}

export default PowerConversion