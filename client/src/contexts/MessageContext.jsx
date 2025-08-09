import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "../utils/socket.js";
import { useAuth } from './AuthContext';
import { getMessages } from "../services/messageService.js";

const MessageContext = createContext({
    messages: [],
    setMessages: () => { },
    updateMessages: () => { },
    hasUnreadMessages: false,
    unreadMessages: [],
    hasMore: true,
    setPage: () => { },
    page: 0,
    totalUnread:0,
    setTotalUnread:()=>{}
});

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const { user } = useAuth();

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [messages, setMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
    const [totalUnread, setTotalUnread] = useState(0);

    useEffect(() => {
        if (user) {
            updateMessages();
        }
    }, [page]);

    function updateMessages(arg) {
        const pages = arg || page;
        if (arg == '0') {
            if(page!==0){
                setPage(0);
                return;
            }
        }
        getMessages(pages)
            .then((data) => {
                if(pages===0){
                    setMessages(data.messages)
                }else{
                    setMessages(prev => [...prev, ...data.messages]);
                }
                setHasMore(data.hasMore)
                setTotalUnread(data.totalUnread);
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
        unreadMessages,
        hasMore,
        setPage,
        page,
        totalUnread,
        setTotalUnread
    }

    return (
        <MessageContext.Provider value={context}>
            {children}
        </MessageContext.Provider>)
}