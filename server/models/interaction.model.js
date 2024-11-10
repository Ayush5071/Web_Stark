import mongoose from 'mongoose';


const interactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    
  },
  productId: {
    type: String,
    required: true,
    index: true 
  },
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 5 
  },
  interaction_type: {
    type: String,
    required: true,
    enum: ['view', 'click', 'add_to_cart', 'purchase'], // The possible interaction types
  },
  timestamp: {
    type: Date,
    default: Date.now 
  }
}, {
  timestamps: true 
});


const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;
