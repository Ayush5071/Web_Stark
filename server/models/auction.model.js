import mongoose from 'mongoose';
import cron from 'node-cron';

const auctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  highestBid: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

auctionSchema.methods.setEndTime = function (durationInMinutes) {
  const endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + durationInMinutes);  
  this.endTime = endTime;
};

auctionSchema.statics.getActiveAuctions = function () {
  return this.find({ active: true }).exec();
};

auctionSchema.methods.placeBid = function (userId, bidAmount) {
  if (bidAmount <= this.highestBid.amount) {
    throw new Error('Bid must be higher than the current highest bid');
  }
  this.highestBid = { user: userId, amount: bidAmount };
  return this.save();
};

auctionSchema.methods.checkAndUpdateStatus = async function () {
  const currentTime = new Date();
  if (this.endTime <= currentTime) {
    this.active = false;  
    await this.save();
  }
};

cron.schedule('* * * * *', async () => {
  try {
    const activeAuctions = await Auction.find({ active: true });

    for (let auction of activeAuctions) {
      await auction.checkAndUpdateStatus();  
    }

    console.log('Auction statuses checked and updated.');
  } catch (error) {
    console.error('Error updating auction statuses:', error);
  }
});

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
