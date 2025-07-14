import { useState, useEffect, useCallback } from "react";
import { apiCall } from "../../../utils/api";

const useSettlementHistory = () => {
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const fetchSettlementHistory = useCallback(
    async (scope = "own", limit = 10, meterId = null) => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        params.append("limit", limit.toString());
        params.append("scope", scope);
        if (meterId) {
          params.append("meterId", meterId);
        }

        const response = await apiCall(
          `/energy/settlement/history?${params.toString()}`
        );

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setSettlements(result.data);
            setMetadata(result.metadata || null);
          } else {
            setError("Failed to fetch settlement history");
            setSettlements([]);
            setMetadata(null);
          }
        } else {
          setError("API call failed");
          setSettlements([]);
          setMetadata(null);
        }
      } catch (err) {
        console.error("Settlement history API error:", err);
        setError("Network error");
        setSettlements([]);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchSettlementHistory();
  }, [fetchSettlementHistory]);

  return {
    settlements,
    loading,
    error,
    metadata,
    refetch: fetchSettlementHistory,
  };
};

export default useSettlementHistory;
