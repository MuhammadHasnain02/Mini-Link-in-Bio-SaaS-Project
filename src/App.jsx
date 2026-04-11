import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';

import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Toaster position="top-right" toastOptions={{
          style: { background: '#1E293B', color: '#f1f5f9', border: '1px solid #334155' }
        }} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Example of Dashboard, normally would be a separate component */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <div className="flex h-screen items-center justify-center p-8 text-center flex-col gap-4">
                <h1 className="text-4xl text-white font-light">Dashboard</h1>
                <p className="text-slate-400">Welcome to your secure user area.</p>
                <AuthContext.Consumer>
                  {({ logout }) => (
                    <button onClick={logout} className="text-primary-500 hover:text-primary-400 underline mt-4">
                      Log Out
                    </button>
                  )}
                </AuthContext.Consumer>
              </div>
            </ProtectedRoute>
          } />

          {/* 404 Page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
