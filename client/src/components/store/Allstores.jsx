// AllStores.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useStoreContext } from "@/context/storeContext";

const AllStores = () => {
  const { stores, fetchStores } = useStoreContext();
  const router = useRouter();

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  console.log("Stores:", stores);

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white overflow-y-auto">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-purple-400">Our Stores</h1>
      <div className="flex flex-wrap justify-center gap-10">
        {stores.length > 0 ? (
          stores.map((store) => (
            <motion.div
              key={store._id}
              className="bg-gray-800 rounded-lg shadow-lg p-8 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Store Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white">{store.organizationName}</h2>
                <p className="text-sm text-gray-400">Owned by: {store.user.username}</p>
              </div>

              {/* Ads Section */}
              <div className="flex flex-col gap-4 overflow-y-auto max-h-80 pr-2">
                {store.ads.length > 0 ? (
                  store.ads.map((ad) => (
                    <div key={ad._id} className="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold text-purple-300">{ad.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{ad.description}</p>
                      </div>
                      <button
                        className="ml-4 px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition duration-200"
                        onClick={() => router.push(`/ad/${ad._id}`)}
                      >
                        View Ad
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No ads available.</p>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-xl">No stores available.</p>
        )}
      </div>
    </div>
  );
};

export default AllStores;
