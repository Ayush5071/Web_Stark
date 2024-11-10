"use client";
import React, { createContext, useContext, useState } from "react";

const AuctionContext = createContext();

export const useAuction = () => {
  return useContext(AuctionContext);
};

export const AuctionProvider = ({ children }) => {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [myAuction, setMyAuction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const createAuction = async (auctionData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auction/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(auctionData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) throw new Error(data.error || "Failed to create auction");

      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getActiveAuctions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auction/active`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) throw new Error(data.error || "Failed to fetch active auctions");

      setActiveAuctions(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const placeBid = async (auctionId, bidAmount) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auction/bid/${auctionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ bidAmount }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) throw new Error(data.error || "Failed to place bid");

      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getMyAuction = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auction/myAuction`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) throw new Error(data.error || "Failed to fetch your auction");

      setMyAuction(data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <AuctionContext.Provider
      value={{
        activeAuctions,
        myAuction,
        loading,
        error,
        createAuction,
        getActiveAuctions,
        placeBid,
        getMyAuction,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};
