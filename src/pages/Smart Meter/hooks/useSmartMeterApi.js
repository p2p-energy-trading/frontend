import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";
import { apiCall } from "../../../utils/api";

export default function useSmartMeterApi() {
  const { user } = useAuth();

  // State for API data
  const [realTimeData, setRealTimeData] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Device control state
  const [isControlling, setIsControlling] = useState(false);
  const [controlError, setControlError] = useState(null);

  // Fetch user profile and meters
  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await apiCall("/auth/profile");
      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
        // Set first meter as selected by default
        if (data.meters && data.meters.length > 0) {
          setSelectedMeter(data.meters[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to fetch user profile");
    }
  }, []);

  // Fetch real-time energy data
  const fetchRealTimeData = useCallback(async () => {
    try {
      const response = await apiCall("/dashboard/real-time-energy");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRealTimeData(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching real-time data:", error);
      setError("Failed to fetch real-time energy data");
    }
  }, []);

  // Fetch device status
  const fetchDeviceStatus = useCallback(async () => {
    if (!selectedMeter?.meterId) return;

    try {
      const response = await apiCall(`/device/status/${selectedMeter.meterId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setDeviceStatus(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching device status:", error);
      setError("Failed to fetch device status");
    }
  }, [selectedMeter?.meterId]);

  // Send device control command
  const sendControlCommand = useCallback(
    async (command) => {
      if (!selectedMeter?.meterId) {
        setControlError("No meter selected");
        return false;
      }

      setIsControlling(true);
      setControlError(null);

      try {
        const response = await apiCall("/device/control", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meterId: selectedMeter.meterId,
            command: command,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Refresh device status after successful command
            setTimeout(() => {
              fetchDeviceStatus();
            }, 1000);
            return true;
          } else {
            setControlError(data.message || "Command failed");
            return false;
          }
        } else {
          setControlError("Failed to send command");
          return false;
        }
      } catch (error) {
        console.error("Error sending control command:", error);
        setControlError("Network error while sending command");
        return false;
      } finally {
        setIsControlling(false);
      }
    },
    [selectedMeter?.meterId, fetchDeviceStatus]
  );

  // Initial data fetch
  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchUserProfile(), fetchRealTimeData()]).finally(() => {
        setLoading(false);
      });
    }
  }, [user, fetchUserProfile, fetchRealTimeData]);

  // Fetch device status when meter is selected
  useEffect(() => {
    if (selectedMeter) {
      fetchDeviceStatus();
    }
  }, [selectedMeter, fetchDeviceStatus]);

  // Set up auto-refresh for real-time data
  useEffect(() => {
    if (user && selectedMeter) {
      const interval = setInterval(() => {
        fetchRealTimeData();
        fetchDeviceStatus();
      }, 2000); // Refresh every 2 seconds

      return () => clearInterval(interval);
    }
  }, [user, selectedMeter, fetchRealTimeData, fetchDeviceStatus]);

  // Process current values from timeseries data
  const currentData = realTimeData?.timeSeries?.[0] || {};

  // Calculate grid status
  const getGridStatus = () => {
    if (!currentData.netFlow) return "Idle";
    return currentData.netFlow > 0
      ? "Exporting"
      : currentData.netFlow < 0
      ? "Importing"
      : "Idle";
  };

  // Calculate battery percentage (assuming 10kWh max capacity)
  const getBatteryPercent = () => {
    const maxCapacity = 10; // kWh
    const currentLevel = Math.abs(currentData.battery || 0);
    return Math.min(100, Math.max(0, (currentLevel / maxCapacity) * 100));
  };

  // Format energy history for charts
  const energyHistory =
    realTimeData?.timeSeries
      ?.slice(0, 12)
      .reverse()
      .map((item) => ({
        time: new Date(item.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        solar: item.solar || 0,
        usage: item.load || 0,
        grid: item.netFlow || 0,
        battery: item.battery || 0, // Keep negative values for discharging
      })) || [];

  return {
    // Device selection
    selectedMeter,
    setSelectedMeter,
    userProfile,

    // Real-time data
    solar: currentData.solar || 0,
    consume: currentData.load || 0,
    battery: Math.abs(currentData.battery || 0),
    batteryPercent: getBatteryPercent(),
    batteryFlow: currentData.battery || 0,
    batteryStatus:
      currentData.batteryDirection === "charging"
        ? "Charging"
        : currentData.batteryDirection === "discharging"
        ? "Discharging"
        : "Idle",
    grid: currentData.netFlow || 0,
    gridStatus: getGridStatus(),

    // Device status
    deviceStatus,
    deviceConnected: deviceStatus?.isOnline || false,
    lastUpdate: realTimeData?.lastUpdate
      ? new Date(realTimeData.lastUpdate).toLocaleString()
      : "Never",

    // History data
    energyHistory,

    // Control functions
    sendControlCommand,
    isControlling,
    controlError,

    // Loading and error states
    loading,
    error,

    // Refresh functions
    refreshData: () => {
      fetchRealTimeData();
      fetchDeviceStatus();
    },
  };
}
