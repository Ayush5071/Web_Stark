"use client";
import { useEffect, useContext } from "react";
import { toast } from "react-hot-toast";
import { useAuction } from "@/context/AuctionContext";
import useAd from "@/hooks/useAd";
import { useStoreContext } from "@/context/storeContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register the necessary chart components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const Dashboard = () => {
  const {
    activeAuctions,
    getActiveAuctions,
    loading: auctionLoading,
    error: auctionError,
  } = useAuction();
  const {
    stores,
    fetchStores,
    loading: storeLoading,
    error: storeError,
  } = useStoreContext();
  const {
    ads,
    fetchAds,
    loading: adLoading,
    error: adError,
  } = useAd();

  // Fetch data if not already available
  useEffect(() => {
    if (!activeAuctions || activeAuctions.length === 0) {
      getActiveAuctions();
    }
    if (!stores || stores.length === 0) {
      fetchStores();
    }
    if (!ads || ads.length === 0) {
      fetchAds();
    }
  }, [activeAuctions, stores, ads, getActiveAuctions, fetchStores, fetchAds]);

  // Handle errors
  useEffect(() => {
    if (auctionError) {
      toast.error(`Error fetching auctions: ${auctionError}`);
    }
    if (storeError) {
      toast.error(`Error fetching stores: ${storeError}`);
    }
    if (adError) {
      toast.error(`Error fetching ads: ${adError}`);
    }
  }, [auctionError, storeError, adError]);

  // If data is still loading, show loading state
  if (auctionLoading || storeLoading || adLoading) {
    return <div>Loading...</div>;
  }

  // Graph data (using random data for simplicity)
  const auctionData = {
    labels: activeAuctions ? activeAuctions.map((auction) => auction.title) : [],
    datasets: [
      {
        label: "Current Bid",
        data: activeAuctions ? activeAuctions.map(() => Math.floor(Math.random() * 1000)) : [], // Randomized data for illustration
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  const storeData = {
    labels: stores ? stores.map((store) => store.name) : [],
    datasets: [
      {
        label: "Number of Ads",
        data: stores ? stores.map((store) => store.ads.length) : [],
        borderColor: "rgba(153,102,255,1)",
        fill: false,
      },
    ],
  };

  const adData = {
    labels: ads ? ads.map((ad) => ad.title) : [],
    datasets: [
      {
        label: "Ad Prices",
        data: ads ? ads.map(() => Math.floor(Math.random() * 500)) : [], // Randomized data for illustration
        borderColor: "rgba(255,159,64,1)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Auction Bids Over Time',
      },
    },
  };

  return (
    <div className="dashboard bg-zinc-800 min-h-screen text-white py-10">
      <div className="container mx-auto space-y-10 px-4">
        {/* Data Summary Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-container p-6 rounded-xl shadow-xl backdrop-blur-md bg-white/30 border border-white/40">
            <h3 className="text-lg text-gray-700 dark:text-white">Active Auctions</h3>
            <div className="text-4xl font-semibold text-gray-900 dark:text-white">
              {activeAuctions.length}
            </div>
          </div>

          <div className="glass-container p-6 rounded-xl shadow-xl backdrop-blur-md bg-white/30 border border-white/40">
            <h3 className="text-lg text-gray-700 dark:text-white">My Stores</h3>
            <div className="text-4xl font-semibold text-gray-900 dark:text-white">
              {stores.length}
            </div>
          </div>

          <div className="glass-container p-6 rounded-xl shadow-xl backdrop-blur-md bg-white/30 border border-white/40">
            <h3 className="text-lg text-gray-700 dark:text-white">Active Ads</h3>
            <div className="text-4xl font-semibold text-gray-900 dark:text-white">
              {ads.length}
            </div>
          </div>
        </div>

        {/* Graphs Section */}
        <section className="graphs-container mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Graph 1: Auction Bids */}
          <div className="graph-container bg-zinc-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">Auction Bids Over Time</h2>
            <div className="w-full h-72 md:h-96">
              <Line data={auctionData} options={options} />
            </div>
          </div>

          {/* Graph 2: Store Ads */}
          <div className="graph-container bg-zinc-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">Store Ads Over Time</h2>
            <div className="w-full h-72 md:h-96">
              <Line data={storeData} options={options} />
            </div>
          </div>

          {/* Graph 3: Ad Prices */}
          <div className="graph-container bg-zinc-900 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">Ad Prices Over Time</h2>
            <div className="w-full h-72 md:h-96">
              <Line data={adData} options={options} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
