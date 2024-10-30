import mongoose from 'mongoose';

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

adSchema.methods.addReview = function (user, comment) {
  this.reviews.push({ user, comment });
  return this.save();
};

adSchema.methods.likeAd = function (userId) {
    const likeIndex = this.likes.findIndex((like) => like.user.toString() === userId.toString());
    
    if (likeIndex !== -1) {
      this.likes.splice(likeIndex, 1);
    } else {
      this.likes.push({ user: userId });
    }  
    return this.save(); 
  };
  

const Ad = mongoose.model('Ad', adSchema);

export default Ad;
