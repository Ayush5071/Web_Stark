"use client";
import { useState } from "react";
import axios from "axios";

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
      const { data } = await axios.get(`${API_URL}/ad/`, { withCredentials: true });
      setAds(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching ads");
    } finally {
      setLoading(false);
    }
  };

  const getIndividualAd = async (adId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/ad/unique/${adId}`, { withCredentials: true });
      setAdDetails(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching ad details");
    } finally {
      setLoading(false);
    }
  };

  const fetchMyAds = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/ad/myAd`, { withCredentials: true });
      setMyAds(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching my ads");
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchasedAds = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/ad/mypurchases`, { withCredentials: true });
      setPurchasedAds(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching purchased ads");
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveAds = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/ad/active`, { withCredentials: true });
      setActiveAds(data);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching active ads");
    } finally {
      setLoading(false);
    }
  };

  const markAdAsSold = async (adId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/ad/sold/${adId}`, {}, { withCredentials: true });
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error marking ad as sold");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAd = async (adId) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`${API_URL}/ad/${adId}`, { withCredentials: true });
      return data.message;
    } catch (err) {
      setError(err.response?.data?.error || "Error deleting ad");
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
      const { data } = await axios.post(`${API_URL}/ad/`, formData, { withCredentials: true });
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error creating ad");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (adId, comment) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/ad/review/${adId}`, { comment }, { withCredentials: true });
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error adding review");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const likeAd = async (adId) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/ad/like/${adId}`, {}, { withCredentials: true });
      return data;
    } catch (err) {
      setError(err.response?.data?.error || "Error liking ad");
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
