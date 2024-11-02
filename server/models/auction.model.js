import mongoose from 'mongoose';

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


// method which can handle the endTime with respect to current time -- ! so just add time in min formwhich you need to open auction
auctionSchema.methods.setEndTime = function (durationInMinutes) {
  const endTime = new Date();
  endTime.setMinutes(endTime.getMinutes() + durationInMinutes);
  this.endTime = endTime;
};

// method to find auctions thta are active !!
auctionSchema.statics.getActiveAuctions = function () {
  return this.find({ active: true }).exec();
};

const Auction = mongoose.model('Auction', auctionSchema);
export default Auction;
