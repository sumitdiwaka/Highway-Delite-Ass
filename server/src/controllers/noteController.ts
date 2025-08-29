import { Response } from 'express';
import Note from '../models/Note';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get user's notes
// @route   GET /api/notes
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.user?._id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
export const createNote = async (req: AuthRequest, res: Response) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: 'Content cannot be empty' });
  }
  try {
    const note = new Note({
      user: req.user?._id,
      content,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Ensure the user owns the note
    if (note.user.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Note.deleteOne({ _id: req.params.id });

    res.json({ message: 'Note removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};