import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').delete(protect, deleteNote);

export default router;