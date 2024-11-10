"use client";
import React, { useEffect } from "react";
import useAd from "@/hooks/useAd";
import AdCard from "../components/Adcard";

const AllAds = () => {
  const { ads, loading, error, fetchAds, likeAd } = useAd();

  useEffect(() => {
    fetchAds();
  }, []);

  const handleLike = async (adId) => {
    await likeAd(adId);
    fetchAds();
  };

  const handleViewDetails = (adId) => {
    router.push(`/ads/${adId}`);
  };

  if (loading) return <div className="p-8 text-white">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-8 bg-gradient-to-b from-[#0A2472] to-[#0E6BA8] text-white min-h-screen rounded-lg">
      <h1 className="text-4xl font-bold mb-6">All Ads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <AdCard
            key={ad._id}
            ad={ad}
            onLike={handleLike}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default AllAds;
