import User from '../models/user.model.js'; 
import { setToken } from '../helper/setToken.js';
import { sendOTP } from './otp.controller.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    await sendOTP(req, res);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email,password, "check 1");
    const user = await User.findOne({ email });
    console.log("chek",user)
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return sendOTP(req, res); 
    }

    console.log(isMatch," match")

    const userId = user._id;
    setToken(res, { userId });

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token'); 
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
