import React, { createContext, useState } from "react";

import { func } from "../../constants";
interface DataContextProps {}

export const DataContext = createContext({
  data: "null",
  setData: func.noop,
});

export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
