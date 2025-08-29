import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';


const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/notes`, 
});

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


export const getNotesApi = async (token: string): Promise<INote[]> => {
  
  const response = await apiClient.get('/', getConfig(token));
  return response.data;
};

// API function to create a new note
export const createNoteApi = async (content: string, token: string): Promise<INote> => {
 
  const response = await apiClient.post('/', { content }, getConfig(token));
  return response.data;
};


export const deleteNoteApi = async (noteId: string, token: string): Promise<void> => {

  await apiClient.delete(`/${noteId}`, getConfig(token));
};

    
