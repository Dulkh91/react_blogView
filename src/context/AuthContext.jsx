import { createContext, useContext } from "react";
import useAuth from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authHook = useAuth();
  return (
    <AuthContext.Provider value={authHook}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
