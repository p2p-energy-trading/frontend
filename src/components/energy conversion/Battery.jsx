// import React, { useState } from 'react'

const Battery = ({
    capacity = 7.5,
    maxCapacity = 10,
    smartMeterOnline = true,
    conversionProgress = 0,
    conversionLabel = '',
    conversionValue = '',
    efficiency = 95,
    estimatedTime = '1h 20m', // fallback jika tidak konversi
}) => {
    const batteryPercent = Math.min(100, Math.round((capacity / maxCapacity) * 100));
    const batteryColor = batteryPercent > 60
        ? 'bg-green-400 border-green-600'
        : batteryPercent > 30
            ? 'bg-yellow-400 border-yellow-600'
            : 'bg-red-400 border-red-600';

    // Estimasi waktu dinamis: misal 100% = 2 jam, 50% = 1 jam, dst
    // const maxHour = 2; // misal 100% = 2 jam
    // const estMinutes = Math.round((batteryPercent / 100) * maxHour * 60);
    // const estHour = Math.floor(estMinutes / 60);
    // const estMin = estMinutes % 60;
    // const estString = `${estHour > 0 ? estHour + 'h ' : ''}${estMin}m`;

    return (
        <>
            <div className="flex items-center space-x-6">
                {/* Battery Visual */}
                <div className="flex-shrink-0">
                    <div className="relative w-16 h-8">
                        {/* Battery Body */}
                        <div className={`absolute left-0 top-0 w-14 h-8 border-2 rounded-md bg-base-200 overflow-hidden ${batteryColor.split(' ')[1]}`}>
                            <div
                                className={`h-full transition-all duration-700 ${batteryColor.split(' ')[0]}`}
                                style={{ width: `${batteryPercent}%` }}
                            ></div>
                        </div>
                        {/* Battery Head */}
                        <div className={`absolute right-0 top-2 w-2 h-4 ${batteryColor.split(' ')[0]} rounded-r`}></div>
                    </div>
                </div>
                {/* Battery Info */}
                <div>
                    <div className="text-sm text-base-content/60 font-semibold mb-1">
                        Battery Capacity
                    </div>
                    <div className="flex items-end space-x-2">
                        <span
                            className={`text-2xl font-bold font-mono ${batteryPercent > 60
                                    ? 'text-green-600'
                                    : batteryPercent > 30
                                        ? 'text-yellow-600'
                                        : 'text-red-600'
                                }`}
                        >
                            {capacity != null
                                ? capacity.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                                : '--'}
                        </span>
                        <span className="text-base-content/60 mb-1">kWh</span>
                        <span className="text-xs text-base-content/40 mb-1">
                            / {maxCapacity} kWh
                        </span>
                    </div>
                    {/* Estimasi hanya muncul saat konversi */}
                    {conversionProgress > 0 && (
                        <div className="text-xs text-base-content/40 mt-1">
                            Est. Remaining: <span className="font-mono">{estimatedTime}</span>
                        </div>
                    )}
                </div>
                {/* Smart Meter Status */}
                <div className="ml-auto flex flex-col items-center">
                    <span className="text-xs text-base-content/60 mb-1">Smart Meter</span>
                    <span className="flex items-center gap-1 font-semibold">
                        <span
                            className={`inline-block w-3 h-3 rounded-full ${smartMeterOnline ? 'bg-green-400' : 'bg-gray-300'}`}
                        ></span>
                        <span className={`text-sm ${smartMeterOnline ? 'text-success' : 'text-base-content/40'}`}>
                            {smartMeterOnline ? 'Online' : 'Offline'}
                        </span>
                    </span>
                </div>
            </div>
            {/* Progress bar inside battery card, below main content */}
            <div className={`mt-4 w-full ${conversionProgress > 0 ? '' : 'hidden'}`}>
                <div className="flex items-center mb-2">
                    <span className="font-medium">{conversionLabel || 'Converting...'}</span>
                    <span className="ml-auto font-mono">{conversionProgress}%</span>
                </div>
                <div className="w-full bg-base-200 rounded-full h-4">
                    <div
                        className="bg-primary h-4 rounded-full transition-all duration-300"
                        style={{ width: `${conversionProgress}%` }}
                    ></div>
                </div>
                {/* Info konversi */}
                <div className="flex justify-between text-xs mt-2 text-base-content/60">
                    <span>Efficiency: <span className="font-mono">{efficiency}%</span></span>
                    <span>{conversionValue}</span>
                </div>
            </div>
        </>
    )
}

export default Battery