import { Outlet, useLocation } from "react-router";
import "./App.css";
import Drawer from "./base/Drawer";
import Footer from "./base/Footer";
import Navbar from "./base/Navbar";
import { useState } from "react";
import { AppContext } from "./context/context";

// Main App component that sets up the layout and navigation
function App() {
  const [theme, setTheme] = useState(false);
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const contextValue = {
    theme,
    user,
    setTheme,
    setUser,
  };

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  // Check if current route is homepage
  const isHomepage = location.pathname === "/";

  return (
    // Drawer layout for sidebar navigation
    <AppContext.Provider value={contextValue}>
      <div className={`drawer  ${drawerOpen ? "lg:drawer-open" : ""}`}>
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={drawerOpen}
          onChange={handleDrawerToggle}
        />
        <div className="drawer-content min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1 z-0">
            <div
              className={`w-full flex flex-col items-center justify-center h-full flex-1 ${
                isHomepage ? "" : "p-5"
              }`}
            >
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
        <Drawer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
// The App component serves as the main entry point for the application.
