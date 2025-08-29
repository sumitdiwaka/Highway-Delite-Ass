import React from 'react';
import { INote } from '../services/noteService';
import { Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: INote;
  onDelete: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="
      group relative 
      bg-white/10 backdrop-blur-lg 
      border border-white/20 
      rounded-xl shadow-lg 
      p-5 flex flex-col justify-between 
      h-48
      transition-all duration-300
      hover:border-white/40 hover:-translate-y-1"
    >
      <p className="text-gray-200 text-sm leading-relaxed">
        {note.content}
      </p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-400">{formattedDate}</span>
        <button 
          onClick={() => onDelete(note._id)}
          className="
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300
            p-2 rounded-full 
            bg-red-500/20 hover:bg-red-500/40"
          aria-label="Delete note"
        >
          <Trash2 size={16} className="text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;