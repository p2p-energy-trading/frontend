import { useState, useEffect, useCallback } from "react";
import { apiCall } from "../../../utils/api";

const useTokenTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);

  const fetchTransactions = useCallback(
    async (scope = "own", limit = 10, tokenType = "IDRS") => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        params.append("limit", limit.toString());
        params.append("scope", scope);
        params.append("tokenType", tokenType);

        const response = await apiCall(
          `/wallet/transactions/token-minting?${params.toString()}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setTransactions(data.data);
            setMetadata(data.metadata || null);
          } else {
            setError(data.message || "Failed to fetch transactions");
            setTransactions([]);
            setMetadata(null);
          }
        } else {
          setError("Failed to fetch transactions");
          setTransactions([]);
          setMetadata(null);
        }
      } catch (err) {
        console.error("Error fetching token transactions:", err);
        setError("Network error while fetching transactions");
        setTransactions([]);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    metadata,
    refetch: fetchTransactions,
  };
};

export default useTokenTransactionHistory;
