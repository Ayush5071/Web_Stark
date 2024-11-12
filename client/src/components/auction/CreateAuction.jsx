"use client";
import { useAuction } from "@/context/AuctionContext";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CreateAuction = () => {
  const { createAuction } = useAuction();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !startingPrice || !duration) {
      toast.error("Please fill out all fields.");
      return;
    }
    const auctionData = { title, description, startingPrice, duration };
    try {
      await createAuction(auctionData);
      toast.success("Auction created successfully!");
      setTitle("");
      setDescription("");
      setStartingPrice("");
      setDuration("");
    } catch (error) {
      console.error("Error creating auction:", error);
      toast.error("Failed to create auction. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700 text-white min-h-screen rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-zinc-100">Create Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Title</label>
          <input
            type="text"
            placeholder="Enter auction title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
          ></textarea>
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Starting Price</label>
          <input
            type="number"
            placeholder="Enter starting price"
            value={startingPrice}
            onChange={(e) => setStartingPrice(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-zinc-300">Duration (in hours)</label>
          <input
            type="text"
            placeholder="Enter duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="p-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-200"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAuction;
