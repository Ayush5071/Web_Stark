"use client";
import { useState } from "react";
import axios from "axios";

const useUser = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/auth/profile`, { withCredentials: true });
      console.log("Fetched Profile Data: ", data); // Ensure data is being fetched
      setProfile(data); // Set profile data
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error fetching profile";
      setError(errorMsg);
      console.error(errorMsg); // Log the error message
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API_URL}/user/profile`, profileData, { withCredentials: true });
      setProfile(data); // Update profile after successful profile update
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error updating profile";
      setError(errorMsg);
      console.error(errorMsg); // Log the error message
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (passwordData) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API_URL}/user/password`, passwordData, { withCredentials: true });
      console.log("Password updated: ", data); // Log password update success
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error updating password";
      setError(errorMsg);
      console.error(errorMsg); // Log the error message
    } finally {
      setLoading(false);
    }
  };

  const followUser = async (userId) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API_URL}/user/follow/${userId}`, {}, { withCredentials: true });
      console.log("Followed user: ", data); // Log follow success
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error following user";
      setError(errorMsg);
      console.error(errorMsg); // Log the error message
    } finally {
      setLoading(false);
    }
  };

  const unfollowUser = async (userId) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${API_URL}/user/unfollow/${userId}`, {}, { withCredentials: true });
      console.log("Unfollowed user: ", data); // Log unfollow success
      return data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error unfollowing user";
      setError(errorMsg);
      console.error(errorMsg); // Log the error message
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    error,
    getProfile,
    updateUserProfile,
    updatePassword,
    followUser,
    unfollowUser,
  };
};

export default useUser;
