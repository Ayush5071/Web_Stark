"use client";
import React, { useEffect } from "react";
import { useAuction } from "@/context/AuctionContext";
import { useRouter } from "next/navigation";

const WonAuctions = () => {
  const { wonAuctions, loading, getWonAuctions } = useAuction();
  const router = useRouter();

  useEffect(() => {
    if (wonAuctions.length === 0) {
      getWonAuctions();
    }
  }, [wonAuctions.length]); // Adding wonAuctions.length as a dependency

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (wonAuctions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center">
        <div className="text-lg font-semibold text-gray-600">No Auctions Won</div>
        <div className="bg-blue-100 text-blue-800 px-6 py-4 rounded-lg shadow-md">
          You haven't won any auctions yet. Keep exploring new opportunities!
        </div>
      </div>
    );
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
