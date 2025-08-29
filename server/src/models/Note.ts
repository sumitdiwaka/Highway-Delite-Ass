import mongoose, { Document, Schema } from 'mongoose';


export interface INote extends Document {
 
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