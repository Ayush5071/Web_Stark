"use client";
import { useState } from 'react';
import axios from 'axios';

const useAd = () => {
    const [ads, setAds] = useState([]);
    const [myAds, setMyAds] = useState([]);
    const [purchasedAds, setPurchasedAds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchAds = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/ad/`, { withCredentials: true });
            setAds(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.error || 'Error fetching ads');
        } finally {
            setLoading(false);
        }
    };

    const postAd = async (adData, image) => {
        const formData = new FormData();
        for (const key in adData) {
            formData.append(key, adData[key]);
        }
        formData.append('image', image);

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/ad/`, formData, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.error || 'Error creating ad');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const fetchMyAds = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/ad/myAd`, { withCredentials: true });
            console.log(response,">>>>>>>>>>>>>>>>>>>");
            setMyAds(response.data.myAds);
            console.log("My ads ->",myAds);
            return response.data.myAds;
        } catch (err) {
            setError(err.response?.data?.error || 'Error fetching my ads');
        } finally {
            setLoading(false);
        }
    };

    const fetchPurchasedAds = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/ad/mypurchases`, { withCredentials: true });
            setPurchasedAds(response.data.purchasedAds);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.error || 'Error fetching purchased ads');
        } finally {
            setLoading(false);
        }
    };

    const markAdAsSold = async (adId) => {
        setLoading(true);
        try {
            const response = await axios.patch(`${API_URL}/ad/sold/${adId}`, {}, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.error || 'Error marking ad as sold');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteAd = async (adId) => {
        setLoading(true);
        try {
            const response = await axios.delete(`${API_URL}/ad/${adId}`, { withCredentials: true });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.error || 'Error deleting ad');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        ads,
        myAds,
        purchasedAds,
        loading,
        error,
        fetchAds,
        postAd,
        fetchMyAds,
        fetchPurchasedAds,
        markAdAsSold,
        deleteAd,
    };
};

export default useAd;
