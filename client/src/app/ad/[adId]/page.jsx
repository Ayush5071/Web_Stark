"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAd from "@/hooks/useAd"; // Adjust the path as needed
import ReviewList from "@/components/Ads/components/ReviewList";
import ReviewForm from "@/components/Ads/components/ReviewForm"; // Adjust the path as needed

const IndividualAdPage = () => {
  const { adId } = useParams();  // Fetch the adId from the URL params
  const { adDetails, getIndividualAd, loading, error } = useAd();

  useEffect(() => {
    // Only call the function if adId is available and adDetails is not already loaded
    if (adId && !adDetails) {
      getIndividualAd(adId);  // Fetch ad details only when adId is present
    }
  }, [adId, adDetails, getIndividualAd]);  // Add adDetails to dependencies to prevent repeated calls

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="ad-details-page">
      {adDetails ? (
        <div>
          <h1>{adDetails.title}</h1>
          <p>{adDetails.description}</p>
          <p>Price: {adDetails.price}</p>
          <img src={adDetails.imageurl} alt={adDetails.title} />
          <ReviewForm adId={adId} />
          <ReviewList adId={adId} />
        </div>
      ) : (
        <p>Ad not found</p>
      )}
    </div>
  );
};

export default IndividualAdPage;
