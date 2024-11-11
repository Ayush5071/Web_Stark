"use client";
import { useAuction } from "@/context/AuctionContext";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();  // Assuming the server is set up correctly

const ActiveAuctions = () => {
  const { activeAuctions, getActiveAuctions, placeBid } = useAuction();
  const [bidAmounts, setBidAmounts] = useState({});

  useEffect(() => {
    getActiveAuctions();

    socket.on("newBid", (data) => {
      // Update the auction data with the new highest bid
      const updatedAuctions = activeAuctions.map((auction) => {
        if (auction._id === data.auctionId) {
          auction.highestBid = data.highestBid;
        }
        return auction;
      });
      // You might want to set this state based on how you're managing auctions in your context
      setActiveAuctions(updatedAuctions);
    });

    return () => {
      socket.off("newBid"); // Clean up listener when component unmounts
    };
  }, [activeAuctions, getActiveAuctions]);

  const handleBidChange = (e, auctionId) => {
    setBidAmounts({
      ...bidAmounts,
      [auctionId]: e.target.value,
    });
  };

  const handlePlaceBid = async (auctionId) => {
    const bidAmount = bidAmounts[auctionId];

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount.");
      return;
    }

    try {
      await placeBid(auctionId, parseFloat(bidAmount));
      setBidAmounts({ ...bidAmounts, [auctionId]: "" });
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("Failed to place bid. Please try again.");
    }
  };

  const calculateTimeLeft = (endTime) => {
    const timeDifference = new Date(endTime) - new Date();

    if (timeDifference <= 0) {
      return null;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Active Auctions</h2>
      {activeAuctions.length ? (
        activeAuctions.map((auction) => {
          const timeLeft = calculateTimeLeft(auction.endTime);

          return (
            <div key={auction._id} className="p-4 bg-gray-800 shadow-md mb-4 rounded-md">
              <h3 className="font-semibold text-xl">{auction.title}</h3>
              <p className="text-gray-400">{auction.description}</p>
              <p className="mt-2">
                Highest Bid:{" "}
                {auction.highestBid && auction.highestBid.amount > 0
                  ? auction.highestBid.amount
                  : "No bids yet"} by {auction.highestBid?.user?.username || "N/A"}
              </p>
              <div className="mt-2 text-sm text-gray-300">
                {timeLeft ? (
                  <>
                    <p>Time Left:</p>
                    <p>
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </p>
                  </>
                ) : (
                  <p className="text-red-500">Auction Ended</p>
                )}
              </div>

              {timeLeft && (
                <div className="mt-4">
                  <input
                    type="number"
                    placeholder="Enter your bid"
                    value={bidAmounts[auction._id] || ""}
                    onChange={(e) => handleBidChange(e, auction._id)}
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                  <button
                    onClick={() => handlePlaceBid(auction._id)}
                    className="mt-2 p-2 bg-green-500 text-white rounded-md w-full"
                  >
                    Place Bid
                  </button>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-400">No active auctions available.</p>
      )}
    </div>
  );
};

export default ActiveAuctions;
