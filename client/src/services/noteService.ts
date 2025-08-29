import axios from 'axios';

const API_URL = 'http://localhost:5001/api/notes';

// Define the shape of a Note object
export interface INote {
  _id: string;
  content: string;
  createdAt: string;
}

// Helper function to get the auth token
const getConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// API function to get all notes for the logged-in user
export const getNotesApi = async (token: string): Promise<INote[]> => {
  const response = await axios.get(API_URL, getConfig(token));
  return response.data;
};

// API function to create a new note
export const createNoteApi = async (content: string, token: string): Promise<INote> => {
  const response = await axios.post(API_URL, { content }, getConfig(token));
  return response.data;
};

// API function to delete a note by its ID
export const deleteNoteApi = async (noteId: string, token: string): Promise<void> => {
  await axios.delete(`${API_URL}/${noteId}`, getConfig(token));
};