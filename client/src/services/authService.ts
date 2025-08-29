import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`, // Always append the correct base path
});


export const sendOtpApi = async (name: string, email: string) => {
  
  const response = await apiClient.post('/send-otp', { name, email });
  return response.data;
};

// Function to call the verify-otp endpoint
export const verifyOtpApi = async (email: string, otp: string) => {
  const response = await apiClient.post('/verify-otp', { email, otp });
  return response.data;
};