import OTP from '../models/otp.model.js';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    console.log("Searching for user with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found.");
      return res.status(400).json({ message: 'User not found' });
    }

    const otpEntry = new OTP({ userId: user._id });
    const otp = otpEntry.generateOTP();
    await otpEntry.save();
    console.log("Generated OTP:", otp);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    console.log("Sending email with options:", mailOptions);

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");

    return;
  } catch (error) {
    console.error("Error in sendOTP function:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: 'Error sending OTP', error });
    }
  }
};


export const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const { id : userId} = req.params;

  try {
    const user = await User.findById(userId);
    const { email } = user;
    console.log("mila",user);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    console.log("Verifying OTP for email:", email);

    const otpEntry = await OTP.findOne({ userId: user._id, otp });

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    
    const now = new Date();
    const expiresAt = new Date(otpEntry.createdAt);
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    if (now > expiresAt) {
      await OTP.deleteOne({ _id: otpEntry._id });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.isVerified = true;
    await user.save();

    await OTP.deleteOne({ _id: otpEntry._id });
    return res.status(200).json(user);

  } catch (error) {
    console.error("Error in verifyOTP function:", error);

    if (!res.headersSent) {
      return res.status(500).json({ message: 'Error verifying OTP', error });
    }
  }
};
