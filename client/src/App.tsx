// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import SignupPage from './pages/SignupPage';
// import DashboardPage from './pages/DashboardPage';

// // Helper component to protect routes that require authentication.
// // If the user is authenticated, it renders the requested component (children).
// // If not, it redirects them to the login page.
// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// // Helper component to handle the login page route.
// // If the user is already authenticated, it redirects them to the dashboard.
// // If not, it shows the SignupPage.
// const LoginPage = () => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <Navigate to="/" /> : <SignupPage />;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<LoginPage />} />
//           <Route
//             path="/"
//             element={
//               <PrivateRoute>
//                 <DashboardPage />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import GoogleAuthCallback from './components/GoogleAuthCallback'; // 1. Import the new component

// Helper component to protect routes that require authentication.
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Helper component to handle the login page route.
// NOTE: I've updated this to point to SignupPage, assuming that's your main entry point for non-logged-in users.
const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : <SignupPage />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* 2. Add the new route for the Google callback */}
          <Route path="/auth/callback" element={<GoogleAuthCallback />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;