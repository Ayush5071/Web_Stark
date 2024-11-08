"use client"
import useConversation from "@/store/useConversation";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            if (!selectedConversation?._id) {
                return;
            }
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:4000/api/message/${selectedConversation?._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                console.log(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages(); 
    }, [selectedConversation?._id, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
