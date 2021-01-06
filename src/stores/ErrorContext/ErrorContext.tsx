import React, { createContext, useState } from "react";

import { func } from "../../constants";
interface ErrorContextProps {}

export const ErrorContext = createContext({
  error: null,
  setError: func.noop,
});

export const ErrorContextProvider = ({ children }) => {
  const [error, setError] = useState("");

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
