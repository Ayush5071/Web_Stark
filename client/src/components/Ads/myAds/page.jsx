"use client";
import React, { useEffect } from "react";
import useAd from "@/hooks/useAd";

const MyAds = () => {
  const { myAds, loading, error, fetchMyAds, deleteAd } = useAd();

  useEffect(() => {
    fetchMyAds();
  }, []);

  const handleDelete = async (adId) => {
    if (confirm("Are you sure you want to delete this ad?")) {
      try {
        await deleteAd(adId);
        fetchMyAds();
        alert("Ad deleted successfully!");
      } catch (err) {
        console.error("Failed to delete ad:", err);
        alert("Failed to delete ad");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-gradient-to-b from-[#0A2472] to-[#0E6BA8] rounded-lg min-h-screen">
      <h1 className="text-4xl font-bold mb-6">My Ads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myAds.map((ad) => (
          <div
            key={ad._id}
            className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-950">
                {ad.title}
              </h2>
              <button
                onClick={() => handleDelete(ad._id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700 mb-2">{ad.description}</p>
            <p className="text-lg font-semibold text-gray-700">
              Price: ₹{ad.price}
            </p>
            <p className="text-sm text-gray-600">Location: {ad.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAds;
