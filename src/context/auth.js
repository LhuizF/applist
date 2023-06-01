import React, { useContext, useEffect } from 'react';
import { createContext, useState } from "react";
import authService from "../services/auth";
import storage from '../storage';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    const response = await authService.signIn()
    setUser(response.user)

    if (response.isSusses) {
      await storage.setItem('user', response.user)
    }

    return response.isSusses;
  }

  const handleSignOut = async () => {
    await authService.signOut()
    await storage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await storage.getItem('user');
      if (user) {

        setUser(user)
      }
    }

    getUser()
  }, []);

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
