"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAd from "@/hooks/useAd";
import { useStoreContext } from "@/context/storeContext";

const MyStores = () => {
  const { myStore, fetchMyStore, addAdToStore, removeAdFromStore, deleteStore } = useStoreContext();
  const { myAds, fetchMyAds } = useAd();
  const [addedAds, setAddedAds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMyStore();
      await fetchMyAds();
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (myStore && Array.isArray(myStore) && myStore.length > 0) {
      setAddedAds(new Set(myStore[0].ads.map(ad => ad._id))); // Use ad._id for unique keys
    }
  }, [myStore]);

  const handleAddAd = async (adId) => {
    if (!addedAds.has(adId)) {
      try {
        await addAdToStore(adId, myStore[0].organizationName);
        setAddedAds((prev) => new Set(prev).add(adId));
        toast.success("Ad added to store!");
      } catch (error) {
        toast.error("Error adding ad to store.");
      }
    }
  };

  const handleRemoveAd = async (adId) => {
    try {
      await removeAdFromStore(adId, myStore[0].organizationName);
      setAddedAds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(adId);
        return newSet;
      });
      toast.success("Ad removed from store!");
    } catch (error) {
      toast.error("Error removing ad from store.");
    }
  };

  const handleDeleteStore = async (storeId) => {
    try {
      await deleteStore(storeId);
      toast.success("Store deleted successfully");
    } catch (error) {
      toast.error("Error deleting store.");
    }
  };

  if (loading) {
    return <p className="text-gray-500 text-center">Loading stores...</p>;
  }

  return (
    <div className="my-stores container mx-auto p-8">
      {myStore && myStore.length > 0 ? (
        myStore.map((store) => (
          <div key={`${store._id}-${Math.random()}`} className="store-card border border-gray-300 p-6 rounded-lg shadow-lg mb-8 flex flex-col md:flex-row justify-between">
            <div className="store-details flex-grow">
              <h3 className="text-2xl font-bold mb-2">{store.organizationName}</h3>
              <p className="text-gray-700 mb-4">
                Owned by: {store.user?.username || "Username not available"}
              </p>
              <button
                onClick={() => handleDeleteStore(store._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-4"
              >
                Delete Store
              </button>

              <div className="ads-section mt-4">
                <h4 className="text-lg font-semibold mb-2">Store Ads</h4>
                <div className="max-h-64 overflow-y-auto border p-4 rounded-lg">
                  {store.ads && Array.isArray(store.ads) && store.ads.length > 0 ? (
                    store.ads.map((ad) => (
                      <div key={`${ad._id}-${Math.random()}`} className="ad-item flex items-center justify-between p-2 border-b last:border-0">
                        <span>{ad.title || `Ad #${ad._id}`}</span>
                        <button
                          onClick={() => handleRemoveAd(ad._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No ads in this store</p>
                  )}
                </div>
              </div>
            </div>

            <div className="my-ads mt-8 md:mt-0 md:ml-8 flex-shrink-0 w-full md:w-1/3">
              <h4 className="text-xl font-semibold mb-4">My Ads</h4>
              <div className="ads-list grid gap-4">
                {Array.isArray(myAds) && myAds.length > 0 ? (
                  myAds.map((ad) => (
                    <div key={`${ad._id}-${Math.random()}`} className="ad-card border border-gray-300 p-4 rounded-lg shadow-sm flex flex-col items-start">
                      <img src={ad.imageurl} alt={ad.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
                      <p className="text-lg font-bold text-gray-800 mb-2">{ad.title}</p>
                      <p className="text-gray-600 mb-2">{ad.description}</p>
                      <p className="text-gray-800 font-semibold mb-4">${ad.price}</p>
                      <button
                        onClick={() => handleAddAd(ad._id)}
                        disabled={addedAds.has(ad._id)}
                        className={`w-full px-4 py-2 rounded ${
                          addedAds.has(ad._id) ? "bg-green-500 text-white cursor-default" : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {addedAds.has(ad._id) ? "Added" : "Add"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No ads available</p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">You have no stores yet.</p>
      )}
    </div>
  );
};

export default MyStores;
