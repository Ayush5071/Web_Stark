"use client";
import ActiveAuctions from "@/components/auction/ActiveAuctions";
import CreateAuction from "@/components/auction/CreateAuction";
import MyAuction from "@/components/auction/MyAuctions";
import WonAuctions from "@/components/auction/wonAuctions";
import React, { useState } from "react";
import { FaGavel, FaList, FaClipboardList, FaCog } from "react-icons/fa";

const AuctionDashboard = () => {
  const [activeTab, setActiveTab] = useState("createAuction");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[20vw] bg-gray-800 text-white p-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold text-center mb-6">Auction Dashboard</h2>
          <button
            onClick={() => handleTabChange("createAuction")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md mb-4"
          >
            <FaGavel className="mr-2" /> Create Auction
          </button>
          <button
            onClick={() => handleTabChange("activeAuctions")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md mb-4"
          >
            <FaList className="mr-2" /> Active Auctions
          </button>
          <button
            onClick={() => handleTabChange("myAuction")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md mb-4"
          >
            <FaClipboardList className="mr-2" /> My Auction
          </button>
          <button
            onClick={() => handleTabChange("Winnings")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md"
          >
            <FaCog className="mr-2" /> Winnings
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full">
        <div className="bg-gray-900 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">Welcome to your Auction Dashboard</h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          {activeTab === "createAuction" && <CreateAuction/>}
          {activeTab === "activeAuctions" && <ActiveAuctions/>}
          {activeTab === "myAuction" && <MyAuction/>}
          {activeTab === "Winnings" && <WonAuctions/>}
        </div>
      </div>
    </div>
  );
};

export default AuctionDashboard;
