import React from "react";
import {
  HomeIcon,
  WalletIcon,
  ArrowsRightLeftIcon,
  BoltIcon,
  CurrencyDollarIcon,
  CalculatorIcon,
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

// Drawer component renders the sidebar navigation menu
const Drawer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="drawer-side overflow-hidden">
      {/* Overlay for closing the drawer on click */}
      <label
        htmlFor="my-drawer-2"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      {/* Sidebar menu container */}
      <div className="menu bg-base-100 border-r-1 border-base-200 p-0 bg-base text-base-content min-h-full w-60">
        {/* App name/title at the top */}
        <div className="flex items-center justify-center h-16">
          <h1 className="text-[1.4rem] font-bold cursor-pointer">
            <Link to="/">EnerLink</Link>
          </h1>
        </div>
        {/* Navigation links */}
        <ul className="menu rounded-box w-auto">
          {!isAuthenticated ? (
            <>
            <Link to="/">
              <li className="mb-1">
                <span className="flex items-center gap-2">
                  <HomeIcon className="size-5 text-primary" />
                  Home
                </span>
              </li>
            </Link>
            <Link to="/dashboard">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <HomeIcon className="size-5 text-primary" />
                    Dashboard
                  </span>
                </li>
              </Link>
            </>
          ) : (
            () => null
          )}

          {isAuthenticated ? (
            <>
              <Link to="/dashboard-user">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <UserIcon className="size-5 text-primary" />
                    My Dashboard
                  </span>
                </li>
              </Link>
              <Link to="/trade">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <ArrowsRightLeftIcon className="size-5 text-primary" />
                    Trade
                  </span>
                </li>
              </Link>
              <Link to="/power-conversion">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <BoltIcon className="size-5 text-primary" />
                    Energy Conversion
                  </span>
                </li>
              </Link>
              <Link to="/balance-conversion">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <CurrencyDollarIcon className="size-5 text-primary" />
                    Balance Conversion
                  </span>
                </li>
              </Link>
              <Link to="/smart-meter">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <CalculatorIcon className="size-5 text-primary" />
                    Smart Meter
                  </span>
                </li>
              </Link>
              <Link to="/wallet">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <WalletIcon className="size-5 text-primary" />
                    Wallets
                  </span>
                </li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <ArrowLeftEndOnRectangleIcon className="size-5 text-primary" />
                    Login
                  </span>
                </li>
              </Link>
              <Link to="/register">
                <li className="mb-1">
                  <span className="flex items-center gap-2">
                    <UserPlusIcon className="size-5 text-primary" />
                    Sign Up
                  </span>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
