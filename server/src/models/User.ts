import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  googleId?: string;
  otp?: string;
  otpExpires?: Date;
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
    lowercase: true, // Ensures email consistency
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


UserSchema.pre<IUser>('save', async function (next) {
 
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


UserSchema.methods.compareOtp = async function (candidateOtp: string): Promise<boolean> {
  if (!this.otp) {
    return false;
  }
  return bcrypt.compare(candidateOtp, this.otp);
};


export default mongoose.model<IUser>('User', UserSchema);