"use client";

import { useAuthContext } from "@/context/AuthContext";
import { extractTime } from "@/lib/ExtractTime";
import useConversation from "@/store/useConversation";

const Message = ({ message }) => {
    const { auth, loading } = useAuthContext();
    const { selectedConversation } = useConversation();

    if (loading) return null; // or a loading spinner if needed

    const fromMe = message.senderId === auth._id;
    const ChatClassName = fromMe ? 'chat-end' : 'chat-start';
    const imageUrl = fromMe ? auth.imageUrl : selectedConversation?.imageUrl;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
    const shakeClass = message.shouldShake ? "shake" : "";
    const CuratedTime = extractTime(message.createdAt);

    return (
        <div className={`chat ${ChatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-[3.8rem] rounded-full">
                    <img src={imageUrl} alt="" />
                </div>
            </div>
            <div className={`chat-bubble text-[1.4rem] text-white pb-2 ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
            <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">{CuratedTime}</div>
        </div>
    );
};

export default Message;
