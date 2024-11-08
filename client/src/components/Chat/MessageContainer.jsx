// components/Chat/MessageContainer.jsx
"use client";
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "@/context/AuthContext";
import useConversation from "@/store/useConversation";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className="md:min-w-[700px] flex flex-col">
            {!selectedConversation ? <NoChatSelected /> : (
                <>
                    <div className="bg-slate-500 px-4 py-2 mb-2">
                        <span className="label-text text-base">To: </span>
                        <span className="text-gray-900 mx-1 text-lg font-bold">
                            {selectedConversation?.username}
                        </span>
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

const NoChatSelected = () => {
    const { auth } = useAuthContext();
    console.log("Auth in NoChatSelected:", auth);

    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-4xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {auth?.username || "Guest"} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-8xl text-center" />
            </div>
        </div>
    );
};

export default MessageContainer;
