"use client";
import { useAuction } from "@/context/AuctionContext";
import React, { useEffect } from "react";

const MyAuction = () => {
  const { myAuction, getMyAuction } = useAuction();

  useEffect(() => {
    getMyAuction();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Auction</h2>
      {myAuction ? (
        <div className="p-4 bg-white shadow-md">
          <h3 className="font-semibold">{myAuction.title}</h3>
          <p>{myAuction.description}</p>
          <p>Highest Bid: {myAuction.highestBid.amount}</p>
        </div>
      ) : (
        <p>You have not created any auctions.</p>
      )}
    </div>
  );
};

export default MyAuction;
