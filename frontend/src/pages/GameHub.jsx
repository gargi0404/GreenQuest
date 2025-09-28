import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Recycle, Sun, Wind, Home, Trophy, Star, Lock, CheckCircle } from 'lucide-react';
import axios from 'axios';

const GameHub = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [completedLevels, setCompletedLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompletedLevels();
  }, []);

  const fetchCompletedLevels = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/gamification/completed-levels', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompletedLevels(response.data.data.completedLevels || []);
    } catch (error) {
      console.error('Error fetching completed levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const levels = [
    {
      id: 1,
      title: 'Carbon Detective',
      description: 'Learn about carbon emissions and household energy consumption',
      icon: <Zap className="h-8 w-8" />,
      color: 'from-red-400 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      unlocked: true,
      questions: 10,
      estimatedTime: '15-20 minutes',
      completed: completedLevels.includes(1)
    },
    {
      id: 2,
      title: 'Renewable Rangers',
      description: 'Explore renewable energy sources and sustainability practices',
      icon: <Recycle className="h-8 w-8" />,
      color: 'from-green-400 to-blue-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      unlocked: completedLevels.includes(1),
      questions: 10,
      estimatedTime: '15-20 minutes',
      completed: completedLevels.includes(2)
    },
    {
      id: 3,
      title: 'Clean Energy Tycoon',
      description: 'Master energy conservation and efficient energy usage',
      icon: <Sun className="h-8 w-8" />,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      unlocked: completedLevels.includes(2),
      questions: 10,
      estimatedTime: '15-20 minutes',
      completed: completedLevels.includes(3)
    },
    {
      id: 4,
      title: 'Eco-Mission Escape',
      description: 'Solve complex environmental puzzles and challenges',
      icon: <Wind className="h-8 w-8" />,
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      unlocked: completedLevels.includes(3),
      questions: 10,
      estimatedTime: '15-20 minutes',
      completed: completedLevels.includes(4)
    },
    {
      id: 5,
      title: 'City Planner',
      description: 'Design sustainable cities and urban environmental planning',
      icon: <Home className="h-8 w-8" />,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      unlocked: completedLevels.includes(4),
      questions: 10,
      estimatedTime: '15-20 minutes',
      completed: completedLevels.includes(5)
    }
  ];

  const handleLevelClick = (level) => {
    if (level.unlocked) {
      navigate(`/game/level-${level.id}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎮 Game Module
          </h1>
          <p className="text-xl text-green-100 mb-6">
            Choose your eco-adventure! Complete levels to earn badges and certificates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/20 rounded-lg p-4">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-green-100">Levels</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">50</div>
              <div className="text-green-100">Questions</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <Zap className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">∞</div>
              <div className="text-green-100">Knowledge</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Levels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => (
            <div
              key={level.id}
              className={`${level.bgColor} ${level.borderColor} border-2 rounded-xl p-6 transition-all duration-300 ${
                level.unlocked 
                  ? 'cursor-pointer hover:shadow-lg transform hover:-translate-y-1' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => handleLevelClick(level)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl p-3 rounded-full bg-gradient-to-r ${level.color} text-white shadow-md`}>
                  {level.icon}
                </div>
                <div className="flex space-x-2">
                  {level.completed && (
                    <div className="text-green-500">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  )}
                  {!level.unlocked && (
                    <div className="text-gray-400">
                      <Lock className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">{level.title}</h3>
              <p className="text-gray-700 mb-4">{level.description}</p>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="font-medium">Questions:</span>
                  <span className="ml-2">{level.questions}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">Time:</span>
                  <span className="ml-2">{level.estimatedTime}</span>
                </div>
              </div>

              <div className="mt-4">
                {level.completed ? (
                  <button className="w-full py-2 px-4 rounded-lg font-semibold bg-green-500 text-white cursor-default">
                    ✅ Completed
                  </button>
                ) : level.unlocked ? (
                  <button className={`w-full py-2 px-4 rounded-lg font-semibold bg-gradient-to-r ${level.color} text-white hover:shadow-md transition-all duration-200`}>
                    Start Level
                  </button>
                ) : (
                  <button className="w-full py-2 px-4 rounded-lg font-semibold bg-gray-300 text-gray-500 cursor-not-allowed">
                    Locked
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{completedLevels.length}/5</div>
              <div className="text-gray-600">Levels Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{completedLevels.length * 10}/50</div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{completedLevels.length}</div>
              <div className="text-gray-600">Badges Earned</div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🚀 Ready to Start Your Eco-Journey?</h3>
          <p className="text-green-100 mb-6">
            Complete levels in order to unlock new challenges and earn badges from your school!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold">Answer Questions</div>
              <div className="text-sm text-green-100">Test your environmental knowledge</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <div className="font-semibold">Earn Badges</div>
              <div className="text-sm text-green-100">Get recognition for your achievements</div>
            </div>
            <div>
              <div className="text-3xl mb-2">📜</div>
              <div className="font-semibold">Get Certificates</div>
              <div className="text-sm text-green-100">Official recognition from your school</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHub;
