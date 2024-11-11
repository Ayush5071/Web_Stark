"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";  // To manage cookies

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Get user data directly from the token in the cookie
  const getAuthFromCookie = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
        console.log("Decoded token:", decodedToken);
        setAuth(decodedToken.user);  // Assuming your token contains user data
      } catch (err) {
        console.error("Error decoding token", err);
      }
    } else {
      console.log("No token found in cookies.");
    }
  };

  // Fetch Profile
  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Make sure to include cookies in the request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      console.log("Profile fetched successfully:", data);
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile", err);
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
  };

  // Follow User
  const followUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/follow/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("Followed user:", data);
      await getProfile();
      return data;
    } catch (err) {
      console.error("Error following user", err);
    }
  };

  // Unfollow User
  const unfollowUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/unfollow/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      await getProfile();
      return data;
    } catch (err) {
      console.error("Error unfollowing user", err);
    }
  };

  // Update Password
  const updatePassword = async (passwordData) => {
    try {
      const response = await fetch(`${API_URL}/user/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (cookies)
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();
      console.log("Password updated successfully", data);
      return data;
    } catch (err) {
      console.error("Error updating password", err);
      throw err;
    }
  };

  useEffect(() => {
    getAuthFromCookie();
    if (auth && !profile) {
      getProfile();
    }
  }, [auth, profile]);

  return (
    <UserContext.Provider value={{ auth, setAuth, profile, setProfile: updateProfile, followUser, unfollowUser, loading, getProfile, updatePassword }}>
      {children}
    </UserContext.Provider>
  );
};
