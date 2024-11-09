import useConversation from "@/store/useConversation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) {
                console.log("No conversation selected");
                setMessages([]);  // Reset messages to an empty array if no conversation
                return;
            }

            setLoading(true);
            try {
                console.log(selectedConversation._id, " -> id of whom to send message");
                console.log("Fetching messages for conversation:", selectedConversation._id);
                const res = await fetch(`http://localhost:4000/api/message/get/${selectedConversation._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });

                const data = await res.json();
                console.log("Messages fetched:", data);

                if (data.error) throw new Error(data.error);

                // Append new messages
                setMessages(() => data); // Use this if data is a complete list of messages
            } catch (error) {
                console.error("Error fetching messages:", error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messages: messages || [], loading }; // Ensure messages is always an array
};

export default useGetMessages;
