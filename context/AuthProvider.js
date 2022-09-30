import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [currentUser, setCurrentUser] = useState("");
  const [persist, setPersist] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        currentUser,
        setCurrentUser,
        persist,
        setPersist,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
