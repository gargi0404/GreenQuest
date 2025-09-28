import React, { useState } from 'react';
import {
  BookOpen, Target, Users, Award, Clock,
  Zap, Leaf, Recycle, Sun, Wind, Home, Trophy,
  Flame
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
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-4">
          <BookOpen className="inline-block h-10 w-10 mr-3 text-primary-600" />
          Game Rules & Guide
        </h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Master GreenQuest: Learn the rules, conquer challenges, and become an Eco-Hero!
        </p>

        {/* Tabs for Rules and Pro Tips */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-full shadow-lg flex space-x-2">
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === 'rules' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Game Rules
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === 'tips' ? 'bg-primary-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pro Tips
            </button>
          </div>
        </div>

        {activeTab === 'rules' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameRules.map((rule, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 border-b-4 border-primary-400"
              >
                <div className="text-5xl mb-4">{rule.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{rule.title}</h3>
                <p className="text-gray-700">{rule.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 border-b-4 border-green-400"
              >
                <div className="text-5xl mb-4">{tip.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-700">{tip.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Level Selector */}
        <h2 className="text-3xl font-bold text-gray-900 text-center mt-16 mb-8">Explore Levels</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(levels).map((levelKey) => {
            const level = levels[levelKey];
            return (
              <button
                key={levelKey}
                onClick={() => setActiveLevel(levelKey)}
                className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeLevel === levelKey
                    ? `bg-gradient-to-r ${level.color} text-white shadow-lg transform scale-105`
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {level.icon}
                <span>{level.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Level Details */}
        {activeLevel && (
          <div className={`bg-white rounded-xl shadow-lg p-8 border-b-4 ${levels[activeLevel].color.split(' ')[2].replace('to-', 'border-')} mb-12`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`text-5xl p-3 rounded-full bg-gradient-to-r ${levels[activeLevel].color} text-white shadow-md`}>
                {levels[activeLevel].icon}
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{levels[activeLevel].name}</h3>
                <p className="text-lg text-gray-600">Theme: {levels[activeLevel].theme}</p>
              </div>
            </div>
            <div className="space-y-4 text-gray-800">
              <div>
                <h4 className="font-semibold text-xl mb-1">Objective:</h4>
                <p>{levels[activeLevel].objective}</p>
              </div>
              <div>
                <h4 className="font-semibold text-xl mb-1">Rewards:</h4>
                <p>{levels[activeLevel].rewards}</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button className={`px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg bg-gradient-to-r ${levels[activeLevel].color} text-white`}>
                Start {levels[activeLevel].name}
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to become an Eco-Hero?</h2>
          <p className="text-lg mb-6">Join thousands of students making a difference!</p>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <Users className="h-10 w-10 mb-2" />
              <span className="text-2xl font-bold">1.5K+</span>
              <span className="text-sm">Members</span>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="h-10 w-10 mb-2" />
              <span className="text-2xl font-bold">50+</span>
              <span className="text-sm">Badges</span>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="h-10 w-10 mb-2" />
              <span className="text-2xl font-bold">100+</span>
              <span className="text-sm">Challenges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRules;
