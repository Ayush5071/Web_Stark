"use client";
import React, { useEffect } from "react";
import { useAuction } from "@/context/AuctionContext";
import { useRouter } from "next/navigation";

const WonAuctions = () => {
  const { wonAuctions, loading, error, getWonAuctions } = useAuction();
  const router = useRouter();

  useEffect(() => {
    getWonAuctions();
  }, [getWonAuctions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (wonAuctions.length === 0) {
    return <div>No auctions won yet.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Won Auctions</h2>
      {wonAuctions.map((auction) => (
        <div key={auction._id} className="bg-white shadow-lg rounded-lg mb-4 p-4">
          <h3 className="text-xl font-semibold">{auction.title}</h3>
          <p className="text-gray-500">{auction.description}</p>
          <p className="mt-2 text-green-600">You won this auction!</p>
          <p className="mt-2">
            <strong>Winning Bid: </strong>
            {auction.highestBid ? auction.highestBid.amount : "Not available"}
          </p>
          <button
            onClick={() => router.push(`/auction/${auction._id}`)}
            className="mt-4 text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
          >
            View Auction
          </button>
        </div>
      ))}
    </div>
  );
};

export default WonAuctions;
