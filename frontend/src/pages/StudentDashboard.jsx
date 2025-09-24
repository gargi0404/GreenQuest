import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Target,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [recentBadges, setRecentBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, leaderboardRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/gamification/stats`),
        axios.get(`${API_BASE_URL}/leaderboard?limit=5`)
      ]);

      setStats(statsRes.data.data);
      setLeaderboard(leaderboardRes.data.data.leaderboard);
      setRecentBadges(user?.badges?.slice(-3).reverse() || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getNextBadge = () => {
    if (stats?.nextBadges?.length > 0) {
      return stats.nextBadges[0];
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const nextBadge = getNextBadge();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'Student'}! 🌱</h1>
            <p className="text-primary-100 mt-1">Ready to continue your eco-journey?</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{user?.points || 0}</div>
            <div className="text-primary-100">Eco Points</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Level Card */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Star className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Level</p>
              <p className="text-2xl font-bold text-gray-900">{user?.level || 1}</p>
            </div>
          </div>
        </div>

        {/* Points Card */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{user?.points || 0}</p>
            </div>
          </div>
        </div>

        {/* Badges Card */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Badges</p>
              <p className="text-2xl font-bold text-gray-900">{user?.badges?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* Rank Card */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Global Rank</p>
              <p className="text-2xl font-bold text-gray-900">
                #{leaderboard.findIndex(item => item.id === user?.id) + 1 || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Badge Progress */}
        {nextBadge && (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Badge</h3>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{nextBadge.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{nextBadge.name}</h4>
                <p className="text-sm text-gray-600">{nextBadge.description}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{user?.points || 0}/{nextBadge.pointsRequired}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(user.points, nextBadge.pointsRequired)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {nextBadge.pointsNeeded} more points needed
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Badges */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Badges</h3>
          {recentBadges.length > 0 ? (
            <div className="space-y-3">
              {recentBadges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <p className="font-medium text-gray-900">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No badges earned yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <BookOpen className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Start Challenge</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Users className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">Join Community</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200">
            <Calendar className="h-6 w-6 text-gray-400 mr-2" />
            <span className="text-gray-600">View Events</span>
          </button>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {leaderboard.slice(0, 5).map((player, index) => (
            <div key={player.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                  index === 2 ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-50 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{player.name}</p>
                  <p className="text-sm text-gray-600">Level {player.level}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{player.points}</p>
                <p className="text-sm text-gray-600">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
