import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import { INote, getNotesApi, createNoteApi, deleteNoteApi } from '../services/noteService';
import { Plus, Search, LogOut, LoaderCircle, X, BrainCircuit } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout, token } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Staggered animation effect for notes
  useEffect(() => {
    const noteElements = document.querySelectorAll('.note-card-animate');
    noteElements.forEach((el, index) => {
      (el as HTMLElement).style.transitionDelay = `${index * 50}ms`;
      el.classList.add('fade-in-up');
    });
  }, [notes, isLoading]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) { setIsLoading(false); return; }
      try {
        const userNotes = await getNotesApi(token);
        setNotes(userNotes);
      } catch (err) {
        setError('Failed to fetch notes.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [token]);

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newNoteContent.trim()) return;
    try {
      const newNote = await createNoteApi(newNoteContent, token);
      setNotes([newNote, ...notes]);
      setNewNoteContent('');
      setIsModalOpen(false);
    } catch (err) {
      setError('Failed to create note.');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!token) return;
    try {
      await deleteNoteApi(noteId, token);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (err) {
      setError('Failed to delete note.');
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoaderCircle className="animate-spin text-fuchsia-500" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex">
      {/* Background Gradient Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-fuchsia-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Sidebar */}
      <aside className="w-20 lg:w-64 flex-shrink-0 bg-black/20 backdrop-blur-xl flex flex-col border-r border-white/10">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:pl-6 border-b border-white/10">
          <BrainCircuit className="text-fuchsia-400 h-8 w-8" />
          <h1 className="hidden lg:block ml-3 text-2xl font-bold tracking-wider">MindScribe</h1>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center lg:justify-start gap-3 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            <Plus size={22} />
            <span className="hidden lg:inline">New Note</span>
          </button>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={logout} className="w-full flex items-center justify-center lg:justify-start gap-3 text-gray-400 hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/10">
            <LogOut size={20}/>
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 flex-shrink-0 bg-black/10 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              className="pl-12 pr-4 py-3 w-full bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium hidden sm:inline">Welcome, {user.name}!</span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-600 to-sky-500 flex items-center justify-center font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-fuchsia-400 to-sky-400 text-transparent bg-clip-text">
            Your Notes
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-full"><LoaderCircle className="animate-spin text-fuchsia-500" size={32} /></div>
          ) : notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {notes.map((note) => (
                <div key={note._id} className="note-card-animate">
                  <NoteCard note={note} onDelete={handleDeleteNote} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
              <h3 className="text-2xl font-semibold text-gray-300">Your canvas is empty</h3>
              <p className="text-gray-400 mt-2">Let your ideas flow. Click "New Note" to begin.</p>
            </div>
          )}
        </main>
      </div>

      {/* Add Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">New Note</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleCreateNote}>
              <textarea
                className="w-full p-3 bg-white/5 border border-white/10 rounded-md focus:ring-2 focus:ring-fuchsia-500 focus:outline-none"
                rows={6}
                placeholder="Start writing..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end mt-6">
                <button type="submit" className="px-6 py-2 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold rounded-md hover:scale-105 transition-transform">
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;