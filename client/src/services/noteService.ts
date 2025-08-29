// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// // Define the shape of a Note object
// export interface INote {
//   _id: string;
//   content: string;
//   createdAt: string;
// }

// // Helper function to get the auth token
// const getConfig = (token: string) => {
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // API function to get all notes for the logged-in user
// export const getNotesApi = async (token: string): Promise<INote[]> => {
//   const response = await axios.get(API_URL, getConfig(token));
//   return response.data;
// };

// // API function to create a new note
// export const createNoteApi = async (content: string, token: string): Promise<INote> => {
//   const response = await axios.post(API_URL, { content }, getConfig(token));
//   return response.data;
// };

// // API function to delete a note by its ID
// export const deleteNoteApi = async (noteId: string, token: string): Promise<void> => {
//   await axios.delete(`${API_URL}/${noteId}`, getConfig(token));
// };


import axios from 'axios';

// Get the base URL from the environment variable.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create a configured instance of axios specifically for the notes API
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/notes`, // Always append the correct /api/notes path
});

// Define the shape of a Note object
export interface INote {
  _id: string;
  content: string;
  createdAt: string;
}

// Helper function to get the auth token headers
const getConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// API function to get all notes for the logged-in user
export const getNotesApi = async (token: string): Promise<INote[]> => {
  // Now we just call the root of our apiClient, which is /api/notes
  const response = await apiClient.get('/', getConfig(token));
  return response.data;
};

// API function to create a new note
export const createNoteApi = async (content: string, token: string): Promise<INote> => {
  // The root of the apiClient is /api/notes, so this POSTs to the correct URL
  const response = await apiClient.post('/', { content }, getConfig(token));
  return response.data;
};

// API function to delete a note by its ID
export const deleteNoteApi = async (noteId: string, token: string): Promise<void> => {
  // This will correctly call DELETE on /api/notes/:noteId
  await apiClient.delete(`/${noteId}`, getConfig(token));
};

    
