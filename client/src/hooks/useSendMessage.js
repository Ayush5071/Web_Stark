"use client"
import useConversation from "@/store/useConversation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "@/context/SocketContext"; // Import the socket context to emit messages

const useSentMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const { socket } = useSocketContext(); // Access the socket from context

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            console.log("try in use sen dmessage");
            const res = await fetch(`http://localhost:4000/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", 
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            console.log("data in send message",data);
            if (data.error) throw new Error(data.error);

            // Update the messages state
            setMessages((prevMessages) => [...prevMessages, data]);


            console.log(messages,"thses have been set");

            // Emit the new message to the socket for real-time update
            if (socket) {
                socket.emit("newMessage", data); // Emit the message to the socket
            }

        } catch (error) {
            toast.error(error.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSentMessage;
