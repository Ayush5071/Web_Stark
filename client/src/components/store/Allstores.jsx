// AllStores.js
"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useStoreContext } from "@/context/storeContext";

const AllStores = () => {
  const { stores, fetchStores } = useStoreContext();

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return (
    <div className="p-8 min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-10">All Stores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stores.length > 0 ? (
          stores.map((store) => (
            <motion.div
              key={store._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <h2 className="text-xl font-semibold text-purple-400 mb-2">
                {store.organizationName}
              </h2>
              <p className="text-gray-400 mb-4">Owner: {store.user.username}</p>
              <p className="text-gray-300">
                <span className="font-bold">{store.ads.length}</span> Ads
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            No stores available.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllStores;
