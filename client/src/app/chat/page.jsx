"use client";

import ChatComponent from "@/components/Chat/ChatComponent";

const page = () => {
  return (
    <div className="h-screen w-screen bg-[url('/auth/back1.jpg')] flex justify-center items-center">
      <ChatComponent />
    </div>
  );
};

export default page;
