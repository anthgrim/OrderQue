import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [auth, setAuth] = useState({});

  useEffect(() => {
    setCurrentUser(localStorage.getItem("currentUser") || "");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
