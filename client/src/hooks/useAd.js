"use client";
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

  const getIndividualAd = async (adId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/unique/${adId}`, { method: "GET", credentials: "include" });
      if (!response.ok) throw new Error("Error fetching ad details");

      const data = await response.json();
      setAdDetails(data);
      return data;
    } catch (err) {
      setError(err.message || "Error fetching ad details");
    } finally {
      setLoading(false);
    }
  };

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

  const markAdAsSold = async (adId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/sold/${adId}`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error marking ad as sold");

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error marking ad as sold");
      throw err;
    } finally {
      setLoading(false);
    }
  };

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

  const postAd = async (adData, image) => {
    const formData = new FormData();
    for (const key in adData) {
      formData.append(key, adData[key]);
    }
    formData.append("image", image);

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/ad/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) throw new Error("Error creating ad");

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Error creating ad");
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

  return {
    ads,
    myAds,
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
    markAdAsSold,
    deleteAd,
    postAd,
    addReview,
    likeAd,
  };
};

export default useAd;
