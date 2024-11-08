"use client";
import React, { useState } from "react";
import useAd from "@/hooks/useAd";

const CreateAds = () => {
  const { postAd, loading, error } = useAd();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [productType, setProductType] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !productType ||
      !image
    ) {
      alert("Please fill out all fields and upload an image");
      return;
    }
    try {
      await postAd({ title, description, price, location, productType }, image);
      alert("Ad posted successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setProductType("");
      setImage(null);
    } catch (err) {
      console.error("Failed to post ad:", err);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-[#0A2472] to-[#0E6BA8] text-white min-h-screen rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center">Create New Ad</h1>
      <form onSubmit={handleSubmit} className="space-y-6 px-40">
        <div className="flex flex-col space-y-2">
          <label className="text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded white border border-gray-700 text-black"
            placeholder="Enter ad title"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded border border-gray-700 text-black"
            placeholder="Enter ad description"
          ></textarea>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-white">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded border border-gray-700 text-black"
            placeholder="Enter price"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-white">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 rounded  border border-gray-700 text-black"
            placeholder="Enter location"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-white">Product Type</label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="p-2 rounded  border border-gray-700 text-black"
            placeholder="Enter product type"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-white">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 rounded  border border-gray-700 text-black bg-white"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-1/4 bg-white hover:bg-gray-200 text-black py-2 rounded text-lg font-semibold"
          >
            {loading ? "Posting..." : "Post Ad"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAds;
