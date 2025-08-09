import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../utils/socket.js";
import { useAuth } from './AuthContext';
import { get5LastMessages } from "../services/messageService.js";

const MessageContext = createContext({
    messages: [],
    setMessages: () => { },
    updateMessages:()=>{ }
});

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (user) {
            updateMessages();
        }
        console.log('message context');
    }, []);

    function updateMessages() {
        get5LastMessages()
            .then((data) => {
                setMessages(data);
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
    }

    const context = {
        messages, 
        setMessages,
        updateMessages
    }

    return (
        <MessageContext.Provider value={context}>
            {children}
        </MessageContext.Provider>)
}