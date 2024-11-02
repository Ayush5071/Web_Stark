import Auction from "../models/auction.model.js";

export const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, duration } = req.body;
    const createdBy = req.user.userId;

    const auction = new Auction({
      title,
      description,
      startingPrice,
      createdBy,
      highestBid: { amount: startingPrice }
    });

    auction.setEndTime(duration); 

    await auction.save();
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all active auctions
export const getActiveAuctions = async (req, res) => {
  try {
    const activeAuctions = await Auction.getActiveAuctions(); // encapsulation is done for code check ---> auction model
    res.status(200).json(activeAuctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
