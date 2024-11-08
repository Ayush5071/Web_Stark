"use client";
import React, { useEffect } from "react";
import useAd from "@/hooks/useAd";
import AdCard from "../components/Adcard";

const MyPurchases = () => {
  const { purchasedAds, loading, error, fetchPurchasedAds } = useAd();

  useEffect(() => {
    fetchPurchasedAds();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-gradient-to-b from-[#0A2472] to-[#0E6BA8] text-white min-h-screen rounded-lg">
      <h1 className="text-4xl font-bold mb-6">My Purchases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedAds.length ? (
          purchasedAds.map((ad) => <AdCard key={ad._id} ad={ad} />)
        ) : (
          <p>No purchased ads found.</p>
        )}
      </div>
    </div>
  );
};

export default MyPurchases;
