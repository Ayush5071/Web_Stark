"use client"

import MessageContainer from "./MessageContainer"
import Sidebar from "./Sidebar"

const ChatComponent = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[590px] h-[350px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer/>         
    </div>
  )
}

export default ChatComponent;
