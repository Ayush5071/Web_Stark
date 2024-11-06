import React from "react";
import { useRouter } from "next/navigation";  
import { FaHeart } from "react-icons/fa";

const AdCard = ({ ad, onLike }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/ad/${ad._id}`);  
  };

  return (
    <div className="max-w-sm p-6 bg-gray-800 text-white rounded-lg shadow-lg relative hover:shadow-xl transition-shadow duration-300">
      <img
        src={ad.imageurl}
        alt={ad.title}
        className="rounded-md h-48 w-full object-cover mb-4"
      />
      <div>
        <h3 className="text-2xl font-semibold text-gray-100">{ad.title}</h3>
        <p className="text-sm text-gray-400 mt-1">{ad.location}</p>
        <p className="text-lg font-semibold mt-2 text-green-400">₹{ad.price}</p>
        <p className="text-sm text-gray-300 mt-2">{ad.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onLike(ad._id)}
            className="flex items-center space-x-1 text-pink-500 hover:text-pink-700 transition-colors duration-200"
          >
            <FaHeart />
            <span>{ad.likes.length}</span>
          </button>
        </div>
        <button
          onClick={handleViewDetails} 
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition-colors duration-200"
        >
          See More
        </button>
      </div>
      <div className="absolute top-2 right-2 bg-gray-700 px-2 py-1 text-xs text-white rounded-full">
        {ad.status}
      </div>
    </div>
  );
};

export default AdCard;
