import { useAuthContext } from '@/context/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


function RecommendationPage() {
  const router = useRouter();
  const { auth } = useAuthContext();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getRecommendation = async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = auth?._id;
      // Fetch similar users based on the userId
      const response = await axios.get(`http://127.0.0.1:5000/recommendation/${userId}`, { withCredentials: true });

      const productIdsList = [];
      // Loop through similar users and fetch recommended product ids
      for (let index = 0; index < response?.data?.similarUsers.length; index++) {
        const similarUser = response.data.similarUsers[index];
        const similarProductResponse = await axios.get(`http://localhost:4000/api/interaction/interactions`,similarUser);
        productIdsList.push(similarProductResponse?.data?.productId);
      }

      // Fetch ads for each product id
      const adsList = [];
      for (let index = 0; index < productIdsList.length; index++) {
        const adData = await axios.get(`http://localhost:4000/api/ad/unique/${productIdsList[index]}`);
        adsList.push(adData?.data, { id: productIdsList[index] });
      }
      setAds(adsList);
      
    } catch (error) {
      setError("Failed to load recommendations, please try again later.");
      console.log("Error in getting recommendations for the user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?._id) {
      getRecommendation();
    }
  }, [auth]);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center text-xl text-gray-600">Loading recommendations...</div>
      ) : error ? (
        <div className="text-center text-xl text-red-500">{error}</div>
      ) : ads.length > 0 ? (
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Recommended Products for You</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ads.map((ad, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-4 hover:shadow-xl transition-shadow duration-300">
                <img className="w-full h-48 object-cover mb-4" src={ad.imageurl} alt={ad.title} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ad.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{ad.productType}</p>
                <p className="text-sm text-gray-500 mb-2">Location: {ad.location}</p>
                <p className="text-lg text-gray-900 font-bold mb-4">${ad.price}</p>
                <button onClick={(e) => {
                  router.push(`/ad/${ad.id}`)
                } } className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full w-full hover:bg-blue-700 transition duration-300">
                  View Product
                </button>
                <div className="mt-4">
                  <p className="text-gray-700 font-semibold">Reviews:</p>
                  {ad.reviews?.length > 0 ? (
                    ad.reviews.map((review, reviewIndex) => (
                      <div key={reviewIndex} className="flex items-start space-x-2 mb-2">
                        <div className="text-gray-700 font-medium">{review.user.username}</div>
                        <p className="text-gray-500">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-600">No recommendations available.</div>
      )}
    </div>
  );
}

export default RecommendationPage;
