"use client";
import React, { useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement } from "chart.js";
import useAd from "@/hooks/useAd";
import { useStoreContext } from "@/context/storeContext";
import { useAuction } from "@/context/AuctionContext";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard = () => {
  const { activeAuctions, wonAuctions, getActiveAuctions, getWonAuctions } = useAuction();
  const { stores, fetchStores, myStore } = useStoreContext();
  const { ads, fetchAds } = useAd();

  useEffect(() => {
    getActiveAuctions();
    getWonAuctions();
    fetchStores();
    fetchAds();
  }, [getActiveAuctions, getWonAuctions, fetchStores, fetchAds]);

  const auctionData = {
    labels: ["Auction 1", "Auction 2", "Auction 3", "Auction 4"],
    datasets: [
      {
        label: "Bid Amount",
        data: [300, 400, 500, 600],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const storeData = {
    labels: ["Store 1", "Store 2", "Store 3", "Store 4"],
    datasets: [
      {
        label: "Number of Ads",
        data: [3, 5, 2, 4],
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const adData = {
    labels: ["Ad 1", "Ad 2", "Ad 3", "Ad 4"],
    datasets: [
      {
        label: "Ad Views",
        data: [150, 200, 120, 250],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Active Auctions</h2>
          <Line data={auctionData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Store Ads</h2>
          <Bar data={storeData} />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ad Views</h2>
          <Pie data={adData} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Active Auctions List</h2>
          <ul className="space-y-3">
            {activeAuctions.length > 0 ? (
              activeAuctions.map((auction) => (
                <li key={auction._id} className="flex justify-between items-center text-gray-700">
                  <span>{auction.name}</span>
                  <span className="text-sm text-gray-500">{auction.startDate}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No active auctions available.</li>
            )}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Store</h2>
          <div className="text-lg text-gray-700">
            {myStore ? myStore.organizationName : "No Store Found"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
