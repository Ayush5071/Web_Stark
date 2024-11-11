"use client";
import React, { useState } from "react";
import useAd from "@/hooks/useAd";
import { toast } from "react-hot-toast";

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
    if (!title || !description || !price || !location || !productType || !image) {
      toast.error("Please fill out all fields and upload an image");
      return;
    }
    try {
      await postAd({ title, description, price, location, productType }, image);
      toast.success("Ad posted successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setProductType("");
      setImage(null);
    } catch (err) {
      console.error("Failed to post ad:", err);
      toast.error("Failed to post ad. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700 text-white min-h-screen rounded-lg">
      <h1 className="text-4xl font-bold mb-6 text-center text-zinc-100">Create New Ad</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
            placeholder="Enter ad title"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
            placeholder="Enter ad description"
          ></textarea>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
            placeholder="Enter price"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
            placeholder="Enter location"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Product Type</label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
            placeholder="Enter product type"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="w-1/3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 py-2 rounded-md font-semibold"
          >
            {loading ? "Posting..." : "Post Ad"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAds;
