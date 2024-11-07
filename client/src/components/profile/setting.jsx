"use client";
import { useUserContext } from "@/context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
  const { profile, getProfile, loading, updatePassword } = useUserContext();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profileImg: ""
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        email: profile.email || "",
        profileImg: profile.profileImg || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profileImg: file // Store the file directly
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      if (formData.profileImg instanceof File) {
        formDataToSend.append("image", formData.profileImg);
      }

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        formDataToSend,
        { 
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );
      console.log(data);
      await getProfile(); // Refresh the profile after update
    } catch (err) {
      console.error("Error updating profile", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setIsPasswordUpdating(true);
    try {
      const passwordUpdateData = {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      };

      const { data } = await updatePassword(passwordUpdateData);
      console.log(data);
      setError(null);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError("Failed to update password.");
      console.error("Error updating password", err);
    } finally {
      setIsPasswordUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading profile...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">Update Profile</h2>
      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Profile Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold text-center mt-8">Change Password</h2>
      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <div>
          <label className="block font-medium">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block font-medium">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          />
        </div>

        <div>
          <label className="block font-medium">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="text-center">
          <button
            type="submit"
            disabled={isPasswordUpdating}
            className="bg-blue-600 text-white px-6 py-2 rounded-full"
          >
            {isPasswordUpdating ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
