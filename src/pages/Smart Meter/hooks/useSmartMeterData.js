import { useEffect, useState } from "react";
import {
  getRandomFloat,
  getNowTimeString,
  DEVICE_LIST,
  TIME_WINDOWS,
  initialHistory,
} from "../helper/smartMeter";

export default function useSmartMeterData() {
  const [selectedDevice, setSelectedDevice] = useState(DEVICE_LIST[0]);
  const [lastUpdate, setLastUpdate] = useState("2024-06-01 12:34:56");
  const [deviceConnected] = useState(true);
  const [timeWindow, setTimeWindow] = useState(TIME_WINDOWS[0].value);

  // Main metrics
  const [solar, setSolar] = useState(1.25);
  const [consume, setConsume] = useState(0.85);
  const [battery, setBattery] = useState(6.8);
  const [batteryPercent, setBatteryPercent] = useState(68);
  const [grid, setGrid] = useState(0.4);
  const [gridStatus, setGridStatus] = useState("Exporting");

  // Energy history table
  const [energyHistory, setEnergyHistory] = useState(initialHistory);

  const [batteryFlow, setBatteryFlow] = useState(0); // kW, positif: charging, negatif: discharging
  const [batteryStatus, setBatteryStatus] = useState("Idle"); // "Charging" | "Discharging" | "Idle"

  // Simulasi data realtime
  useEffect(() => {
    const interval = setInterval(() => {
      const newSolar = getRandomFloat(0.5, 5.0);
      const newConsume = getRandomFloat(0.5, 5.0);

      let newGrid = +(newSolar - newConsume).toFixed(2);
      let newBattery = battery;
      let newBatteryFlow = 0;
      let newBatteryStatus = "Idle";

      if (newGrid > 0) {
        newBatteryFlow = Math.min(newGrid, 2, 10 - newBattery);
        newBattery += newBatteryFlow;
        newGrid -= newBatteryFlow;
        newBatteryStatus = newBatteryFlow > 0 ? "Charging" : "Idle";
      } else if (newGrid < 0) {
        newBatteryFlow = -Math.min(-newGrid, 2, newBattery);
        newBattery += newBatteryFlow;
        newGrid -= newBatteryFlow;
        newBatteryStatus = newBatteryFlow < 0 ? "Discharging" : "Idle";
      }

      newBattery = Math.max(0, Math.min(10, newBattery));
      const newBatteryPercent = Math.round((newBattery / 10) * 100);

      let newGridStatus = "Idle";
      if (newGrid > 0.01) newGridStatus = "Exporting";
      else if (newGrid < -0.01) newGridStatus = "Importing";

      const now = new Date();

      setSolar(newSolar);
      setConsume(newConsume);
      setBattery(newBattery);
      setBatteryPercent(newBatteryPercent);
      setBatteryFlow(newBatteryFlow);
      setBatteryStatus(newBatteryStatus);
      setGrid(Math.abs(newGrid));
      setGridStatus(newGridStatus);
      setLastUpdate(now.toISOString().slice(0, 19).replace("T", " "));

      setEnergyHistory((prev) => [
        {
          time: getNowTimeString(),
          solar: newSolar,
          usage: newConsume,
          grid: newGrid,
          battery: newBattery,
          batteryFlow: newBatteryFlow,
          batteryStatus: newBatteryStatus,
        },
        ...prev.slice(0, 11),
      ]);
    }, 5000);

    return () => clearInterval(interval);
     
  }, [battery, energyHistory]);

  return {
    selectedDevice,
    setSelectedDevice,
    lastUpdate,
    deviceConnected,
    timeWindow,
    setTimeWindow,
    solar,
    consume,
    battery,
    batteryPercent,
    grid,
    gridStatus,
    energyHistory,
    batteryFlow,
    batteryStatus,
  };
}