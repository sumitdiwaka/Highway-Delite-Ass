// src/components/GoogleAuthCallback.tsx
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
import { jwtDecode } from 'jwt-decode';
import { LoaderCircle } from 'lucide-react';

// Define a type for the user data decoded from the JWT
interface DecodedToken {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

const GoogleAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      try {
        const decodedUser = jwtDecode<DecodedToken>(token);
        // Use your existing login function from AuthContext
        login(decodedUser, token);
        navigate('/'); // Redirect to the dashboard
      } catch (error) {
        console.error("Authentication failed: Invalid token.", error);
        navigate('/login'); // Redirect to login on error
      }
    } else {
      console.error("Google auth callback did not provide a token.");
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <LoaderCircle className="animate-spin text-fuchsia-500 h-12 w-12 mb-4" />
      <h1 className="text-2xl font-semibold">Authenticating</h1>
      <p className="text-gray-400">Please wait while we log you in...</p>
    </div>
  );
};

export default GoogleAuthCallback;