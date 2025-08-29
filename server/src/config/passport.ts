// src/config/passport.ts

import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import User from '../models/User'; // Make sure this path is correct
import { IUser } from '../models/User'; // Assuming IUser is exported from User.ts

passport.use(new GoogleStrategy({
    // Options for the Google strategy
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback"
  },
  // This function is called when Google successfully authenticates the user
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
      // Check if a user already exists with this Google ID
      let user: IUser | null = await User.findOne({ googleId: profile.id });

      if (user) {
        // If the user exists, continue with that user
        return done(null, user);
      }

      // If no user is found with that Google ID, check if their email already exists
      user = await User.findOne({ email: profile.emails?.[0].value });

      if (user) {
        // If the email exists, link their Google ID to that account
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }

      // If no user exists with that Google ID or email, create a new user
      const newUser = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0].value,
      });

      return done(null, newUser);

    } catch (err: any) {
      return done(err, undefined);
    }
  }
));