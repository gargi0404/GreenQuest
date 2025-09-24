import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import NGODashboard from './pages/NGODashboard';
import AdminDashboard from './pages/AdminDashboard';
import Leaderboard from './pages/Leaderboard';
import Badges from './pages/Badges';
import Challenges from './pages/Challenges';
import Community from './pages/Community';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected routes */}
          <Route path="/" element={<Layout />}>
            {/* Redirect to appropriate dashboard based on role */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* Role-based dashboard routes */}
            <Route 
              path="dashboard" 
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <RoleBasedDashboard />
                  </ErrorBoundary>
                </ProtectedRoute>
              } 
            />
            
            {/* Common routes for all authenticated users */}
            <Route 
              path="leaderboard" 
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="badges" 
              element={
                <ProtectedRoute>
                  <Badges />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="challenges" 
              element={
                <ProtectedRoute>
                  <Challenges />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="community" 
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Component to render appropriate dashboard based on user role
const RoleBasedDashboard = () => {
  const { user, loading } = useAuth();
  
  // Show loading state while user data is being fetched
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  // Handle case where user exists but has no role
  if (!user.role) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'ngo':
      return <NGODashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/unauthorized" replace />;
  }
};

export default App;