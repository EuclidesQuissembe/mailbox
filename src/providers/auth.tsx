import React, { createContext, useState, useEffect } from "react";

import { Auth } from "../@types/data";
import { TOKEN } from "../utils/constants";

export const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider: React.FC = ({ children }) => {
  const [signed, setSigned] = useState<boolean>(false)

  useEffect(() => {
    getCredentials()
  }, [])

  const getCredentials = () => {
    const token = localStorage.getItem(TOKEN)

    if (token) {
      setSigned(true)
    }
  }

  const signIn = (email: string, password: string): boolean => {
    if (email === 'admin@admin.com' && password === 'admin') {
      localStorage.setItem(TOKEN, 'ashiasiabsibsa.asjasjoajsias.sashoahso')

      setSigned(true)
      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem(TOKEN)
    setSigned(false)
  }

  return <AuthContext.Provider value={{ signed, signIn, logout }}>
    {children}
  </AuthContext.Provider>;
};