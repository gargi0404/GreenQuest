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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎮 Game Rules & Guide 🎮</h1>
          <p className="text-xl text-gray-600">Master all 5 levels of environmental challenges!</p>
        </div>

        {/* Level Navigation */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <button
            onClick={prevLevel}
            disabled={activeLevel === 1}
            className={`p-2 rounded-full ${activeLevel === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-50'} shadow-md transition-all duration-200`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="flex space-x-2">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  activeLevel === level.id
                    ? `bg-gradient-to-r ${level.color} text-white shadow-lg`
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                Level {level.id}
              </button>
            ))}
          </div>

          <button
            onClick={nextLevel}
            disabled={activeLevel === 5}
            className={`p-2 rounded-full ${activeLevel === 5 ? 'bg-gray-200 text-gray-400' : 'bg-white text-gray-600 hover:bg-gray-50'} shadow-md transition-all duration-200`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Current Level Details */}
        <div className={`${currentLevel.bgColor} rounded-xl shadow-lg p-8 mb-8 border-2 ${currentLevel.borderColor}`}>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{currentLevel.icon}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{currentLevel.name}</h2>
            <p className="text-xl text-gray-600">{currentLevel.theme}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Objectives */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Target className="h-6 w-6 text-green-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Objectives</h3>
              </div>
              <div className="space-y-3">
                {currentLevel.objectives.map((objective, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Types */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Play className="h-6 w-6 text-blue-500 mr-2" />
                <h3 className="text-xl font-bold text-gray-800">Game Types</h3>
              </div>
              <div className="space-y-3">
                {currentLevel.gameTypes.map((gameType, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-blue-500 mr-3">🎯</span>
                    <span className="text-gray-700">{gameType}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rewards */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-800">Rewards</h3>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{currentLevel.rewards}</div>
            </div>
          </div>
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

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button className={`bg-gradient-to-r ${currentLevel.color} text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200`}>
            <Play className="h-5 w-5" />
            <span>Start Level {activeLevel}</span>
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200">
            Practice Mode
          </button>
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
