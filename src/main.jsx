import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SmartMeterGuard from "./components/SmartMeterGuard.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Import components
import Homepage from "./pages/Home/Homepage.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import SmartMeterSetup from "./pages/Setup/SmartMeterSetup.jsx";
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
    path: "/smart-meter-setup",
    element: (
      <ProtectedRoute>
        <SmartMeterSetup />
      </ProtectedRoute>
    ),
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
            <SmartMeterGuard>
              <DashboardUser />
            </SmartMeterGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: "/trade",
        element: (
          <ProtectedRoute>
            <SmartMeterGuard>
              <Trade />
            </SmartMeterGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: "/power-conversion",
        element: (
          <ProtectedRoute>
            <SmartMeterGuard>
              <PowerConversion />
            </SmartMeterGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: "/balance-conversion",
        element: (
          <ProtectedRoute>
            <SmartMeterGuard>
              <BalanceConversion />
            </SmartMeterGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: "/smart-meter",
        element: (
          <ProtectedRoute>
            <SmartMeterGuard>
              <SmartMeter />
            </SmartMeterGuard>
          </ProtectedRoute>
        ),
      },
      {
        path: "/wallet",
        element: (
          <ProtectedRoute>
            <SmartMeterGuard>
              <Wallet />
            </SmartMeterGuard>
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
