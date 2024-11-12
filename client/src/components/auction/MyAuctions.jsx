"use client";
import { useAuction } from "@/context/AuctionContext";
import React, { useEffect, useState } from "react";

const MyAuction = () => {
  const { myAuction, getMyAuction } = useAuction();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMyAuction();
      } catch (error) {
        console.error("Error fetching auctions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getMyAuction]);

  const calculateTimeLeft = (endTime) => {
    const timeDifference = new Date(endTime) - new Date();

    if (timeDifference <= 0) {
      return null; // Auction has ended
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  if (loading) {
    return <div className="text-white">Loading your auctions...</div>;
  }

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl text-zinc-800 font-bold mb-4">My Auctions</h2>
      {myAuction && myAuction.length > 0 ? (
        myAuction.map((auction) => {
          const timeLeft = calculateTimeLeft(auction.endTime);

          return (
            <div key={auction._id} className="p-4 bg-zinc-800 shadow-md mb-4 rounded-md">
              <h3 className="font-semibold text-xl">{auction.title}</h3>
              <p className="text-zinc-400">{auction.description}</p>
              <p className="mt-2">
                Highest Bid:{" "}
                {auction.highestBid && auction.highestBid.amount > 0
                  ? auction.highestBid.amount
                  : "No bids yet"}
              </p>
              <div className="mt-2 text-sm text-zinc-300">
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
            </div>
          );
        })
      ) : (
        <p className="text-zinc-400">You have not created any auctions.</p>
      )}
    </div>
  );
};

export default MyAuction;
