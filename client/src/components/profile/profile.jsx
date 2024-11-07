"use client";
import React, { useEffect } from "react";
import { FaUserCircle, FaRegEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "@/context/UserContext"; 

const Profile = () => {
  const { profile, loading, error, getProfile, followUser, unfollowUser } = useUserContext();

  useEffect(() => {
    // Fetch the profile on component mount
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]); // Only call getProfile if profile is not available

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col items-center">
      {/* Profile Image */}
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gray-500 mb-4">
          {profile?.profileImg ? (
            <img
              src={profile.profileImg}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <FaUserCircle className="text-white w-full h-full" />
          )}
        </div>

        {/* Profile Details */}
        <h2 className="text-xl font-bold">{profile?.username}</h2>
        <p className="text-gray-600">{profile?.email}</p>
        <p className="text-gray-600">{profile?.location}</p>
        <p className="text-gray-600">
          {profile?.isVerified ? "Verified" : "Not Verified"} |{" "}
          {profile?.trusted ? "Trusted" : "Not Trusted"}
        </p>

        {/* Stats */}
        <div className="mt-4">
          <p className="text-gray-600">Auctions Created: {profile?.auctions?.length}</p>
          <p className="text-gray-600">Ads Created: {profile?.ads?.length}</p>
        </div>

        {/* Follow/Unfollow Buttons */}
        <div className="mt-6 flex space-x-4">
          {profile?.following?.length > 0 ? (
            <button
              onClick={() => unfollowUser(profile.following[0]._id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => followUser(profile?.followers[0]?._id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Follow
            </button>
          )}
        </div>
      </div>

      {/* Edit Profile Button */}
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
      >
        <FaRegEdit className="mr-2" />
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
