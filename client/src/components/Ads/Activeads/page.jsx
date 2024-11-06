"use client";
import React, { useEffect } from "react";
import useAd from "@/hooks/useAd";
import AdCard from "../components/Adcard";
import { useRouter } from "next/navigation";

const ActiveAds = () => {
  const { ads, loading, error, fetchAds, likeAd } = useAd();
  const router = useRouter();

  useEffect(() => {
    fetchAds();
  }, []);

  const activeAds = ads.filter((ad) => ad.status === "active");

  const handleLike = async (adId) => {
    await likeAd(adId);
    fetchAds();
  };

  const handleViewDetails = (adId) => {
    router.push(`/ads/${adId}`);
  };

  if (loading) return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-white">Error: {error}</div>;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-7xl bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Active Ads</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {activeAds.length > 0 ? (
            activeAds.map((ad) => (
              <AdCard
                key={ad._id}
                ad={ad}
                onLike={() => handleLike(ad._id)}
                onViewDetails={() => handleViewDetails(ad._id)}
              />
            ))
          ) : (
            <p className="text-white text-center">No active ads available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveAds;
