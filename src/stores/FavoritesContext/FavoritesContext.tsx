import React, { createContext, useState } from "react";

import { func } from "../../constants";
interface FavoritesContextProps {}

export const FavoritesContext = createContext({
  data: "null",
  setData: func.noop,
});

export const FavoritesContextProvider = ({ children }) => {
  const [favoritesData, setFavoritesData] = useState([]);

  return (
    <FavoritesContext.Provider value={{ favoritesData, setFavoritesData }}>
      {children}
    </FavoritesContext.Provider>
  );
};
