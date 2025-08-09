import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../utils/socket.js";
import { useAuth } from './AuthContext';
import { get5LastMessages } from "../services/messageService.js";
import { useMessage } from "./MessageContext.jsx";

const SocketContext = createContext({
});

export const SocketProvider = ({ children }) => {
    const { user, loginAuthContext } = useAuth();
    const { updateMessages } = useMessage();

    const socket = useSocket(user, loginAuthContext, updateMessages);

    const context = {
        
    }

    return (
        <SocketContext.Provider value={context}>
            {children}
        </SocketContext.Provider>)
}