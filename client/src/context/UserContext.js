"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fetch Profile
  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/auth/profile`, { withCredentials: true });
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Profile (use this for local profile update after follow/unfollow)
  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Follow User
  const followUser = async (userId) => {
    try {
      const { data } = await axios.put(`${API_URL}/user/follow/${userId}`, {}, { withCredentials: true });
      console.log(data, "on following");
      await getProfile(); // Fetch updated profile after follow action
      return data;
    } catch (err) {
      console.error("Error following user", err);
    }
  };

  // Unfollow User
  const unfollowUser = async (userId) => {
    try {
      const { data } = await axios.put(`${API_URL}/user/unfollow/${userId}`, {}, { withCredentials: true });
      await getProfile(); // Fetch updated profile after unfollow action
      return data;
    } catch (err) {
      console.error("Error unfollowing user", err);
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const { data } = await axios.put(`${API_URL}/user/password`, passwordData, { withCredentials: true });
      console.log("Password updated successfully", data);
      return data;
    } catch (err) {
      console.error("Error updating password", err);
      throw err; 
    }
  };

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile]);

  return (
    <UserContext.Provider value={{ profile, setProfile: updateProfile, followUser, unfollowUser, loading, getProfile, updatePassword }}>
      {children}
    </UserContext.Provider>
  );
};
