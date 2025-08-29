// // src/routes/auth.routes.ts
// import express from 'express';
// import { sendOTP, verifyOTP } from '../controllers/auth.controller';

// const router = express.Router();

// router.post('/send-otp', sendOTP);
// router.post('/verify-otp', verifyOTP);

// export default router;

// src/routes/auth.routes.ts
import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { sendOTP, verifyOTP } from '../controllers/auth.controller';
import { IUser } from '../models/User'; // Adjust path if needed

const router = express.Router();

// --- Existing OTP Routes ---
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// --- New Google OAuth Routes ---

// This route starts the Google authentication process
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// This is the callback route Google redirects to after successful login
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    // The authenticated user is attached to req.user by Passport
    const user = req.user as IUser;

    // Create a JWT for the user
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Redirect back to the frontend with the token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

export default router;