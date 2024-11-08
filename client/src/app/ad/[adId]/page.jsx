"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import useAd from "@/hooks/useAd";
import ReviewList from "@/components/Ads/components/ReviewList";
import ReviewForm from "@/components/Ads/components/ReviewForm";

const IndividualAdPage = () => {
  const { adId } = useParams(); // Fetch the adId from the URL params
  const { adDetails, getIndividualAd, loading, error } = useAd();
  const [reviewsUpdated, setReviewsUpdated] = useState(false);

  useEffect(() => {
    if (adId && !adDetails) {
      getIndividualAd(adId); // Fetch ad details only when adId is present
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
    return <p className="text-center text-lg text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-10">
      {adDetails ? (
        <div className="w-full max-w-2xl bg-whiterounded-lg overflow-hidden lg:max-w-lg md:w-11/12 sm:w-full text-black text-center border-gray-400 border rounded-lg">
          <div className="pt-5">
            <h1 className="text-3xl font-bold mb-2">{adDetails.title}</h1>
          </div>

          <div className="p-4">
            <img
              src={adDetails.imageurl}
              alt={adDetails.title}
              className="w-full h-80 object-cover rounded-lg mb-5 shadow-lg"
            />
          </div>

          <p className="text-lg font-semibold mb-2">
            Price: ${adDetails.price}
          </p>
          <p className="text-lg mb-4">{adDetails.location}</p>
          {/* <p className="text-lg mb-3">{adDetails.likes}</p> */}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">Ad not found</p>
      )}

      {adDetails && (
        <>
          <hr className="my-5 w-[90%]  border-gray-300" />
          <div className="w-full max-w-2xl rounded-lg overflow-hidden lg:max-w-lg md:w-11/12 sm:w-full text-black">
            <div className="p-4 mb-4">
              <ReviewForm adId={adId} />
            </div>
          </div>
          <hr className="my-5 w-[90%]  border-gray-300" />
          <div className="w-full max-w-2xl rounded-lg overflow-hidden lg:max-w-lg md:w-11/12 sm:w-full text-black">
            <div className="p-4">
              <ReviewList adId={adId} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualAdPage;
