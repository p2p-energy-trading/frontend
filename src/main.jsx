import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
// import { originalTableData, tableHeaderData } from './pages/utils/dummy.js';
import Homepage from "./pages/Home/Homepage.jsx";
import Trade from "./pages/Trade/Trade.jsx";
import PowerConversion from "./pages/Energy Conversion/PowerConversion.jsx";
import BalanceConversion from "./pages/Balance Conversion/BalanceConversion.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import SmartMeter from "./pages/Smart Meter/SmartMeter.jsx";
import Wallet from "./pages/Wallet/Wallet.jsx";
import DashboardUser from "./pages/Dashboard User/DashboardUser.jsx";

const router = createBrowserRouter([
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
        element: <DashboardUser />,
      },
      {
        path: "/trade",
        element: <Trade />,
      },
      {
        path: "/power-conversion",
        element: <PowerConversion />,
      },
      {
        path: "/balance-conversion",
        element: <BalanceConversion />,
      },
      {
        path: "/smart-meter",
        element: <SmartMeter />,
      },
      {
        path: "/wallet",
        element: <Wallet />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
