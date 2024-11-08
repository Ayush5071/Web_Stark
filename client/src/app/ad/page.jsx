"use client";
import React, { useState } from "react";


import Allads from "@/components/Ads/allAds/page";
import ActiveAds from "@/components/Ads/Activeads/page";
import CreateAds from "@/components/Ads/createAds/page";
import MyAds from "@/components/Ads/myAds/page";
import MyPurchases from "@/components/Ads/Purchased/page";

const DashboardLayout = () => {
  const [selected, setSelected] = useState("Allads");

  const handleNavigation = (page) => {
    setSelected(page);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-white shadow-2xl pt-6 pr-6 rounded-tr-lg rounded-br-lg overflow-y-auto mt-24 mb-8 pb-6">
        <div className="w-full bg-gradient-to-b from-[#0A2472] to-[#0E6BA8] text-white p-5 h-full rounded-tr-lg rounded-br-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
          <ul className="space-y-4">
            {[
              { label: "All Ads", key: "Allads" },
              { label: "Active Ads", key: "ActiveAds" },
              { label: "Create Ads", key: "CreateAds" },
              { label: "My Ads", key: "MyAds" },
              { label: "My Purchases", key: "MyPurchases" },
            ].map((item) => (
              <li key={item.key}>
                <button
                  className={`w-full text-left p-3 rounded-lg transition duration-300 
                  ${
                    selected === item.key
                      ? "bg-white text-[#0A2472] font-semibold"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => handleNavigation(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-grey-100 p-8 pt-24 overflow-y-auto">
        <div className="bg-gradient-to-b from-[#F5F7FA] to-[#EBF1F5] shadow-2xl rounded-lg p-6">
          {selected === "Allads" && <Allads />}
          {selected === "ActiveAds" && <ActiveAds />}
          {selected === "CreateAds" && <CreateAds />}
          {selected === "MyAds" && <MyAds />}
          {selected === "MyPurchases" && <MyPurchases />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
