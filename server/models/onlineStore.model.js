import mongoose from 'mongoose';

const onlineStoreSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  ads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ad',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OnlineStore = mongoose.model('OnlineStore', onlineStoreSchema);

export default OnlineStore;
