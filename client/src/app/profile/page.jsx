"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle, FaUsers, FaCog } from "react-icons/fa";
import Profile from "@/components/profile/profile";
import Followers from "@/components/profile/followers";
import Following from "@/components/profile/following";
import Settings from "@/components/profile/setting";
import { useUserContext } from "@/context/UserContext";

const Dashboard = () => {
  const { profile, loading, error, getProfile } = useUserContext(); // Access context data and methods
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // Fetch profile when the component mounts
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]); // Only fetch profile if it's not available

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-[20vw] bg-gray-800 text-white p-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
          <button
            onClick={() => handleTabChange("profile")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md mb-4"
          >
            <FaUserCircle className="mr-2" /> Profile
          </button>
          <button
            onClick={() => handleTabChange("followers")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md mb-4"
          >
            <FaUsers className="mr-2" /> Followers
          </button>
          <button
            onClick={() => handleTabChange("following")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md mb-4"
          >
            <FaUsers className="mr-2" /> Following
          </button>
          <button
            onClick={() => handleTabChange("settings")}
            className="flex items-center w-full py-2 px-4 hover:bg-gray-700 rounded-md"
          >
            <FaCog className="mr-2" /> Settings
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <div className="bg-gray-900 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">Welcome to your Dashboard</h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          {activeTab === "profile" && <Profile />}
          {activeTab === "followers" && <Followers />}
          {activeTab === "following" && <Following />}
          {activeTab === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
