"use client"

import useGetConversations from "@/hooks/useGetConversation";
import Conversation from "./Conversation"

const Conversations = () => {
  const {loading,conversations} = useGetConversations();
  console.log(conversations);
  return (
    <div className="py-2 flex flex-col overflow-y-auto">
      {conversations.map((e,idx) => (
        <Conversation key={e._id} 
        conversation={e}
        lastidx = {idx == conversations.length - 1}
        />
      ))}   
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}  
    </div>
  )
}

export default Conversations
