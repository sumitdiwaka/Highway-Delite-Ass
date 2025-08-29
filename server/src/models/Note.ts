import mongoose, { Document, Schema } from 'mongoose';

// No longer need to import IUser for this interface
// import { IUser } from './User';

export interface INote extends Document {
  // We explicitly define the type for `user` here
  user: mongoose.Schema.Types.ObjectId;
  content: string;
}

const NoteSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model<INote>('Note', NoteSchema);