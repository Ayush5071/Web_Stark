"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { useAuction } from "@/context/AuctionContext";
import { useSocketContext } from "@/context/SocketContext";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const Dashboard = () => {
  const { activeAuctions, getActiveAuctions } = useAuction();
  const { onlineUsers } = useSocketContext();

  const [auctionData, setAuctionData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchAuctionData = async () => {
      await getActiveAuctions();

      if (activeAuctions.length > 0) {
        setAuctionData({
          labels: activeAuctions.map((auction) => auction.title),
          datasets: [
            {
              label: "Highest Bid",
              data: activeAuctions.map((auction) => auction.highestBid.amount),
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,
            },
          ],
        });
      }
    };

    fetchAuctionData();
  }, [getActiveAuctions, activeAuctions]);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Active Auctions</h2>
          <Line data={auctionData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Online Users</h2>
          <ul className="list-disc ml-6">
            {onlineUsers.map((user) => (
              <li key={user.id} className="text-gray-700">
                {user.name} (ID: {user.id})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
