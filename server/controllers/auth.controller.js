import User from '../models/user.model.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { setToken } from '../helper/setToken.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    const userId = user._id;

    setToken(res,{userId});

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error', error });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userId = user._id;
    setToken(res,{userId});

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
