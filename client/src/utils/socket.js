import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getMe } from "../services/userService";

export function useSocket(user, loginAuthContext, updateMessages) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        if (!user) return;

        const newSocket = io("http://localhost:5000", {
            withCredentials: true,
            query: { userId: user._id }
        });

        newSocket.on('roleChanged', async () => {
            console.log('role changed');

            getMe()
                .then((data) => {
                    loginAuthContext(data);
                    console.log(data);
                }).catch((err) => {
                    console.log(err);
                })
        });

         newSocket.on('message', async () => {
            console.log('message');

            updateMessages()
        });


        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [user]);

    return socket;
}