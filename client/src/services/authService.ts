// // client/src/services/authService.ts
// import axios from 'axios';

// // The base URL of our backend server
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/auth';

// // Function to call the send-otp endpoint
// export const sendOtpApi = async (name: string, email: string) => {
//   const response = await axios.post(`${API_URL}/send-otp`, { name, email });
//   return response.data;
// };

// // Function to call the verify-otp endpoint
// export const verifyOtpApi = async (email: string, otp: string) => {
//   const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
//   return response.data;
// };

import axios from 'axios';

// Get the base URL from the environment variable.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Create a configured instance of axios
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`, // Always append the correct base path
});

// Function to call the send-otp endpoint
export const sendOtpApi = async (name: string, email: string) => {
  // Now we just call the endpoint name, axios handles the full URL
  const response = await apiClient.post('/send-otp', { name, email });
  return response.data;
};

// Function to call the verify-otp endpoint
export const verifyOtpApi = async (email: string, otp: string) => {
  const response = await apiClient.post('/verify-otp', { email, otp });
  return response.data;
};