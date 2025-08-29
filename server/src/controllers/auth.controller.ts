import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { sendOTPEmail } from '../services/emailService';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};


export const sendOTP = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    let user = await User.findOne({ email });

    if (!user) {
        if (!name) {
            return res.status(400).json({ message: 'Name is required for new users' });
        }
      user = await User.create({ name, email, otp, otpExpires });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    await sendOTPEmail(email, otp);

    res.status(200).json({ message: 'OTP sent to your email successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while sending OTP.' });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const user = await User.findOne({
      email,
      otpExpires: { $gt: Date.now() }, // Check if OTP is not expired
    });

    if (!user) {
     
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired.' });
    }

    
    const isMatch = await user.compareOtp(otp);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired.' });
    }

  
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      message: 'Login successful!',
      token: generateToken(user._id.toString()),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while verifying OTP.' });
  }
};