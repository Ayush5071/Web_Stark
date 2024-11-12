"use client";
import React, { useState } from "react";
import Create from "@/components/lnf/Create/page";
import Unclaimed from "@/components/lnf/Unclaimed/page";
import Claimed from "@/components/lnf/Claimed/page";
import MyClaimed from "@/components/lnf/MyClaimed/page";
import MyUploaded from "@/components/lnf/MyUploaded/page";

const DashboardLayout = () => {
  const [selected, setSelected] = useState("Create"); // Set default to "Create"

  const handleNavigation = (page) => {
    setSelected(page);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-1/5 bg-white shadow-2xl pt-6 pr-6 rounded-tr-lg rounded-br-lg overflow-y-auto mt-24 mb-8 pb-6">
        <div className="w-full bg-gradient-to-b from-[#0A2472] to-[#0E6BA8] text-white p-5 h-full rounded-tr-lg rounded-br-lg">
          <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
          <ul className="space-y-4">
            {[
              { label: "Create", key: "Create" },
              { label: "Unclaimed", key: "Unclaimed" },
              { label: "Claimed", key: "Claimed" },
              { label: "My Claimed", key: "MyClaimed" },
              { label: "My Uploaded", key: "MyUploaded" },
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

      <div className="flex-1 bg-grey-100 p-8 pt-24 overflow-y-auto">
        <div className="bg-gradient-to-b from-[#F5F7FA] to-[#EBF1F5] shadow-2xl rounded-lg p-6">
          {selected === "Create" && <Create />}
          {selected === "Unclaimed" && <Unclaimed />}
          {selected === "Claimed" && <Claimed />}
          {selected === "MyClaimed" && <MyClaimed />}
          {selected === "MyUploaded" && <MyUploaded />}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
