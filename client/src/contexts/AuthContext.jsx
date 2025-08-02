import { createContext, useContext, useEffect, useState } from "react";
import { deleteDeclinedCookies, getCookie, setCookie } from "../utils/cookies";
import { jwtDecode } from "jwt-decode";
import { Loader } from "../components/shared/Loader/Loader.jsx"

const AuthContext = createContext({
    user: null,
    setUser: () => { },
    loginAuthContext: () => { },
    logoutAuthContext: () => { },
    isAuthenticated: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cookieToken = getCookie('authToken');
        if (cookieToken) {
            const decodedToken = jwtDecode(cookieToken);
            setUser(decodedToken);
        }
        setLoading(false);
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
            {loading ?
                <div className="global-spinner"><Loader /></div> : children}
        </AuthContext.Provider>)
}