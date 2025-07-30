import { createContext, useContext, useEffect, useState } from "react";
import { deleteDeclinedCookies, getCookie, setCookie } from "../utils/cookies";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
    user:null,
    setUser:()=>{},
    loginAuthContext:()=>{},
    logoutAuthContext:()=>{},
    isAuthenticated:false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const cookieToken = getCookie('authToken');
        if (cookieToken) {
            const decodedToken = jwtDecode(cookieToken);
            setUser(decodedToken);
        }
    }, []);

    const loginAuthContext = (token) => {
        const user = jwtDecode(token);
        setUser(user);
        setCookie('authToken', token, 7);
    }

    const logoutAuthContext = () => {
        setUser(null);
        deleteDeclinedCookies(["authToken"]);
    }

    const context = {
        user,
        loginAuthContext,
        logoutAuthContext,
        isAuthenticated: !!user,
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>)
}