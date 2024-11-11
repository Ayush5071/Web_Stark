import Auction from "../models/auction.model.js";
import User from "../models/user.model.js";
import { io } from "../socket/socket.js";

export const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, duration } = req.body;
    const createdBy = req.user.userId;

    const auction = new Auction({
      title,
      description,
      startingPrice,
      createdBy,
      highestBid: { amount: startingPrice },
    });

    auction.setEndTime(duration);
    await auction.save();

    const user = await User.findById(createdBy);
    user.auctions.push(auction._id);
    await user.save();

    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActiveAuctions = async (req, res) => {
  try {
    const activeAuctions = await Auction.find({ active: true })
      .populate("createdBy", "username email")
      .populate("highestBid.user", "username email");

    res.status(200).json(activeAuctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const placeBid = async (req, res) => {
  try {
    const { bidAmount } = req.body;
    const { id: auctionId } = req.params;
    const userId = req.user.userId;

    const auction = await Auction.findById(auctionId);

    if (!auction) {
      return res.status(404).json({ error: "Auction not found" });
    }

    if (new Date() > auction.endTime) {
      return res.status(400).json({ error: "Bidding time has expired" });
    }

    try {
      await auction.placeBid(userId, bidAmount);
    } catch (error) {
      return res.status(400).json({ error: "Bid must be higher than current bid" });
    }

    io.emit("newBid", {
      auctionId,
      highestBid: {
        userId,
        amount: bidAmount,
      },
    });

    const populatedAuction = await Auction.findById(auctionId)
      .populate("createdBy", "username email")
      .populate("highestBid.user", "username email");

    return res.status(200).json({ message: "Bid placed successfully", auction: populatedAuction });
  } catch (error) {
    console.error("Error placing bid:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const getMyAuction = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).populate('auctions');

    if (!user || user.auctions.length === 0) {
      return res.status(404).json({ error: "No Auctions Created" });
    }

    // If auctions are found, return them
    return res.status(200).json(user.auctions);
  } catch (error) {
    console.error("Error fetching user's auctions:", error);
    res.status(500).json({ error: error.message });
  }
};

export const wonAuction = async (req, res) => {
  try {
    const { userId } = req.user;

    const auctions = await Auction.find({
      'highestBid.user': userId,
      active: false,
    }).populate('highestBid.user', 'username email');

    if (!auctions) {
      return res.status(200).json({ message: 'No auctions found where you won.' });
    }

    return res.status(200).json(auctions);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
