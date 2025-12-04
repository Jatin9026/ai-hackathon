import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userId) => {
    setIsAuthenticated(true);
    setCurrentUser(userId);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userId", userId);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
  };

  // Check if user is already logged in
  React.useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    const userId = localStorage.getItem("userId");
    if (isAuth && userId) {
      setIsAuthenticated(true);
      setCurrentUser(userId);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
