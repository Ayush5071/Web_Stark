"use client";
import { useAuction } from "@/context/AuctionContext";
import React, { useEffect } from "react";

const ActiveAuctions = () => {
  const { activeAuctions, getActiveAuctions } = useAuction();

  useEffect(() => {
    getActiveAuctions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Auctions</h2>
      {activeAuctions.length ? (
        activeAuctions.map((auction) => (
          <div key={auction._id} className="p-4 bg-white shadow-md mb-4">
            <h3 className="font-semibold">{auction.title}</h3>
            <p>{auction.description}</p>
            <p>Highest Bid: {auction.highestBid.amount}</p>
          </div>
        ))
      ) : (
        <p>No active auctions available.</p>
      )}
    </div>
  );
};

export default ActiveAuctions;
