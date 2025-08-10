import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../utils/socket.js";
import { useAuth } from './AuthContext';
import { useMessage } from "./MessageContext.jsx";

const SocketContext = createContext({
});

export const SocketProvider = ({ children }) => {
    const { user, loginAuthContext } = useAuth();
    const { updateMessages, deleteAdminMessage } = useMessage();

    const socket = useSocket(user, loginAuthContext, updateMessages, deleteAdminMessage);

    const context = {

    }

    return (
        <SocketContext.Provider value={context}>
            {children}
        </SocketContext.Provider>)
}