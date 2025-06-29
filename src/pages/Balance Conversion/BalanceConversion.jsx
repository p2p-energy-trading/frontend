import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Conversion from '../../components/conversion/Conversion'

const BalanceConversion = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-1 gap-4 w-full">

            <div className="card card-border bg-base-100 border-base-300 border-2">
                <div className="card-body">
                    {/* <h2 className="card-title">Convertion</h2> */}
                    <h2 className="card-title font-bold flex items-center gap-2">
                        <CurrencyDollarIcon className="size-5 text-primary" />
                        Balance Conversion
                    </h2>
                    {/* <OrderBook /> */}
                    <Conversion first_change={'IDRS'} second_change={'IDR'} rate={1} balanceKey="idrs_balance" />
                </div>
            </div>
        </div>
    )
}

export default BalanceConversion