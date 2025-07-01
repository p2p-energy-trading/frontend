import { useEffect, useState, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";
import { apiCall } from "../../../utils/api";

export default function useTradingApi() {
  const { user } = useAuth();

  // State for API data
  const [orders, setOrders] = useState([]);
  const [recentTrades, setRecentTrades] = useState([]);
  const [orderbook, setOrderbook] = useState(null);
  const [orderbookDetailed, setOrderbookDetailed] = useState(null);
  const [marketStats, setMarketStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Order placement state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState(null);

  // Order cancellation state
  const [isCancellingOrder, setIsCancellingOrder] = useState(false);
  const [cancelError, setCancelError] = useState(null);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      const response = await apiCall("/trading/orders");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrders(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders");
    }
  }, []);

  // Fetch recent trades
  const fetchRecentTrades = useCallback(async () => {
    try {
      const response = await apiCall("/trading/trades");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setRecentTrades(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching recent trades:", error);
      setError("Failed to fetch recent trades");
    }
  }, []);

  // Fetch orderbook
  const fetchOrderbook = useCallback(async () => {
    try {
      const response = await apiCall("/trading/orderbook");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrderbook(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching orderbook:", error);
      setError("Failed to fetch orderbook");
    }
  }, []);

  // Fetch detailed orderbook
  const fetchOrderbookDetailed = useCallback(async () => {
    try {
      const response = await apiCall("/trading/orderbook-detailed");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOrderbookDetailed(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching detailed orderbook:", error);
      setError("Failed to fetch detailed orderbook");
    }
  }, []);

  // Fetch market stats
  const fetchMarketStats = useCallback(async () => {
    try {
      const response = await apiCall("/trading/market-stats");
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMarketStats(data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching market stats:", error);
      setError("Failed to fetch market stats");
    }
  }, []);

  // Place order
  const placeOrder = useCallback(
    async (walletAddress, orderType, quantity, price) => {
      setIsPlacingOrder(true);
      setOrderError(null);

      try {
        const response = await apiCall("/trading/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress,
            orderType, // "BID" or "ASK"
            quantity: parseFloat(quantity),
            price: parseFloat(price),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Refresh data after successful order placement
            await Promise.all([
              fetchOrders(),
              fetchOrderbook(),
              fetchOrderbookDetailed(),
              fetchMarketStats(),
            ]);
            return { success: true, data: data.data };
          } else {
            setOrderError(data.message || "Failed to place order");
            return {
              success: false,
              error: data.message || "Failed to place order",
            };
          }
        } else {
          setOrderError("Failed to place order");
          return { success: false, error: "Failed to place order" };
        }
      } catch (error) {
        console.error("Error placing order:", error);
        setOrderError("Network error while placing order");
        return { success: false, error: "Network error while placing order" };
      } finally {
        setIsPlacingOrder(false);
      }
    },
    [fetchOrders, fetchOrderbook, fetchOrderbookDetailed, fetchMarketStats]
  );

  // Cancel order
  const cancelOrder = useCallback(
    async (orderId, isBuyOrder) => {
      setIsCancellingOrder(true);
      setCancelError(null);

      try {
        const response = await apiCall("/trading/cancel-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            isBuyOrder,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Refresh data after successful order cancellation
            await Promise.all([
              fetchOrders(),
              fetchOrderbook(),
              fetchOrderbookDetailed(),
              fetchMarketStats(),
            ]);
            return { success: true, data: data.data };
          } else {
            setCancelError(data.message || "Failed to cancel order");
            return {
              success: false,
              error: data.message || "Failed to cancel order",
            };
          }
        } else {
          setCancelError("Failed to cancel order");
          return { success: false, error: "Failed to cancel order" };
        }
      } catch (error) {
        console.error("Error cancelling order:", error);
        setCancelError("Network error while cancelling order");
        return {
          success: false,
          error: "Network error while cancelling order",
        };
      } finally {
        setIsCancellingOrder(false);
      }
    },
    [fetchOrders, fetchOrderbook, fetchOrderbookDetailed, fetchMarketStats]
  );

  // Initial data fetch
  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([
        fetchOrders(),
        fetchRecentTrades(),
        fetchOrderbook(),
        fetchOrderbookDetailed(),
        fetchMarketStats(),
      ]).finally(() => {
        setLoading(false);
      });
    }
  }, [
    user,
    fetchOrders,
    fetchRecentTrades,
    fetchOrderbook,
    fetchOrderbookDetailed,
    fetchMarketStats,
  ]);

  // Set up auto-refresh for trading data
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        fetchRecentTrades();
        fetchOrderbook();
        fetchOrderbookDetailed();
        fetchMarketStats();
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, [
    user,
    fetchRecentTrades,
    fetchOrderbook,
    fetchOrderbookDetailed,
    fetchMarketStats,
  ]);

  // Refresh all data
  const refreshAllData = useCallback(() => {
    if (user) {
      Promise.all([
        fetchOrders(),
        fetchRecentTrades(),
        fetchOrderbook(),
        fetchOrderbookDetailed(),
        fetchMarketStats(),
      ]);
    }
  }, [
    user,
    fetchOrders,
    fetchRecentTrades,
    fetchOrderbook,
    fetchOrderbookDetailed,
    fetchMarketStats,
  ]);

  return {
    // Data
    orders,
    recentTrades,
    orderbook,
    orderbookDetailed,
    marketStats,

    // Actions
    placeOrder,
    cancelOrder,
    refreshAllData,

    // States
    loading,
    error,
    isPlacingOrder,
    orderError,
    isCancellingOrder,
    cancelError,
  };
}
