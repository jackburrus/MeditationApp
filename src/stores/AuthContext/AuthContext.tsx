import React, { createContext, useState } from "react";

import { func } from "../../constants";
interface AuthContextProps {}

export const AuthContext = createContext({
  user: "null",
  setUser: func.noop,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
