"use client"
import useConversation from "@/store/useConversation";
import { useState } from "react";
import toast from "react-hot-toast";


const useSentMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:4000/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", 
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error);

            setMessages((prevMessages) => [...prevMessages, data]);
        } catch (error) {
            toast.error(error.message || "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSentMessage;
