import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true,
  },
  bids: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      bidAmount: {
        type: Number,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
