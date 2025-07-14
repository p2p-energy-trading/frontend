import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

export const useSmartMeterStatus = () => {
  const [hasSmartMeter, setHasSmartMeter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSmartMeterStatus = async () => {
      try {
        const response = await apiGet("/smart-meters/list");
        const data = await response.json();
        if (data.success) {
          setHasSmartMeter(data.count > 0);
        }
      } catch (error) {
        console.error("Error checking smart meter status:", error);
        setError(
          error.response?.data?.message || "Failed to check smart meter status"
        );
        setHasSmartMeter(false);
      } finally {
        setLoading(false);
      }
    };

    checkSmartMeterStatus();
  }, []);

  return { hasSmartMeter, loading, error };
};
