"use client";
import ReviewForm from "@/components/Ads/components/ReviewForm";
import ReviewList from "@/components/Ads/components/ReviewList";
import RatingForm from "@/components/Ads/RatingForm";
import { useAuthContext } from "@/context/AuthContext";
import useAd from "@/hooks/useAd";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const IndividualAdPage = () => {
  const { auth } = useAuthContext();
  const { adId } = useParams();
  const { adDetails, getIndividualAd, buyAd, verifyAndMarkAsSold, loading, error } = useAd();
  const [reviewsUpdated, setReviewsUpdated] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  // when come to page first take rating of product from user
  const [rating, setRating] = useState(null); 

  const userId = auth?._id
  
  // Load Razorpay script only once
  useEffect(() => {
    if (!razorpayLoaded) {
      const loadRazorpayScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          setRazorpayLoaded(true);
          console.log("Razorpay script loaded successfully.");
        };
        script.onerror = () => {
          toast.error("Failed to load Razorpay script");
          console.error("Error loading Razorpay script.");
        };
        document.body.appendChild(script);
      };

      loadRazorpayScript();
    }

    if (adId && !adDetails) {
      console.log("Fetching ad details for adId:", adId);
      getIndividualAd(adId);
    }
  }, [adId, adDetails, razorpayLoaded, getIndividualAd]);

  useEffect(() => {
    if (reviewsUpdated) {
      console.log("Refreshing ad details after review added...");
      getIndividualAd(adId);
      setReviewsUpdated(false);
    }
  }, [reviewsUpdated, adId, getIndividualAd]);

  const handleReviewAdded = () => {
    console.log("Review added, updating reviews...");
    setReviewsUpdated(true);
  };

  const handleBuyNow = async () => {
    if (!razorpayLoaded) {
      console.error("Razorpay is not loaded yet.");
      toast.error("Razorpay is not loaded. Please try again.");
      return;
    }

    if (!adDetails || !adDetails.price) {
      console.error("Ad details or price is missing.");
      toast.error("Ad details are missing or incomplete.");
      return;
    }

    try {
      console.log("Initiating ad purchase for adId:", adId);
      const orderData = await buyAd(adId, adDetails.price);
      console.log("Order created successfully:", orderData);

      const paymentResult = await initiateRazorpay(orderData);
      console.log("Payment result received:", paymentResult);

      await verifyAndMarkAsSold(adId, paymentResult.razorpay_order_id, paymentResult.razorpay_payment_id, paymentResult.razorpay_signature);
      console.log("Ad marked as sold after successful payment.");
      // now interaction of buy now is making
      await makeInteraction({ userId, prductId: adId, interaction_type: 'purchase' ,rating:rating});
      console.log("Interaction of user recorded");
      
      toast.success("Purchase successful! Ad has been marked as sold.");
    } catch (err) {
      console.error("Error during purchase process:", err);
      toast.error("Purchase failed, please try again.");
    }
  };

  const initiateRazorpay = (orderData) => {
    return new Promise((resolve, reject) => {
      console.log("Opening Razorpay checkout...");

      if (!orderData || !orderData.id || !orderData.amount) {
        console.error("Invalid order data:", orderData);
        return reject("Invalid order data");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.id,
        handler: (response) => {
          console.log("Payment successful:", response);
          resolve(response);
        },
        prefill: { email: "user@example.com" }, // Prefill details
        theme: { color: "#3399cc" },
        modal: {
          escape: true,
          ondismiss: () => console.log("Payment modal dismissed"), // Handle modal dismiss
        },
      };

      try {
        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          console.error("Razorpay script not loaded correctly.");
          reject("Razorpay script not loaded");
        }
      } catch (error) {
        console.error("Error opening Razorpay checkout:", error);
        reject(error);
      }
    });
  };

  // when come to this page a click event is recorded
  
  
  const handleRatingSubmitted = (newRating) => {
    setRating(newRating);
    makeInteraction({ userId, prductId: adId, interaction_type: 'click',rating:newRating });
  
    console.log(`User rated: ${newRating} stars`);
    // Optionally, you can send this rating to the backend here
  };

  if (rating==null) {
    return (
    <div className="flex flex-col items-center justify-center">
        <RatingForm onRatingSubmitted={handleRatingSubmitted}  />
      </div>
  )
}
  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      {adDetails ? (
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Ad image and details */}
          <div className="md:w-1/2 p-4 flex justify-center">
            <img src={adDetails.imageurl} alt={adDetails.title} className="w-full max-h-96 object-cover rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/2 p-6 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">{adDetails.title}</h2>
            <p className="text-gray-600">{adDetails.description}</p>
            <p className="text-gray-800 font-semibold">Price: ₹{adDetails.price}</p>
            <button onClick={handleBuyNow} className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg">
              Buy Now
            </button>
            <ReviewList adId={adId} />
            <ReviewForm adId={adId} onReviewAdded={handleReviewAdded} />
          </div>
        </div>
      ) : (
        <p>No ad details found.</p>
      )}
    </div>
  );
};

export default IndividualAdPage;
