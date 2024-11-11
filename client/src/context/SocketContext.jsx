"use client"
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { auth } = useAuthContext();

    useEffect(() => {
        if (auth && auth._id) {  // Check that auth and auth._id exist
            console.log("Authenticated user in SocketContext: ", auth);

            const newSocket = io("http://localhost:4000", {
                query: {
                    userId: auth._id
                }
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                if (newSocket) {
                    newSocket.close();
                }
            };
        } else {
            if (socket) {
                socket.close();
            }
            setSocket(null);
        }
    }, [auth]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
