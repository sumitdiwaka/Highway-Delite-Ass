// // src/models/User.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//   _id: mongoose.Types.ObjectId;
//   name: string;
//   email: string;
//   googleId?: string; // For Google OAuth users
//   otp?: string;
//   otpExpires?: Date;
// }

// const UserSchema: Schema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   googleId: {
//     type: String,
//   },
//   otp: {
//     type: String,
//   },
//   otpExpires: {
//     type: Date,
//   },
// }, { timestamps: true });

// export default mongoose.model<IUser>('User', UserSchema);

// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  googleId?: string;
  otp?: string;
  otpExpires?: Date;
  // This method will be available on user documents
  compareOtp(candidateOtp: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Suggestion: Ensures email consistency
  },
  googleId: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
}, { timestamps: true });

// Mongoose "pre-save" hook to hash the OTP before saving
// This function will run automatically whenever you save a user document
UserSchema.pre<IUser>('save', async function (next) {
  // Only hash the otp if it has been modified (or is new)
  if (!this.isModified('otp') || !this.otp) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare candidate OTP with the hashed OTP in the database
UserSchema.methods.compareOtp = async function (candidateOtp: string): Promise<boolean> {
  if (!this.otp) {
    return false;
  }
  return bcrypt.compare(candidateOtp, this.otp);
};


export default mongoose.model<IUser>('User', UserSchema);