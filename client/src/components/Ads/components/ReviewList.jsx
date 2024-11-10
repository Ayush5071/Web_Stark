"use client";
import React, { useEffect, useState } from "react";
import useAd from "@/hooks/useAd";

const ReviewList = ({ adId }) => {
  const { adDetails, getIndividualAd, loading, error } = useAd();
  const [reviews, setReviews] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  console.log("Received adId:", adId);

  useEffect(() => {
    const fetchAdDetails = async () => {
      if (adId && shouldRefetch) {
        await getIndividualAd(adId);
        setShouldRefetch(false); 
      }
    };

    fetchAdDetails();
  }, [adId, getIndividualAd, shouldRefetch]);

  useEffect(() => {
    if (adDetails?.reviews) {
      setReviews(adDetails.reviews);
    }
  }, [adDetails]);

  console.log("Fetched adDetails:", adDetails);

  const handleReviewAdded = () => {
    setShouldRefetch(true);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="reviews-section p-4 border-t border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {reviews.length > 0 ? (
        <ul className="review-list mt-4 space-y-3">
          {reviews.map((review, index) => (
            <li key={index} className="review-item p-3 bg-gray-100 rounded-md">
              <p className="text-gray-800">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
