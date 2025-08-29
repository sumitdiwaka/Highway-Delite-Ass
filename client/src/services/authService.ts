// client/src/services/authService.ts
import axios from 'axios';

// The base URL of our backend server
const API_URL = 'http://localhost:5001/api/auth';

// Function to call the send-otp endpoint
export const sendOtpApi = async (name: string, email: string) => {
  const response = await axios.post(`${API_URL}/send-otp`, { name, email });
  return response.data;
};

// Function to call the verify-otp endpoint
export const verifyOtpApi = async (email: string, otp: string) => {
  const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
  return response.data;
};