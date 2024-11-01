import OTP from '../models/otp.model.js';
import nodemailer from 'nodemailer';
import User from '../models/user.model.js';


  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'lazaro.kessler69@ethereal.email',
      pass: 'eVVQAKdUyFNfm9bhy6',
    },
  });

export const sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    // console.log("ye to ho gya",user);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otpEntry = new OTP({ userId: user._id });
    // console.log("new Otp",otpEntry);
    const otp = otpEntry.generateOTP();
    await otpEntry.save(); 
    // console.log("dooooooooooneeeeeeeeeeeeeeeeeeeeeeeeee");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    console.log("mail options",mailOptions);
    console.log(process.env.EMAIL_USER,"recheck-->",process.env.EMAIL_PASS);

    await transporter.sendMail(mailOptions);

    console.log("khatam");

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error });
  }
};

export const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const otpDoc = await OTP.findOne({ userId });

    if (!otpDoc || otpDoc.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const currentTime = Date.now();
    if (currentTime > otpDoc.createdAt.getTime() + 5 * 60 * 1000) { 
      return res.status(400).json({ message: 'OTP has expired' });
    }

    await User.findByIdAndUpdate(userId, { isVerified: true });

    await OTP.deleteOne({ userId });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed', error });
  }
};
