"use client";
import React, { useState } from "react";
import useAd from "@/hooks/useAd";

const ReviewForm = ({ adId, onReviewAdded }) => {
  const { addReview } = useAd();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment) {
      console.log("No comment entered");
      return;
    }

    console.log("Submitting review for adId:", adId);
    console.log("Review comment:", comment);

    setIsSubmitting(true);
    try {
      await addReview(adId, comment);
      console.log("Review successfully added!");
      setComment(""); 

      if (onReviewAdded) onReviewAdded(); 
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Leave a Review</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
