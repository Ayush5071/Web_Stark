"use client"
import { useEffect } from "react";
import notificationSound from "../assets/sounds/notification.mp3";
import useConversation from "@/store/useConversation";
import { useSocketContext } from "@/context/SocketContext";

const useListenMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages((prevMessages) => [...prevMessages, newMessage]); 
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);

    return null;
};

export default useListenMessage;
