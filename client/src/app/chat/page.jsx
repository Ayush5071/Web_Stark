"use client"

import MessageContainer from "@/components/Chat/MessageContainer"
import Sidebar from "@/components/Chat/Sidebar"

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[590px] h-[350px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer/>         
    </div>
  )
}

export default Home
