import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Import components
import Homepage from "./pages/Home/Homepage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Trade from "./pages/Trade/Trade.jsx";
import PowerConversion from "./pages/Energy Conversion/PowerConversion.jsx";
import BalanceConversion from "./pages/Balance Conversion/BalanceConversion.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import SmartMeter from "./pages/Smart Meter/SmartMeter.jsx";
import Wallet from "./pages/Wallet/Wallet.jsx";
import DashboardUser from "./pages/Dashboard User/DashboardUser.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard-user",
        element: (
          <ProtectedRoute>
            <DashboardUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "/trade",
        element: (
          <ProtectedRoute>
            <Trade />
          </ProtectedRoute>
        ),
      },
      {
        path: "/power-conversion",
        element: (
          <ProtectedRoute>
            <PowerConversion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/balance-conversion",
        element: (
          <ProtectedRoute>
            <BalanceConversion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/smart-meter",
        element: (
          <ProtectedRoute>
            <SmartMeter />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wallet",
        element: (
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
