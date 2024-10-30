import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
