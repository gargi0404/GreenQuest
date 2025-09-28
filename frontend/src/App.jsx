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
import Community from './pages/Community';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';
import RealWorldEcoTasks from './pages/RealWorldEcoTasks';
import GameRules from './pages/GameDesign';
import GameHub from './pages/GameHub';
import Level1 from './pages/levels/Level1';
import Level2 from './pages/levels/Level2';
import Level3 from './pages/levels/Level3';
import Level4 from './pages/levels/Level4';
import Level5 from './pages/levels/Level5';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/game" element={<GameHub />} />
          <Route path="/game/level-1" element={<Level1 />} />
          <Route path="/game/level-2" element={<Level2 />} />
          <Route path="/game/level-3" element={<Level3 />} />
          <Route path="/game/level-4" element={<Level4 />} />
          <Route path="/game/level-5" element={<Level5 />} />
          
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
              path="real-world-tasks" 
              element={
                <ProtectedRoute>
                  <RealWorldEcoTasks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="game-rules" 
              element={
                <ProtectedRoute>
                  <GameRules />
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