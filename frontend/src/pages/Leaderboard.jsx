import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Medal, Award, Filter, Search } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const Leaderboard = () => {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [filters, setFilters] = useState({
    role: '',
    timeframe: 'all',
    limit: 50
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [filters]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.role) params.append('role', filters.role);
      if (filters.timeframe) params.append('timeframe', filters.timeframe);
      if (filters.limit) params.append('limit', filters.limit);

      const [leaderboardRes, rankRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/leaderboard?${params}`),
        axios.get(`${API_BASE_URL}/leaderboard/rank?${params}`)
      ]);

      setLeaderboard(leaderboardRes.data.data.leaderboard);
      setUserRank(rankRes.data.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="h-6 w-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-6 w-6 text-gray-400" />;
    if (rank === 3) return <Award className="h-6 w-6 text-orange-500" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return 'bg-yellow-100 border-yellow-300';
    if (rank === 2) return 'bg-gray-100 border-gray-300';
    if (rank === 3) return 'bg-orange-100 border-orange-300';
    return 'bg-white border-gray-200';
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leaderboard 🏆</h1>
          <p className="text-gray-600">See how you rank against other eco-warriors</p>
        </div>
        <div className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <span className="text-sm text-gray-600">Global Rankings</span>
        </div>
      </div>

      {/* User Rank Card */}
      {userRank && (
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Your Rank</h2>
              <p className="text-primary-100">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">#{userRank.current}</div>
              <div className="text-primary-100">out of {userRank.total} users</div>
              <div className="text-sm text-primary-200 mt-1">
                {userRank.points} points • Level {userRank.level}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.role}
            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="ngo">NGOs</option>
            <option value="admin">Admins</option>
          </select>

          <select
            value={filters.timeframe}
            onChange={(e) => setFilters(prev => ({ ...prev, timeframe: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>

          <select
            value={filters.limit}
            onChange={(e) => setFilters(prev => ({ ...prev, limit: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="25">Top 25</option>
            <option value="50">Top 50</option>
            <option value="100">Top 100</option>
          </select>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="card">
        <div className="space-y-3">
          {leaderboard.map((player, index) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                player.id === user?.id 
                  ? 'bg-primary-50 border-primary-300 shadow-md' 
                  : getRankColor(player.rank)
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(player.rank)}
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{player.name}</h3>
                      {player.id === user?.id && (
                        <span className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`badge ${getRoleColor(player.role)}`}>
                        {player.role}
                      </span>
                      <span className="text-sm text-gray-500">Level {player.level}</span>
                      {player.school && (
                        <span className="text-sm text-gray-500">• {player.school}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{player.points.toLocaleString()}</div>
                <div className="text-sm text-gray-600">points</div>
                <div className="flex items-center justify-end mt-1">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-gray-600">{player.badges} badges</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {leaderboard.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rankings found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{leaderboard.length}</div>
          <div className="text-sm text-gray-600">Total Players</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {leaderboard.length > 0 ? leaderboard[0].points.toLocaleString() : 0}
          </div>
          <div className="text-sm text-gray-600">Highest Score</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {leaderboard.length > 0 ? Math.round(leaderboard.reduce((sum, p) => sum + p.points, 0) / leaderboard.length) : 0}
          </div>
          <div className="text-sm text-gray-600">Average Score</div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
