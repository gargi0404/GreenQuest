import React, { useState } from 'react';
import {
  BookOpen, Users, Clock, Target, Award, Flame,
  Zap, Leaf, Recycle, Sun, Wind, Home, Trophy, Search, Play
} from 'lucide-react';

const GameRules = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const [activeLevel, setActiveLevel] = useState('level1');

  const levels = {
    level1: {
      name: 'Carbon Detective',
      theme: 'Carbon Emissions & Household Energy',
      objective: 'Solve eco-challenges, answer questions, and complete puzzles that directly link to real-world environmental issues.',
      rewards: 'Eco Points, Badges, XP',
      color: 'from-red-400 to-orange-500',
      icon: <Zap className="h-6 w-6" />
    },
    level2: {
      name: 'Renewable Rangers',
      theme: 'Renewable Energy & Sustainability',
      objective: 'Explore renewable energy sources and learn about sustainable practices through interactive challenges.',
      rewards: 'Eco Points, Badges, XP',
      color: 'from-green-400 to-blue-500',
      icon: <Recycle className="h-6 w-6" />
    },
    level3: {
      name: 'Clean Energy Tycoon',
      theme: 'Energy Management & Conservation',
      objective: 'Master energy conservation techniques and learn about efficient energy usage.',
      rewards: 'Eco Points, Badges, XP',
      color: 'from-yellow-400 to-orange-500',
      icon: <Sun className="h-6 w-6" />
    },
    level4: {
      name: 'Eco-Mission Escape',
      theme: 'Environmental Problem Solving',
      objective: 'Solve complex environmental puzzles and escape room challenges.',
      rewards: 'Eco Points, Badges, XP',
      color: 'from-purple-400 to-pink-500',
      icon: <Wind className="h-6 w-6" />
    },
    level5: {
      name: 'City Planner',
      theme: 'Urban Sustainability & Planning',
      objective: 'Design sustainable cities and learn about urban environmental planning.',
      rewards: 'Eco Points, Badges, XP',
      color: 'from-blue-400 to-cyan-500',
      icon: <Home className="h-6 w-6" />
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Magnifying Glass Icon */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Carbon Detective</h1>
          <p className="text-xl text-gray-600 mb-2">Carbon Emissions & Household Energy</p>
          <p className="text-lg text-gray-500">Uncover energy mysteries and solve carbon footprint puzzles!</p>
        </div>

        {/* Objectives and Rewards Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Objectives Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Target className="h-8 w-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Objectives</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Identify energy-efficient appliances</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Calculate carbon footprints</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Solve insulation puzzles</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-gray-700">Match appliances with energy usage</span>
              </div>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Trophy className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Rewards</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-3">🏆</span>
                <span className="text-gray-700">100-200 points per game</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-3">🏆</span>
                <span className="text-gray-700">Time bonuses</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-3">🏆</span>
                <span className="text-gray-700">Combo multipliers</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-3">🏆</span>
                <span className="text-gray-700">Eco Tokens</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center space-x-2 shadow-lg transition-all duration-200">
            <Play className="h-5 w-5" />
            <span>Start Level 1</span>
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
