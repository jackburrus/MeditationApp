import React, { createContext, useState } from "react";

import { func } from "../../constants";
interface DataContextProps {}

export const ThemeContext = createContext({
  t: "dark",
  setTheme: func.noop,
});

export const ThemeContextProvider = ({ children }) => {
  const [t, setTheme] = useState("");

  return (
    <ThemeContext.Provider value={{ t, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
