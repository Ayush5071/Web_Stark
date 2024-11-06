import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  profileImg: {
    type: String,
    default: '', 
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  trusted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ads:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ad'
    }
  ],
  purchasedAds:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ad'
    }
  ],
  auctions:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Auction'
    }
  ],
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  if (this.email.endsWith('@mnnit.ac.in')) {
    this.trusted = true;
  }

  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.updateProfile = async function (data) {
  if (data.username) this.username = data.username;
  if (data.location) this.location = data.location;
  if (data.profileImg) this.profileImg = data.profileImg;
  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(data.password, salt);
  }
  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;
