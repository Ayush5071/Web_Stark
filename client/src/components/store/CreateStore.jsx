// CreateStore.js
import { useState } from "react";
import { useStoreContext } from "@/context/storeContext";
import { motion } from "framer-motion";

const CreateStore = () => {
  const { createStore } = useStoreContext();
  const [organizationName, setOrganizationName] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const handleCreateStore = async (e) => {
    e.preventDefault();
    try {
      // Passing the organization name directly as the parameter
      await createStore(organizationName);
      setStatusMessage({ type: "success", text: "Store created successfully!" });
      setOrganizationName(""); // Clear input field after success
    } catch (error) {
      console.error("Error creating store:", error);
      setStatusMessage({ type: "error", text: "Failed to create store. Please try again." });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full p-6 bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-gray-300 mb-4">Create a New Store</h2>
      
      <form onSubmit={handleCreateStore} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="organizationName" className="block text-gray-400 mb-2">
            Organization Name
          </label>
          <input
            type="text"
            id="organizationName"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Enter your organization name"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors"
        >
          Create Store
        </button>
      </form>

      {statusMessage && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            statusMessage.type === "success" ? "bg-green-600" : "bg-red-600"
          } text-white`}
        >
          {statusMessage.text}
        </div>
      )}
    </motion.div>
  );
};

export default CreateStore;
