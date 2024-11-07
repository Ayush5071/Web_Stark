"use client";
import { useUserContext } from "@/context/UserContext";
import { useState, useEffect } from "react";

const Followers = () => {
  const { profile, followUser, unfollowUser, getProfile, loading } = useUserContext();
  const [followers, setFollowers] = useState([]);

  // Fetch profile and set followers when profile is available
  useEffect(() => {
    if (profile) {
      setFollowers(profile.followers || []); // Safely set followers or empty array
    }
  }, [profile]);

  // Function to handle follow action
  const handleFollow = async (userId) => {
    try {
      await followUser(userId); // Follow the user (just triggers API action)
      await getProfile(); // Fetch the updated profile after following the user
    } catch (err) {
      console.error("Error following user", err);
    }
  };

  // Function to handle unfollow action
  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId); // Unfollow the user (just triggers API action)
      await getProfile(); // Fetch the updated profile after unfollowing the user
    } catch (err) {
      console.error("Error unfollowing user", err);
    }
  };

  // Loading state check
  if (loading) {
    return <div>Loading profile...</div>;
  }

  // If no profile is found, show an error
  if (!profile) {
    return <div>No profile found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {followers.length > 0 ? (
        followers.map((follower) => (
          <div key={follower._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={follower.profileImg || "/default-profile.png"}
              alt={follower.username}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h3 className="text-center text-lg mt-2">{follower.username}</h3>
            <p className="text-center text-gray-500">{follower.email}</p>
            <div className="flex justify-center mt-4">
              {profile.following.includes(follower._id) ? (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-full"
                  onClick={() => handleUnfollow(follower._id)}
                >
                  Following
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-full"
                  onClick={() => handleFollow(follower._id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>No followers yet.</div>
      )}
    </div>
  );
};

export default Followers;
