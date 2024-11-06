import { useState } from "react";
import { toast } from "react-toastify";
import useAd from "@/hooks/useAd";

const ReviewSection = ({ adId, reviews, onReviewAdded }) => {
  const { addReview } = useAd();
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (reviewText.trim()) {
      const newReview = {
        user: "Current User", // Use real user data if available
        comment: reviewText,
      };

      try {
        // Submit review to API
        await addReview(adId, reviewText);

        // Dynamically add the review to the current list
        onReviewAdded(newReview);

        // Clear the textarea after submission
        setReviewText("");

        // Show success toast
        toast.success("Review added successfully!");
      } catch (err) {
        console.error("Error adding review:", err);
        toast.error("Failed to add review.");
      }
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <h3 className="text-2xl font-semibold text-gray-100 mb-6">Reviews</h3>
      {/* Display existing reviews */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-300">By: <strong>{review.user}</strong></p>
              <p className="text-gray-300 mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-300">No reviews yet.</p>
          </div>
        )}
      </div>

      {/* Add Review Form */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-100 mb-4">Add a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <textarea
            className="w-full p-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review..."
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
