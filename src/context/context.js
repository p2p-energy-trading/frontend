import { createContext } from "react";

export const defaultAppContext = {
    theme: false,
    user: null,
    setTheme: () => {},
    setUser: () => {},
  };

export const AppContext = createContext(defaultAppContext);