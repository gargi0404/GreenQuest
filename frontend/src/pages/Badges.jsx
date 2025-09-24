import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Award, Star, Filter, Search, Lock, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const Badges = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [availableBadges, setAvailableBadges] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    rarity: '',
    earned: 'all' // all, earned, available
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBadges();
  }, [filters]);

  const fetchBadges = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.rarity) params.append('rarity', filters.rarity);

      const [badgesRes, availableRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/gamification/badges?${params}`),
        axios.get(`${API_BASE_URL}/gamification/badges/available`)
      ]);

      setBadges(badgesRes.data.data.badges);
      setAvailableBadges(availableRes.data.data.available);
      setUserBadges(user.badges || []);
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
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

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'participation': return '🎯';
      case 'achievement': return '🏆';
      case 'milestone': return '⭐';
      case 'special': return '💫';
      case 'environmental': return '🌱';
      case 'social': return '🤝';
      default: return '🏅';
    }
  };

  const isBadgeEarned = (badgeName) => {
    return userBadges.some(badge => badge.name === badgeName);
  };

  const canEarnBadge = (pointsRequired) => {
    return user.points >= pointsRequired;
  };

  const getFilteredBadges = () => {
    let filtered = badges;

    if (filters.earned === 'earned') {
      filtered = filtered.filter(badge => isBadgeEarned(badge.name));
    } else if (filters.earned === 'available') {
      filtered = filtered.filter(badge => canEarnBadge(badge.pointsRequired) && !isBadgeEarned(badge.name));
    }

    return filtered;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const filteredBadges = getFilteredBadges();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Badges 🏅</h1>
          <p className="text-gray-600">Collect badges by completing challenges and reaching milestones</p>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="h-6 w-6 text-yellow-500" />
          <span className="text-sm text-gray-600">{userBadges.length} earned</span>
        </div>
      </div>

      {/* User Progress */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Badge Collection</h2>
            <p className="text-yellow-100">Keep earning to unlock more achievements!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{userBadges.length}</div>
            <div className="text-yellow-100">badges earned</div>
            <div className="text-sm text-yellow-200 mt-1">
              {badges.length - userBadges.length} remaining
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="">All Categories</option>
            <option value="participation">Participation</option>
            <option value="achievement">Achievement</option>
            <option value="milestone">Milestone</option>
            <option value="special">Special</option>
            <option value="environmental">Environmental</option>
            <option value="social">Social</option>
          </select>

          <select
            value={filters.rarity}
            onChange={(e) => setFilters(prev => ({ ...prev, rarity: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="">All Rarities</option>
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
          </select>

          <select
            value={filters.earned}
            onChange={(e) => setFilters(prev => ({ ...prev, earned: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="all">All Badges</option>
            <option value="earned">Earned</option>
            <option value="available">Available</option>
          </select>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBadges.map((badge) => {
          const earned = isBadgeEarned(badge.name);
          const available = canEarnBadge(badge.pointsRequired);
          
          return (
            <div
              key={badge._id}
              className={`card transition-all duration-200 ${
                earned 
                  ? 'ring-2 ring-yellow-300 bg-yellow-50' 
                  : available 
                    ? 'hover:shadow-md' 
                    : 'opacity-60'
              }`}
            >
              <div className="text-center">
                <div className="relative inline-block">
                  <div className={`text-6xl mb-4 ${earned ? '' : 'grayscale'}`}>
                    {badge.icon}
                  </div>
                  {earned && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  )}
                  {!earned && !available && (
                    <div className="absolute -top-2 -right-2 bg-gray-500 rounded-full p-1">
                      <Lock className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{badge.description}</p>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <span className={`badge ${getRarityColor(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                  <span className="text-sm text-gray-500">
                    {getCategoryIcon(badge.category)} {badge.category}
                  </span>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">
                    {badge.pointsRequired} points required
                  </div>
                  
                  {earned ? (
                    <div className="flex items-center justify-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Earned!</span>
                    </div>
                  ) : available ? (
                    <div className="text-primary-600 text-sm font-medium">
                      Ready to earn!
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm">
                      Need {badge.pointsRequired - user.points} more points
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No badges found</h3>
          <p className="text-gray-600">Try adjusting your filters or keep earning points to unlock more badges.</p>
        </div>
      )}

      {/* Badge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">{userBadges.length}</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{badges.length}</div>
          <div className="text-sm text-gray-600">Total Badges</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">
            {Math.round((userBadges.length / badges.length) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Completion</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">
            {userBadges.filter(badge => badge.category === 'environmental').length}
          </div>
          <div className="text-sm text-gray-600">Eco Badges</div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
