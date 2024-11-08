"use client"

import { useAuthContext } from "@/context/AuthContext";
import { extractTime } from "@/lib/ExtractTime";
import useConversation from "@/store/useConversation";


const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const ChatClassName = fromMe ? 'chat-end' :  'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.imageUrl;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  const shakeClass = message.shouldShake ? "shake" : "";

  const CuratedTime = extractTime(message.createdAt);
  return (
    <div className={`chat ${ChatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-[3.8rem] rounded-full">
                <img src={profilePic} alt="" className="" />
            </div>
        </div>  
        <div className={`chat-bubble text-[1.4rem] text-white pb-2 ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>    
        <div className="chat-footer opacity-50 text-sm flex gap-1 items-center">{CuratedTime}</div>    
    </div>
  )
}

export default Message
