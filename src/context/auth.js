import React, { useContext } from 'react';
import { createContext, useState } from "react";
import authService from "../services/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    const response = await authService.signIn()
    setUser(response.user)
    return response.isSusses;
  }

  const handleSignOut = async () => {
    await authService.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const asyncFunction = async () => { }

export const AuthContext = createContext({
  user: null, signIn: asyncFunction, signOut: asyncFunction
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
