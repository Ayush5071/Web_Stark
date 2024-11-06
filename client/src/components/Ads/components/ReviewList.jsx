"use client";
import useAd from "@/hooks/useAd";
import React, { useEffect, useState } from "react";

const ReviewList = ({ adId }) => {
  const { adDetails, getIndividualAd } = useAd();
  const [reviews, setReviews] = useState([]);

  // Fetch reviews for the ad when the component mounts or adDetails change
  useEffect(() => {
    const fetchReviews = async () => {
      if (adId) {
        await getIndividualAd(adId); // Fetch ad details, including reviews
      }
    };

    fetchReviews();
  }, [adId, getIndividualAd]);

  // Extract reviews from the ad details
  useEffect(() => {
    if (adDetails && adDetails.reviews) {
      setReviews(adDetails.reviews);
    }
  }, [adDetails]);

  return (
    <div className="reviews-section">
      <h2>Reviews</h2>
      {reviews && reviews.length > 0 ? (
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
