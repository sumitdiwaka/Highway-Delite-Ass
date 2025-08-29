

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { sendOtpApi, verifyOtpApi } from '../services/authService';
// import { BrainCircuit, User, Mail, KeyRound, LoaderCircle } from 'lucide-react';

// // Reusable Input component with an icon
// const StyledInput = ({ icon, ...props }) => (
//   <div className="relative">
//     <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
//       {icon}
//     </div>
//     <input
//       {...props}
//       className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
//     />
//   </div>
// );

// // Reusable Button component
// const StyledButton = ({ isLoading, children, ...props }) => (
//   <button
//     {...props}
//     disabled={isLoading}
//     className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:scale-100"
//   >
//     {isLoading ? <LoaderCircle className="animate-spin" /> : children}
//   </button>
// );


// const SignupPage = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     try {
//       await sendOtpApi(name, email);
//       setIsOtpSent(true);
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to send OTP.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
//     try {
//       const data = await verifyOtpApi(email, otp);
//       login(data.user, data.token);
//       navigate('/'); // Navigate to dashboard on successful login
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Invalid OTP.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
//       {/* Background Gradient Blobs from dashboard */}
//       <div className="absolute top-0 left-0 w-72 h-72 bg-fuchsia-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
//       <div className="absolute bottom-0 right-5 w-72 h-72 bg-sky-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
//       <div className="w-full max-w-md bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 z-10">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <BrainCircuit className="text-fuchsia-400 h-10 w-10" />
//             <h1 className="text-4xl font-bold tracking-wider">MindScribe</h1>
//           </div>
//           <p className="text-gray-400">
//             {isOtpSent ? 'Check your email for a magic code.' : 'Unlock Your Mind\'s Potential'}
//           </p>
//         </div>

//         {!isOtpSent ? (
//           <form onSubmit={handleSendOtp} className="space-y-6">
//             <StyledInput
//               icon={<User size={20} />}
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               placeholder="Full Name"
//             />
//             <StyledInput
//               icon={<Mail size={20} />}
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               placeholder="you@example.com"
//             />
//             {error && <p className="text-sm text-red-400 text-center">{error}</p>}
//             <div>
//               <StyledButton type="submit" isLoading={isLoading}>Send Code</StyledButton>
//             </div>
//           </form>
//         ) : (
//           <form onSubmit={handleVerifyOtp} className="space-y-6">
//             <p className="text-center text-sm text-gray-400">
//               Enter the 6-digit code sent to <strong>{email}</strong>.
//             </p>
//             <StyledInput
//               icon={<KeyRound size={20} />}
//               type="text"
//               id="otp"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//               placeholder="123456"
//               maxLength={6}
//             />
//             {error && <p className="text-sm text-red-400 text-center">{error}</p>}
//             <div>
//               <StyledButton type="submit" isLoading={isLoading}>Verify & Sign In</StyledButton>
//             </div>
//           </form>
//         )}
        
//         <div className="text-center mt-6">
//             <p className="text-sm text-gray-400">
//                 Already have an account?{' '}
//                 <Link to="/login" className="font-semibold text-fuchsia-400 hover:underline">
//                     Log in
//                 </Link>
//             </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendOtpApi, verifyOtpApi } from '../services/authService';
import { BrainCircuit, User, Mail, KeyRound, LoaderCircle } from 'lucide-react';

// Reusable Input component with an icon
const StyledInput = ({ icon, ...props }: any) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all"
    />
  </div>
);

// Reusable Button component
const StyledButton = ({ isLoading, children, ...props }: any) => (
  <button
    {...props}
    disabled={isLoading}
    className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-70 disabled:scale-100"
  >
    {isLoading ? <LoaderCircle className="animate-spin" /> : children}
  </button>
);

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  // CORRECTED: Use import.meta.env for frontend environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await sendOtpApi(name, email);
      setIsOtpSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const data = await verifyOtpApi(email, otp);
      login(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-fuchsia-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-5 w-72 h-72 bg-sky-600 rounded-full mix-blend-lighten filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-md bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BrainCircuit className="text-fuchsia-400 h-10 w-10" />
            <h1 className="text-4xl font-bold tracking-wider">MindScribe</h1>
          </div>
          <p className="text-gray-400">
            {isOtpSent ? 'Check your email for a magic code.' : 'Unlock Your Mind\'s Potential'}
          </p>
        </div>

        {!isOtpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <StyledInput icon={<User size={20} />} type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Full Name" />
            <StyledInput icon={<Mail size={20} />} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <div><StyledButton type="submit" isLoading={isLoading}>Send Code</StyledButton></div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <p className="text-center text-sm text-gray-400">Enter the 6-digit code sent to <strong>{email}</strong>.</p>
            <StyledInput icon={<KeyRound size={20} />} type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="123456" maxLength={6} />
            {error && <p className="text-sm text-red-400 text-center">{error}</p>}
            <div><StyledButton type="submit" isLoading={isLoading}>Verify & Sign In</StyledButton></div>
          </form>
        )}
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/20" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-gray-900 px-2 text-gray-400">Or continue with</span></div>
          </div>
          <div className="mt-6">
            <a
              href={`${API_URL}/api/auth/google`}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-white/20 rounded-lg bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.81C34.553 5.822 29.581 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l4.843-4.843A19.937 19.937 0 0 0 24 4C16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.643-3.25-11.303-7.618l-6.571 4.82A19.94 19.94 0 0 0 24 44z" /><path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 0 1-5.073 7.618l6.571 4.82A19.94 19.94 0 0 0 44 24c0-1.341-.138-2.65-.389-3.917z" />
              </svg>
              Sign up with Google
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-fuchsia-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;