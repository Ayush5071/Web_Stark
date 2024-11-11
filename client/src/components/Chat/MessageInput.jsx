"use client"

import useSentMessage from "@/hooks/useSendMessage";
import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";

const MessageInput = () => {
  const [message,setMessage] = useState("");
  const {loading,sendMessage} = useSentMessage();
  const handleFormSubmit = async(e) =>{
    e.preventDefault();
    if(!message) return;
    await sendMessage(message);
    setMessage("")
  }
  return (
    <div className="px-4 my-3">
        <div className="w-full relative">
          <form onSubmit={handleFormSubmit}>
            <input
             type="text" 
             className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
             placeholder="Send a message"
             value={message}
             onChange={(e)=> setMessage(e.target.value) }
            />
            <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                {loading?<span className="loader loader-spinner mx-auto"></span>:<LuSendHorizonal />}
            </button>
          </form>
        </div>      
    </div>
  )
}

export default MessageInput
