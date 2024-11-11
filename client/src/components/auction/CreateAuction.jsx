"use client";
import { useAuction } from "@/context/AuctionContext";
import React, { useState } from "react";

const CreateAuction = () => {
  const { createAuction } = useAuction();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auctionData = { title, description, startingPrice, duration };
    await createAuction(auctionData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md">
      <h2 className="text-2xl text-zinc-900 font-bold mb-4">Create Auction</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="number"
        placeholder="Starting Price"
        value={startingPrice}
        onChange={(e) => setStartingPrice(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        placeholder="Duration (in hours)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
    </form>
  );
};

export default CreateAuction;
