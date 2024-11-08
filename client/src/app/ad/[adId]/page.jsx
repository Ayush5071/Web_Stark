"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAd from "@/hooks/useAd";
import ReviewList from "@/components/Ads/components/ReviewList";

const IndividualAdPage = () => {
  const { adId } = useParams();
  const { adDetails, getIndividualAd, loading, error } = useAd();
  const [reviewsUpdated, setReviewsUpdated] = useState(false);

  useEffect(() => {
    if (adId && !adDetails) {
      getIndividualAd(adId);
    }
  }, [adId, adDetails, getIndividualAd]);

  const handleReviewAdded = () => {
    setReviewsUpdated(true);
  };

  useEffect(() => {
    if (reviewsUpdated) {
      getIndividualAd(adId);
      setReviewsUpdated(false);
    }
  }, [reviewsUpdated, adId, getIndividualAd]);

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
          <ReviewList adId={adId} onReviewAdded={handleReviewAdded} />
        </div>
      ) : (
        <p>Ad not found</p>
      )}
    </div>
  );
};

export default IndividualAdPage;
