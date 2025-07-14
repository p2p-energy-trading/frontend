import React, { useState } from "react";
import Battery from "../components/energy conversion/Battery";

const BatterySimulator = () => {
  const [capacity, setCapacity] = useState(4.5);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionLabel, setConversionLabel] = useState("");
  const [conversionValue, setConversionValue] = useState("");
  const [smartMeterOnline, setSmartMeterOnline] = useState(true);
  const maxCapacity = 20;

  // Two-way conversion simulation
  const startConversion = (direction = "tokenToKwh") => {
    const isToKwh = direction === "tokenToKwh";
    const delta = 5; // kWh amount per conversion
    const steps = 100; // jumlah langkah progress (0-100, step 5)
    const step = delta / steps;
    let progress = 0;
    let current = capacity;
    let target = isToKwh
      ? Math.min(maxCapacity, capacity + delta)
      : Math.max(0, capacity - delta);

    setConversionProgress(0);
    setConversionLabel(
      isToKwh ? "Converting Token to kWh" : "Converting kWh to Token"
    );
    setConversionValue(isToKwh ? "0.5 Token → 1 kWh" : "1 kWh → 0.5 Token");

    const interval = setInterval(() => {
      if (progress < 100 && current !== target) {
        progress += 100 / steps;
        if (isToKwh) {
          current = Math.min(target, current + step);
        } else {
          current = Math.max(target, current - step);
        }
        setConversionProgress(Math.round(progress));
        setCapacity(Number(current.toFixed(2)));
      } else {
        setConversionProgress(100);
        setCapacity(Number(target.toFixed(2)));
        clearInterval(interval);
        setTimeout(() => setConversionProgress(0), 100);
      }
    }, 100);
  };

  return (
    <>
      <Battery
        capacity={capacity}
        maxCapacity={maxCapacity}
        smartMeterOnline={smartMeterOnline}
        conversionProgress={conversionProgress}
        conversionLabel={conversionLabel}
        conversionValue={conversionValue}
        efficiency={95}
        estimatedTime="1h 20m"
      />

      <div className="flex gap-2 mt-6 flex-wrap">
        <button
          className="btn btn-success btn-sm"
          onClick={() => setCapacity((c) => Math.min(maxCapacity, c + 1))}
        >
          Charge +1 kWh
        </button>
        <button
          className="btn btn-error btn-sm"
          onClick={() => setCapacity((c) => Math.max(0, c - 1))}
        >
          Discharge -1 kWh
        </button>
        <button
          className="btn btn-primary btn-sm"
          disabled={conversionProgress > 0}
          onClick={() => startConversion("tokenToKwh")}
        >
          Convert Token → kWh
        </button>
        <button
          className="btn btn-secondary btn-sm"
          disabled={conversionProgress > 0}
          onClick={() => startConversion("kwhToToken")}
        >
          Convert kWh → Token
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setSmartMeterOnline((s) => !s)}
        >
          {smartMeterOnline ? "Set Meter Offline" : "Set Meter Online"}
        </button>
      </div>
    </>
  );
};

export default BatterySimulator;
