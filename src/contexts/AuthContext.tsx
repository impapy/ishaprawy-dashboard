import { Admin, LoginResponse, sdk } from "api"
import { getTokens } from "api/auth"
import React, { useContext, useEffect, useMemo, useReducer, useState } from "react"

export interface Auth {
  isLoggedIn: boolean | null
  viewer: Partial<Admin> | null
}

const defaultState: Auth = {
  isLoggedIn: null,
  viewer: null,
}

const defaultValue = {
  auth: defaultState,
  login(res: Partial<LoginResponse>) {},
  logout() {},
}

const AuthContext = React.createContext(defaultValue)
export const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(defaultState)

  const login = ({ token, user }: Partial<LoginResponse>) => {
    //@ts-ignore
    setAuth({ isLoggedIn: true, viewer: user })
    localStorage.setItem("accessToken", token!)
  }

  const logout = () => {
    setAuth({ isLoggedIn: false, viewer: null })
    localStorage.removeItem("accessToken")
  }

  useEffect(() => {
    ;(async () => {
      try {
        const { viewer } = await sdk.Viewer({}, { authorization: `Bearer ${getTokens().accessToken}` })

        setAuth({ isLoggedIn: true, viewer })
      } catch (error) {
        setAuth({ isLoggedIn: false, viewer: null })
      }
    })()
  }, [])

  const value = useMemo(() => ({ auth, login, logout }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
