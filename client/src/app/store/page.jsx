// StoreDashboard.js
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStoreContext } from "@/context/storeContext";
import AllStores from "@/components/store/Allstores";
import CreateStore from "@/components/store/CreateStore";
import MyStores from "@/components/store/MyStores";

const StoreDashboard = () => {
  const { fetchStores, fetchMyStore, createStore } = useStoreContext();
  const [activeComponent, setActiveComponent] = useState("Welcome");

  const components = {
    Welcome: <p>Welcome to your store dashboard!</p>,
    AllStores: <AllStores />, // Render the AllStores component here
    MyStore: <MyStores/>,
    CreateStore: <CreateStore/>,
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
    if (component === "AllStores") fetchStores();
    if (component === "MyStore") fetchMyStore();
    if (component === "CreateStore") createStore();
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <motion.aside
        className="w-1/4 p-4 bg-gray-800 space-y-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">My Store</h2>
        <nav className="space-y-4">
          {["Welcome", "AllStores", "MyStore", "CreateStore"].map((comp) => (
            <motion.button
              key={comp}
              onClick={() => handleComponentChange(comp)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
                activeComponent === comp ? "bg-purple-600" : "bg-purple-500"
              }`}
            >
              {comp.replace(/([A-Z])/g, " $1")}
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <motion.main
        className="flex-1 p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg h-full flex items-center justify-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Render the active component */}
          <div className="text-gray-300 text-center">
            {components[activeComponent]}
          </div>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default StoreDashboard;
