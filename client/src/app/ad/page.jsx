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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-5 h-full">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 rounded-lg hover:bg-gray-600 ${
                selected === "Allads" ? "bg-gray-600" : ""
              }`}
              onClick={() => handleNavigation("Allads")}
            >
              All Ads
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-lg hover:bg-gray-600 ${
                selected === "ActiveAds" ? "bg-gray-600" : ""
              }`}
              onClick={() => handleNavigation("ActiveAds")}
            >
              Active Ads
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-lg hover:bg-gray-600 ${
                selected === "CreateAds" ? "bg-gray-600" : ""
              }`}
              onClick={() => handleNavigation("CreateAds")}
            >
              Create Ads
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-lg hover:bg-gray-600 ${
                selected === "MyAds" ? "bg-gray-600" : ""
              }`}
              onClick={() => handleNavigation("MyAds")}
            >
              My Ads
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-lg hover:bg-gray-600 ${
                selected === "MyPurchases" ? "bg-gray-600" : ""
              }`}
              onClick={() => handleNavigation("MyPurchases")}
            >
              My Purchases
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1 bg-gray-100 p-6 pt-32 h-full">
        {selected === "Allads" && <Allads />}
        {selected === "ActiveAds" && <ActiveAds />}
        {selected === "CreateAds" && <CreateAds />}
        {selected === "MyAds" && <MyAds />}
        {selected === "MyPurchases" && <MyPurchases />}
      </div>
    </div>
  );
};

export default DashboardLayout;
