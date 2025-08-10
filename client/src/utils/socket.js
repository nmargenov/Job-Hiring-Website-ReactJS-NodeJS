import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getMe } from "../services/userService";

export function useSocket(user, loginAuthContext, updateMessages, deleteAdminMessage) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        if (!user) return;

        const newSocket = io("http://localhost:5000", {
            withCredentials: true,
            query: { userId: user._id }
        });

        newSocket.on('roleChanged', async () => {

            getMe()
                .then((data) => {
                    loginAuthContext(data);
                }).catch((err) => {
                    console.log(err);
                })
        });

        newSocket.on('message', async () => {

            updateMessages(0)
        });

        newSocket.on('admin-deleted-message', async (data) => {
            deleteAdminMessage(data.businessID);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [user]);

    return socket;
}