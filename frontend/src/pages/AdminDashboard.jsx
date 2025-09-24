import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Shield, 
  BarChart3, 
  Settings, 
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBadges: 0,
    totalPoints: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch users (in a real app, this would be paginated)
      const usersRes = await axios.get(`${API_BASE_URL}/leaderboard?limit=50`);
      setUsers(usersRes.data.data.leaderboard);

      // Fetch badges
      const badgesRes = await axios.get(`${API_BASE_URL}/gamification/badges`);
      setBadges(badgesRes.data.data.badges);

      // Calculate stats
      const totalPoints = usersRes.data.data.leaderboard.reduce((sum, user) => sum + user.points, 0);
      setStats({
        totalUsers: usersRes.data.data.leaderboard.length,
        totalBadges: badgesRes.data.data.badges.length,
        totalPoints,
        activeUsers: usersRes.data.data.leaderboard.filter(u => u.points > 0).length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'ngo': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'badge-common';
      case 'uncommon': return 'badge-uncommon';
      case 'rare': return 'badge-rare';
      case 'epic': return 'badge-epic';
      case 'legendary': return 'badge-legendary';
      default: return 'badge-common';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard ⚙️</h1>
            <p className="text-red-100 mt-1">Manage the GreenQuest platform</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <div className="text-red-100">Total Users</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Active Users */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
            </div>
          </div>
        </div>

        {/* Total Badges */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Badges</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBadges}</p>
            </div>
          </div>
        </div>

        {/* Total Points */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Settings className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All Users
            </button>
          </div>
          <div className="space-y-3">
            {users.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`badge ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <span className="text-sm text-gray-500">Level {user.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{user.points}</p>
                    <p className="text-sm text-gray-600">points</p>
                  </div>
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Management */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Badge Management</h3>
            <button className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Badge
            </button>
          </div>
          <div className="space-y-3">
            {badges.slice(0, 5).map((badge) => (
              <div key={badge._id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`badge ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                      <span className="text-sm text-gray-500">{badge.pointsRequired} points</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-red-400 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Analytics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">{stats.totalUsers}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{stats.totalPoints.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Eco-Points Distributed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{stats.totalBadges}</div>
            <div className="text-sm text-gray-600">Total Badges</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">User Engagement</div>
          </div>
        </div>
      </div>

      {/* User Distribution */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution by Role</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === 'student').length}
            </div>
            <div className="text-sm text-blue-800">Students</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.role === 'teacher').length}
            </div>
            <div className="text-sm text-green-800">Teachers</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === 'ngo').length}
            </div>
            <div className="text-sm text-purple-800">NGOs</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-sm text-red-800">Admins</div>
          </div>
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600">92%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">1.2K</div>
            <div className="text-sm text-gray-600">Daily Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">456</div>
            <div className="text-sm text-gray-600">Challenges Completed Today</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Users className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Manage Users</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <BarChart3 className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">View Analytics</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Settings className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">System Settings</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Shield className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Security</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
