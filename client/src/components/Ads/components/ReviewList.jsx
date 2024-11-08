"use client";
import React, { useEffect, useState } from "react";
import useAd from "@/hooks/useAd";
import ReviewForm from "@/components/Ads/components/ReviewForm"; // Adjust the path as needed

const ReviewList = ({ adId }) => {
  const { adDetails, getIndividualAd } = useAd();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (adId && !adDetails) {
        await getIndividualAd(adId);
      }
    };

    fetchReviews();
  }, [adId, adDetails, getIndividualAd]);

  useEffect(() => {
    if (adDetails && adDetails.reviews) {
      setReviews(adDetails.reviews);
    }
  }, [adDetails]);

  // Callback function to re-fetch the reviews when a new review is added
  const handleReviewAdded = () => {
    getIndividualAd(adId); // Re-fetch the ad details, which includes the updated reviews
  };

  return (
    <div className="reviews-section">
      <h2>Reviews</h2>
      <ReviewForm adId={adId} onReviewAdded={handleReviewAdded} />
      {reviews.length > 0 ? (
        <ul className="review-list">
          {reviews.map((review, index) => (
            <li key={index} className="review-item">
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;
