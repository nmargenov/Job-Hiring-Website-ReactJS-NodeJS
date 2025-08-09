import { createContext, useContext, useEffect, useState } from "react";
import { deleteDeclinedCookies, getCookie, setCookie } from "../utils/cookies";
import { jwtDecode } from "jwt-decode";
import { Loader } from "../components/shared/Loader/Loader.jsx"
import { useSocket } from "../utils/socket.js";

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

    const loginAuthContext = (token) => {
        const user = jwtDecode(token);
        setUser(user);
        setCookie('authToken', token, 7);
    }

    const socket = useSocket(user, loginAuthContext);
    useEffect(() => {
        const cookieToken = getCookie('authToken');
        if (cookieToken) {
            const decodedToken = jwtDecode(cookieToken);
            setUser(decodedToken);
        }
        setLoading(false);

    }, []);

    function connectToSocket() {
        console.log("connecting to socket");
        socket.on('roleChanged', async () => {
            console.log('role changed');
        })
    }

    const logoutAuthContext = () => {
        setUser(null);
        deleteDeclinedCookies(["authToken"]);
    }

    const context = {
        user,
        socket,
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