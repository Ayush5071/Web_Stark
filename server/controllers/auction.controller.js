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
      highestBid: { amount: startingPrice }
    });

    auction.setEndTime(duration); 

    await auction.save();

    const user = await User.findById({createdBy});
    user.auctions.push(auction._id);
    await user.save();
    
    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getActiveAuctions = async (req, res) => {
  try {
    const activeAuctions = await Auction.getActiveAuctions(); // encapsulation is done for code, check ---> auction model okay !!
    res.status(200).json(activeAuctions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const placeBid = async (req, res) => {
    try {
      const { bidAmount } = req.body;
      const {id : auctionId} =  req.params
      const userId = req.user.userId; 
  
      const auction = await Auction.findById(auctionId);
  
      if (!auction) {
        return res.status(404).json({ error: 'Auction not found' });
      }
  
      if (new Date() > auction.endTime) {
        return res.status(400).json({ error: 'Bidding time has expired' });
      }
  
      try {
        await auction.placeBid(userId, bidAmount);        
      } catch (error) {
        // console.log(error)
        return res.status(400).json({error : "bid must be higher than current bid"});        
      }
  
      // emit highest bid to all of te user prsnt;
      io.emit('newBid', {
        auctionId,
        highestBid: {
          userId,
          amount: bidAmount,
        },
      });
  
      return res.status(200).json({ message: 'Bid placed successfully', auction });
    } catch (error) {
      console.error('Error placing bid:', error);
      return res.status(500).json({ error: "Something went wrong", error });
    }
};
