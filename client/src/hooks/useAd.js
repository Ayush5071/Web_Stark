"use client";
import axios from "axios";
import { useState } from "react";

const useAd = () => {
  const [ads, setAds] = useState([]);
  const [myAds, setMyAds] = useState([]);
  const [purchasedAds, setPurchasedAds] = useState([]);
  const [activeAds, setActiveAds] = useState([]);
  const [adDetails, setAdDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch all ads
  const fetchAds = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/`, { method: "GET", credentials: "include" });
      if (!response.ok) throw new Error("Error fetching ads");

      const data = await response.json();
      setAds(data);
      return data;
    } catch (err) {
      setError(err.message || "Error fetching ads");
    } finally {
      setLoading(false);
    }
  };

  // Fetch details of a specific ad
  const getIndividualAd = async (adId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/unique/${adId}`, { method: "GET", credentials: "include" });
      if (!response.ok) throw new Error("Error fetching ad details");

      const data = await response.json();
      console.log(data,"-> fatch krte time mila");
      setAdDetails(data);
      return data;
    } catch (err) {
      setError(err.message || "Error fetching ad details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's ads
  const fetchMyAds = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/myAd`, { method: "GET", credentials: "include" });
      if (!response.ok) throw new Error("Error fetching my ads");

      const data = await response.json();
      setMyAds(data);
      return data;
    } catch (err) {
      setError(err.message || "Error fetching my ads");
    } finally {
      setLoading(false);
    }
  };

  // Fetch purchased ads
  const fetchPurchasedAds = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/mypurchases`, { method: "GET", credentials: "include" });
      if (!response.ok) throw new Error("Error fetching purchased ads");

      const data = await response.json();
      setPurchasedAds(data);
      return data;
    } catch (err) {
      setError(err.message || "Error fetching purchased ads");
    } finally {
      setLoading(false);
    }
  };

  // Fetch active ads
  const fetchActiveAds = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/active`, { method: "GET", credentials: "include" });
      if (!response.ok) throw new Error("Error fetching active ads");

      const data = await response.json();
      setActiveAds(data);
      return data;
    } catch (err) {
      setError(err.message || "Error fetching active ads");
    } finally {
      setLoading(false);
    }
  };

  const buyAd = async (adId, price) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/adbuy/${adId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error initiating purchase");

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error initiating purchase");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const verifyAndMarkAsSold = async (adId, orderId, paymentId, signature) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/sold/${adId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, payment_id: paymentId, signature }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error verifying and marking ad as sold");

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error verifying and marking ad as sold");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  // Delete an ad
  const deleteAd = async (adId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/${adId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error deleting ad");

      const data = await response.json();
      return data.message;
    } catch (err) {
      setError(err.message || "Error deleting ad");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Post a new ad
  const postAd = async (adData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adData),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error posting ad");

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error posting ad");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (adId, comment) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/review/${adId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error adding review");

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error adding review");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Like an ad
  const likeAd = async (adId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/like/${adId}`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error liking ad");

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error liking ad");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const makeInteraction = async(userId, prductId, interaction_type) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:4000/api/interaction/capture-interaction',{userId,prductId,interaction_type})

    } catch (err) {
      setError(err.message || "Error in making interaction");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    ads,
    myAds,
    makeInteraction,
    purchasedAds,
    activeAds,
    adDetails,
    loading,
    error,
    fetchAds,
    getIndividualAd,
    fetchMyAds,
    fetchPurchasedAds,
    fetchActiveAds,
    buyAd,
    verifyAndMarkAsSold,
    deleteAd,
    postAd,
    addReview,
    likeAd,
  };
};

export default useAd;
