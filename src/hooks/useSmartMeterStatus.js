import { useState, useEffect } from "react";
import { apiGet } from "../utils/api";

export const useSmartMeterStatus = () => {
  const [hasSmartMeter, setHasSmartMeter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSmartMeterStatus = async () => {
      try {
        const response = await (await apiGet("/smart-meters/list")).json();
        // console.log("Smart meter status response:", response);
        
        if (response.success) {
          setHasSmartMeter(response.metadata.count > 0);
        }
      } catch (error) {
        console.error("Error checking smart meter status:", error);
        setError(
          error.response?.res?.message || "Failed to check smart meter status"
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
