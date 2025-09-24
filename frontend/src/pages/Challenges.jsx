import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Clock, Star, Play, CheckCircle, Lock, Filter } from 'lucide-react';

const Challenges = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    status: 'all'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChallenges();
  }, [filters]);

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      // Mock data for challenges
      const mockChallenges = [
        {
          id: 1,
          title: "Climate Change Basics",
          description: "Learn about the fundamentals of climate change and its impacts on our planet.",
          category: "environmental",
          difficulty: "beginner",
          points: 50,
          duration: "15 min",
          status: "available",
          completed: false,
          questions: 10,
          icon: "🌍"
        },
        {
          id: 2,
          title: "Renewable Energy Quiz",
          description: "Test your knowledge about solar, wind, and other renewable energy sources.",
          category: "environmental",
          difficulty: "intermediate",
          points: 75,
          duration: "20 min",
          status: "available",
          completed: true,
          questions: 15,
          icon: "⚡"
        },
        {
          id: 3,
          title: "Ocean Conservation",
          description: "Explore marine ecosystems and learn about ocean conservation efforts.",
          category: "environmental",
          difficulty: "advanced",
          points: 100,
          duration: "25 min",
          status: "locked",
          completed: false,
          questions: 20,
          icon: "🐋"
        },
        {
          id: 4,
          title: "Waste Reduction Challenge",
          description: "Learn about waste management and how to reduce your environmental footprint.",
          category: "lifestyle",
          difficulty: "beginner",
          points: 40,
          duration: "12 min",
          status: "available",
          completed: false,
          questions: 8,
          icon: "♻️"
        },
        {
          id: 5,
          title: "Biodiversity Explorer",
          description: "Discover the importance of biodiversity and ecosystem conservation.",
          category: "environmental",
          difficulty: "intermediate",
          points: 80,
          duration: "18 min",
          status: "available",
          completed: false,
          questions: 12,
          icon: "🦋"
        },
        {
          id: 6,
          title: "Sustainable Living",
          description: "Learn practical tips for living a more sustainable lifestyle.",
          category: "lifestyle",
          difficulty: "beginner",
          points: 60,
          duration: "15 min",
          status: "available",
          completed: true,
          questions: 10,
          icon: "🌱"
        }
      ];

      setChallenges(mockChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'environmental': return '🌍';
      case 'lifestyle': return '🌱';
      case 'science': return '🔬';
      case 'social': return '🤝';
      default: return '📚';
    }
  };

  const getFilteredChallenges = () => {
    let filtered = challenges;

    if (filters.category) {
      filtered = filtered.filter(challenge => challenge.category === filters.category);
    }

    if (filters.difficulty) {
      filtered = filtered.filter(challenge => challenge.difficulty === filters.difficulty);
    }

    if (filters.status === 'completed') {
      filtered = filtered.filter(challenge => challenge.completed);
    } else if (filters.status === 'available') {
      filtered = filtered.filter(challenge => challenge.status === 'available' && !challenge.completed);
    } else if (filters.status === 'locked') {
      filtered = filtered.filter(challenge => challenge.status === 'locked');
    }

    return filtered;
  };

  const startChallenge = (challengeId) => {
    // In a real app, this would navigate to the challenge
    console.log('Starting challenge:', challengeId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const filteredChallenges = getFilteredChallenges();
  const completedChallenges = challenges.filter(c => c.completed).length;
  const availableChallenges = challenges.filter(c => c.status === 'available' && !c.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Challenges 📚</h1>
          <p className="text-gray-600">Test your environmental knowledge and earn points</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedChallenges}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">{availableChallenges}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Learning Progress</h2>
            <p className="text-primary-100">Keep challenging yourself to grow!</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{completedChallenges}</div>
            <div className="text-primary-100">challenges completed</div>
            <div className="text-sm text-primary-200 mt-1">
              {Math.round((completedChallenges / challenges.length) * 100)}% completion rate
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
            <option value="environmental">Environmental</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="science">Science</option>
            <option value="social">Social</option>
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="input-field w-auto"
          >
            <option value="all">All Challenges</option>
            <option value="available">Available</option>
            <option value="completed">Completed</option>
            <option value="locked">Locked</option>
          </select>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className={`card transition-all duration-200 ${
              challenge.completed 
                ? 'ring-2 ring-green-300 bg-green-50' 
                : challenge.status === 'locked'
                  ? 'opacity-60'
                  : 'hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{challenge.icon}</div>
              <div className="flex items-center space-x-2">
                {challenge.completed && (
                  <div className="bg-green-500 rounded-full p-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                )}
                {challenge.status === 'locked' && (
                  <div className="bg-gray-500 rounded-full p-1">
                    <Lock className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm text-gray-500">
                {getCategoryIcon(challenge.category)} {challenge.category}
              </span>
              <span className={`badge ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {challenge.points} points
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {challenge.duration}
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {challenge.questions} questions
              </div>
            </div>

            <div className="mt-4">
              {challenge.completed ? (
                <div className="flex items-center justify-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Completed!</span>
                </div>
              ) : challenge.status === 'locked' ? (
                <div className="flex items-center justify-center text-gray-500">
                  <Lock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Locked</span>
                </div>
              ) : (
                <button
                  onClick={() => startChallenge(challenge.id)}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Challenge
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later for new challenges.</p>
        </div>
      )}

      {/* Challenge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-600">{completedChallenges}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-primary-600">{availableChallenges}</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-yellow-600">
            {challenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0)}
          </div>
          <div className="text-sm text-gray-600">Points Earned</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-purple-600">
            {Math.round((completedChallenges / challenges.length) * 100)}%
          </div>
          <div className="text-sm text-gray-600">Completion Rate</div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
