"use client";
import React, { useEffect } from "react";
import { FaUserCircle, FaRegEdit, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/UserContext";

const Profile = () => {
  const { profile, loading, error, getProfile, followUser, unfollowUser } =
    useUserContext();

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    toast.error(error);
    return <div>{error}</div>;
  }

  return (
    <div className="p-32 bg-gradient-to-b from-[#0A2472] to-[#0E6BA8] text-white min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="w-32 h-32 rounded-full bg-gray-100 mb-4 flex items-center justify-center">
          {profile?.profileImg ? (
            <img
              src={profile.profileImg}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUserCircle className="text-black w-full h-full" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2 text-black flex items-center">
          {profile?.username}
          {profile?.isVerified && (
            <FaCheckCircle className="ml-1 text-blue-600 h-4 w-4 mb-1" />
          )}
        </h2>
        <p className="text-gray-600 mb-1">{profile?.email}</p>
        <p className="text-gray-600 mb-1">{profile?.location}</p>
        <p className="text-gray-600 mb-4">
          {profile?.trusted ? "Trusted" : "Not Trusted"}
        </p>

        <div className="mb-6 text-gray-700">
          <p>Auctions Created: {profile?.auctions?.length}</p>
          <p>Ads Created: {profile?.ads?.length}</p>
        </div>

        <div className="flex space-x-4">
          {profile?.following?.length > 0 ? (
            <button
              onClick={() => {
                unfollowUser(profile.following[0]._id);
                toast.success("Unfollowed successfully!");
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => {
                followUser(profile?.followers[0]?._id);
                toast.success("Followed successfully!");
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Follow
            </button>
          )}
        </div>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <FaRegEdit className="mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
