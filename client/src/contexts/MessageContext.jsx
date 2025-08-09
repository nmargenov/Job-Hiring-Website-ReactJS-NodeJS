import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../utils/socket.js";
import { useAuth } from './AuthContext';
import { getMessages } from "../services/messageService.js";

const MessageContext = createContext({
    messages: [],
    setMessages: () => { },
    updateMessages: () => { },
    hasUnreadMessages: false,
    unreadMessages: []
});

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const { user } = useAuth();

    const [messages, setMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

    useEffect(() => {
        if (user) {
            updateMessages();
        }
        console.log('message context');
    }, []);

    function updateMessages() {
        getMessages()
            .then((data) => {
                setMessages(data);
                console.log(data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        setUnreadMessages(messages.filter(message => !message.read));
        setHasUnreadMessages(messages.length > 0 && messages.filter(message => !message.read).length > 0);
    }, [messages])

    const context = {
        messages,
        setMessages,
        updateMessages,
        hasUnreadMessages,
        unreadMessages
    }

    return (
        <MessageContext.Provider value={context}>
            {children}
        </MessageContext.Provider>)
}