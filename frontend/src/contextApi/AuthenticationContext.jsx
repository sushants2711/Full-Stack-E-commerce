import React, { createContext, useState } from 'react'

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const [ signinState, setSigninState ] = useState("");
    const [ loginState, setLoginState ] = useState("");
    const [ token, setToken ] = useState("");
    return <AuthenticationContext.Provider value={{ signinState, setSigninState, loginState, setLoginState, token, setToken }} >
        {children}
    </AuthenticationContext.Provider>
}
