import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      basePrice: {
        type: Number,
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

auctionSchema.statics.createAuction = async function (products, owner) {
  const auction = new this({
    products,
    owner,
  });
  return auction.save();
};

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
