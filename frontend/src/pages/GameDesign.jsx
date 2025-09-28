import React, { useState } from 'react';
import {
  BookOpen, Users, Clock, Target, Award, Flame,
  Zap, Leaf, Recycle, Sun, Wind, Home, Trophy, Search, Play, ChevronRight, ChevronLeft
} from 'lucide-react';

const GameRules = () => {
  const [activeLevel, setActiveLevel] = useState(1);

  const levels = [
    {
      id: 1,
      name: 'Carbon Detective',
      theme: 'Carbon Emissions & Household Energy',
      icon: '🔍',
      color: 'from-red-400 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      objectives: [
        'Identify energy-efficient appliances',
        'Calculate carbon footprints',
        'Solve insulation puzzles',
        'Match appliances with energy usage',
        'Learn about household energy consumption'
      ],
      gameTypes: [
        'Multiple Choice Questions',
        'Energy Matching Games',
        'Carbon Footprint Calculator',
        'Appliance Efficiency Quiz',
        'Insulation Puzzle'
      ],
      rewards: '150 points + Carbon Detective Badge'
    },
    {
      id: 2,
      name: 'Renewable Rangers',
      theme: 'Renewable Energy & Sustainability',
      icon: '♻️',
      color: 'from-green-400 to-blue-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      objectives: [
        'Explore solar energy systems',
        'Understand wind power generation',
        'Learn about hydroelectric power',
        'Master recycling techniques',
        'Discover sustainable practices'
      ],
      gameTypes: [
        'Solar Panel Assembly',
        'Wind Turbine Simulation',
        'Recycling Sort Game',
        'Energy Source Matching',
        'Sustainability Quiz'
      ],
      rewards: '200 points + Renewable Ranger Badge'
    },
    {
      id: 3,
      name: 'Clean Energy Tycoon',
      theme: 'Energy Management & Conservation',
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      objectives: [
        'Master energy conservation',
        'Optimize power grid systems',
        'Learn smart home technologies',
        'Understand energy storage',
        'Plan efficient energy usage'
      ],
      gameTypes: [
        'Power Grid Management',
        'Smart Home Setup',
        'Energy Storage Puzzle',
        'Conservation Challenge',
        'Efficiency Calculator'
      ],
      rewards: '250 points + Clean Energy Tycoon Badge'
    },
    {
      id: 4,
      name: 'Eco-Mission Escape',
      theme: 'Environmental Problem Solving',
      icon: '🌿',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      objectives: [
        'Solve environmental mysteries',
        'Navigate eco-challenges',
        'Rescue endangered species',
        'Restore damaged ecosystems',
        'Complete escape room puzzles'
      ],
      gameTypes: [
        'Escape Room Challenges',
        'Ecosystem Restoration',
        'Species Rescue Mission',
        'Environmental Detective',
        'Eco-Puzzle Solving'
      ],
      rewards: '300 points + Eco Escape Master Badge'
    },
    {
      id: 5,
      name: 'City Planning Expert',
      theme: 'Urban Sustainability & Planning',
      icon: '🏙️',
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      objectives: [
        'Design sustainable cities',
        'Plan green infrastructure',
        'Optimize urban transportation',
        'Create eco-friendly buildings',
        'Balance development with nature'
      ],
      gameTypes: [
        'City Building Simulator',
        'Transportation Planning',
        'Green Building Design',
        'Urban Forest Planning',
        'Sustainability Assessment'
      ],
      rewards: '350 points + City Planning Expert Badge'
    }
  ];

  const gameRules = [
    { icon: <Clock className="h-6 w-6 text-blue-500" />, title: 'Time Limit', description: 'Each level must be completed within a specific time limit to earn maximum points.' },
    { icon: <Target className="h-6 w-6 text-green-500" />, title: 'Accuracy Matters', description: 'Correct answers earn more points. Think carefully before submitting your response.' },
    { icon: <Flame className="h-6 w-6 text-orange-500" />, title: 'Streak Bonuses', description: 'Consecutive correct answers build streaks that multiply your points.' },
    { icon: <Award className="h-6 w-6 text-purple-500" />, title: 'Badge System', description: 'Complete levels and tasks to earn badges and certificates from your school.' },
    { icon: <Users className="h-6 w-6 text-cyan-500" />, title: 'Leaderboards', description: 'Compete with classmates and see who\'s making the biggest environmental impact.' },
    { icon: <Leaf className="h-6 w-6 text-emerald-500" />, title: 'Real Impact', description: 'Your virtual actions translate to real-world environmental knowledge and skills.' }
  ];

  const proTips = [
    { emoji: '🧠', title: 'Think Critically', description: 'Analyze each question carefully. Some answers might require a deeper understanding of eco-concepts.' },
    { emoji: '⏰', title: 'Manage Time Wisely', description: 'Don\'t rush, but don\'t spend too long on one question. Balance speed with accuracy.' },
    { emoji: '🔄', title: 'Learn from Mistakes', description: 'Wrong answers are learning opportunities. Read the explanations to improve your knowledge.' },
    { emoji: '🎯', title: 'Focus on Objectives', description: 'Each level has specific learning objectives. Keep them in mind while playing.' },
    { emoji: '🌟', title: 'Build Streaks', description: 'Try to answer correctly in sequence to build streaks and earn bonus points.' },
    { emoji: '🏆', title: 'Aim for Badges', description: 'Complete all requirements to earn badges and certificates from your school.' }
  ];

  const currentLevel = levels.find(level => level.id === activeLevel);

  const nextLevel = () => {
    if (activeLevel < 5) {
      setActiveLevel(activeLevel + 1);
    }
  };

  const prevLevel = () => {
    if (activeLevel > 1) {
      setActiveLevel(activeLevel - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-3">🌿</div>
            <h1 className="text-4xl font-bold text-gray-800">Green Innovators Game Hub</h1>
            <div className="text-4xl ml-3">🎮</div>
          </div>
          <p className="text-xl text-gray-600">Choose your eco-adventure and earn rewards!</p>
        </div>

        {/* Daily Bonus Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-xl p-4 mb-8 text-center shadow-lg">
          <div className="flex items-center justify-center">
            <span className="text-2xl mr-2">🎁</span>
            <span className="text-lg font-semibold">Daily Bonus Available! +50 XP for first level today</span>
          </div>
        </div>

        {/* Player Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-center space-x-8 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">Level: 1</div>
              <div className="text-sm text-gray-600">Current Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">XP: 0</div>
              <div className="text-sm text-gray-600">Experience Points</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">Badges: 0</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {levels.map((level) => (
            <div key={level.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-200">
              {/* Level Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="text-3xl mr-3">{level.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Level {level.id}: {level.name}</h3>
                    <p className="text-sm text-gray-600">{level.theme}</p>
                  </div>
                </div>
                {level.id <= 2 ? (
                  <div className="flex items-center text-green-600">
                    <span className="text-sm font-semibold mr-1">Completed!</span>
                    <span className="text-lg">✓</span>
                  </div>
                ) : level.id === 3 ? (
                  <div className="text-gray-600">
                    <span className="text-sm">Available</span>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-400">
                    <span className="text-sm mr-1">Level {level.id} locked</span>
                    <span className="text-lg">🔒</span>
                  </div>
                )}
              </div>

              {/* Score and Difficulty */}
              {level.id <= 2 && (
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-bold text-blue-600">Score: {level.id === 1 ? '850' : '720'}</div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    level.id <= 2 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {level.id <= 2 ? 'Easy' : 'Medium'}
                  </div>
                </div>
              )}

              {/* Rewards */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Rewards:</div>
                <div className="text-sm font-semibold text-yellow-600">{level.rewards}</div>
              </div>

              {/* Estimated Time */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">Estimated Time:</div>
                <div className="text-sm font-semibold text-gray-800">
                  {level.id === 1 ? '15 min' : level.id === 2 ? '20 min' : level.id === 3 ? '25 min' : '30 min'}
                </div>
              </div>

              {/* Unlock Condition for locked levels */}
              {level.id > 3 && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <div className="text-sm text-gray-600">
                    {level.id === 4 ? 'Reach level 3 to unlock' : 'Reach level 4 to unlock'}
                  </div>
                </div>
              )}

              {/* Difficulty Badge */}
              <div className="flex justify-end">
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  level.id <= 2 ? 'bg-green-100 text-green-800' : 
                  level.id === 3 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {level.id <= 2 ? 'Easy' : level.id === 3 ? 'Medium' : 'Hard'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Game Rules */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🎮 General Game Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameRules.map((rule, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                <div className="flex justify-center mb-3">
                  {rule.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{rule.title}</h3>
                <p className="text-sm text-gray-600">{rule.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">💡 Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proTips.map((tip, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all duration-200">
                <div className="text-3xl mb-3">{tip.emoji}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Start Your Eco Journey?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">5</span>
              <span className="text-sm">Epic Levels</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">50</span>
              <span className="text-sm">Mini Games</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">1000+</span>
              <span className="text-sm">Eco Points</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">∞</span>
              <span className="text-sm">Fun Learning</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRules;
