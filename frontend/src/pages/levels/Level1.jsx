import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameHUD from '../../components/GameHUD';
import { Zap, Star, Heart, Shield, Clock, Target, Trophy, Sparkles } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';
const LEVEL_TIME_SEC = 1200; // 20 minutes

const Level1 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(LEVEL_TIME_SEC);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showAchievement, setShowAchievement] = useState(null);
  const [powerUps, setPowerUps] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [energyLevel, setEnergyLevel] = useState(100);
  const [showPowerUpEffect, setShowPowerUpEffect] = useState(null);
  const [showCollectible, setShowCollectible] = useState(null);
  const [multiplier, setMultiplier] = useState(1);
  const [perfectStreak, setPerfectStreak] = useState(0);

  // Power-up definitions
  const POWER_UPS = [
    {
      id: 'time_boost',
      name: 'Time Boost',
      icon: <Clock className="h-4 w-4" />,
      description: 'Adds 30 seconds to timer',
      effect: () => setTimeRemaining(prev => prev + 30),
      rarity: 'common'
    },
    {
      id: 'score_multiplier',
      name: 'Score Doubler',
      icon: <Star className="h-4 w-4" />,
      description: 'Doubles next answer score',
      effect: () => setMultiplier(2),
      rarity: 'uncommon'
    },
    {
      id: 'hint_reveal',
      name: 'Smart Hint',
      icon: <Target className="h-4 w-4" />,
      description: 'Reveals correct answer',
      effect: () => {
        const currentGame = GAMES[currentGameIndex];
        setAnswers(prev => ({ ...prev, [currentGame.id]: currentGame.correct }));
      },
      rarity: 'rare'
    },
    {
      id: 'energy_boost',
      name: 'Energy Boost',
      icon: <Zap className="h-4 w-4" />,
      description: 'Restores energy to 100%',
      effect: () => setEnergyLevel(100),
      rarity: 'common'
    }
  ];

  // Collectibles definitions
  const COLLECTIBLES = [
    { id: 'eco_gem', name: 'Eco Gem', icon: '💎', points: 50, rarity: 'rare' },
    { id: 'green_leaf', name: 'Green Leaf', icon: '🍃', points: 25, rarity: 'common' },
    { id: 'solar_crystal', name: 'Solar Crystal', icon: '☀️', points: 75, rarity: 'epic' },
    { id: 'wind_feather', name: 'Wind Feather', icon: '🪶', points: 30, rarity: 'uncommon' },
    { id: 'water_drop', name: 'Water Drop', icon: '💧', points: 20, rarity: 'common' }
  ];

  const GAMES = [
    {
      id: 'carbon_footprint',
      type: 'multiple_choice',
      question: 'What is the average carbon footprint of a person in India per year?',
      options: [
        { id: 'a', text: '1.8 tonnes CO2' },
        { id: 'b', text: '2.5 tonnes CO2' },
        { id: 'c', text: '4.2 tonnes CO2' },
        { id: 'd', text: '6.8 tonnes CO2' }
      ],
      correct: 'a',
      points: 20
    },
    {
      id: 'energy_consumption',
      type: 'multiple_choice',
      question: 'Which household appliance consumes the most electricity?',
      options: [
        { id: 'a', text: 'Refrigerator' },
        { id: 'b', text: 'Air Conditioner' },
        { id: 'c', text: 'Washing Machine' },
        { id: 'd', text: 'Television' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'renewable_energy',
      type: 'multiple_choice',
      question: 'What percentage of India\'s electricity comes from renewable sources?',
      options: [
        { id: 'a', text: '15%' },
        { id: 'b', text: '25%' },
        { id: 'c', text: '35%' },
        { id: 'd', text: '45%' }
      ],
      correct: 'c',
      points: 20
    },
    {
      id: 'carbon_cycle',
      type: 'multiple_choice',
      question: 'Which process removes CO2 from the atmosphere?',
      options: [
        { id: 'a', text: 'Photosynthesis' },
        { id: 'b', text: 'Respiration' },
        { id: 'c', text: 'Combustion' },
        { id: 'd', text: 'Decomposition' }
      ],
      correct: 'a',
      points: 20
    },
    {
      id: 'energy_efficiency',
      type: 'multiple_choice',
      question: 'What is the most energy-efficient way to heat water?',
      options: [
        { id: 'a', text: 'Electric geyser' },
        { id: 'b', text: 'Solar water heater' },
        { id: 'c', text: 'Gas geyser' },
        { id: 'd', text: 'Kettle' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'carbon_offset',
      type: 'multiple_choice',
      question: 'What is carbon offsetting?',
      options: [
        { id: 'a', text: 'Reducing carbon emissions' },
        { id: 'b', text: 'Compensating for emissions by funding equivalent CO2 savings' },
        { id: 'c', text: 'Storing carbon underground' },
        { id: 'd', text: 'Converting CO2 to oxygen' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'greenhouse_gases',
      type: 'multiple_choice',
      question: 'Which gas is the most abundant greenhouse gas?',
      options: [
        { id: 'a', text: 'Carbon Dioxide' },
        { id: 'b', text: 'Methane' },
        { id: 'c', text: 'Water Vapor' },
        { id: 'd', text: 'Nitrous Oxide' }
      ],
      correct: 'c',
      points: 20
    },
    {
      id: 'energy_storage',
      type: 'multiple_choice',
      question: 'What is the main challenge with renewable energy?',
      options: [
        { id: 'a', text: 'High cost' },
        { id: 'b', text: 'Intermittency' },
        { id: 'c', text: 'Low efficiency' },
        { id: 'd', text: 'Environmental impact' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'carbon_tax',
      type: 'multiple_choice',
      question: 'What is a carbon tax?',
      options: [
        { id: 'a', text: 'Tax on carbon-based fuels' },
        { id: 'b', text: 'Tax on carbon emissions' },
        { id: 'c', text: 'Tax on carbon credits' },
        { id: 'd', text: 'Tax on carbon storage' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'sustainable_living',
      type: 'multiple_choice',
      question: 'What is the most effective way to reduce your carbon footprint?',
      options: [
        { id: 'a', text: 'Use public transport' },
        { id: 'b', text: 'Eat less meat' },
        { id: 'c', text: 'Use renewable energy' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleLevelComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const submitGameAnswer = async (game, answer) => {
    const isCorrect = answer === game.correct;
    let points = isCorrect ? game.points : 0;
    
    // Apply multiplier
    points = points * multiplier;
    
    // Perfect streak bonus
    if (isCorrect && streak >= 3) {
      points += Math.floor(points * 0.2); // 20% bonus for streaks
    }
    
    // Energy cost
    const energyCost = 10;
    setEnergyLevel(prev => Math.max(0, prev - energyCost));
    
    setFeedback(prev => ({ ...prev, [game.id]: { correct: isCorrect, points } }));
    
    if (isCorrect) {
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setCombo(prev => prev + 1);
      setPerfectStreak(prev => prev + 1);
      
      // Chance to spawn collectible
      if (Math.random() < 0.3) {
        const collectible = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
        setCollectibles(prev => [...prev, collectible]);
        setShowCollectible(collectible);
        setTimeout(() => setShowCollectible(null), 2000);
      }
      
      // Chance to get power-up
      if (Math.random() < 0.2) {
        const powerUp = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)];
        setPowerUps(prev => [...prev, powerUp]);
      }
    } else {
      setStreak(0);
      setCombo(0);
      setPerfectStreak(0);
    }
    
    // Reset multiplier after use
    if (multiplier > 1) {
      setMultiplier(1);
    }
  };

  const usePowerUp = (powerUp) => {
    powerUp.effect();
    setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));
    setShowPowerUpEffect(powerUp);
    setTimeout(() => setShowPowerUpEffect(null), 2000);
  };

  const addCollectible = (collectible) => {
    setCollectibles(prev => [...prev, collectible]);
    setScore(prev => prev + collectible.points);
  };

  const awardXP = async (points) => {
    try {
      await axios.post(`${API_BASE_URL}/gamification/award-points`, {
        userId: user.id,
        points,
        reason: 'Level completion bonus'
      });
    } catch (error) {
      console.error('Error awarding XP:', error);
    }
  };

  const handleLevelComplete = async () => {
    const finalScore = score;
    const completionTime = LEVEL_TIME_SEC - timeRemaining;
    const accuracy = (Object.values(feedback).filter(f => f.correct).length / GAMES.length) * 100;
    
    const timeBonus = Math.floor((LEVEL_TIME_SEC - completionTime) / 60) * 10;
    const accuracyBonus = Math.floor(accuracy / 10) * 5;
    const totalBonus = timeBonus + accuracyBonus;
    
    if (totalBonus > 0) {
      await awardXP(totalBonus);
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/gamification/complete-level`, {
        levelNumber: 1
      });
      
      if (response.data.success) {
        setShowAchievement({
          type: 'badge',
          title: '🏆 Level Complete!',
          message: `You earned the "${response.data.data.badge.name}" badge!`,
          badge: response.data.data.badge
        });
      }
    } catch (error) {
      console.error('Error awarding level completion badge:', error);
    }
    
    alert(`Level Complete!\nScore: ${finalScore}\nAccuracy: ${accuracy.toFixed(1)}%\nBonus XP: ${totalBonus}`);
    navigate('/game');
  };

  const quit = () => navigate('/game');

  const currentGame = GAMES[currentGameIndex];
  const allCompleted = Object.keys(feedback).length === GAMES.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative">
      {/* Power-up Effects */}
      {showPowerUpEffect && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-yellow-400 text-black px-6 py-3 rounded-full text-xl font-bold animate-bounce">
            {showPowerUpEffect.icon} {showPowerUpEffect.name} Activated!
          </div>
        </div>
      )}

      {/* Collectible Notification */}
      {showCollectible && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-40 animate-pulse">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{showCollectible.icon}</span>
            <div>
              <div className="font-bold">{showCollectible.name} Found!</div>
              <div className="text-sm">+{showCollectible.points} points</div>
            </div>
          </div>
        </div>
      )}

      <GameHUD
        levelTitle="Carbon Detective - Level 1"
        score={score}
        timeRemainingSec={timeRemaining}
        hintsUsed={hintsUsed}
        maxHints={3}
        onQuit={quit}
        streak={streak}
        combo={combo}
        levelProgress={((currentGameIndex + 1) / GAMES.length) * 100}
        powerUps={powerUps}
        onUsePowerUp={usePowerUp}
        collectibles={collectibles}
        energyLevel={energyLevel}
        multiplier={multiplier}
        perfectStreak={perfectStreak}
      />

      <div className="pt-20 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🎮 Carbon Detective - Level 1 🎮</h1>
            <p className="text-xl text-gray-600">Master the art of eco-detection! Answer questions to unlock power-ups and collectibles.</p>
          </div>

          {/* Gamification Status Cards - Always Visible */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl shadow-lg p-4 text-center border-2 border-yellow-300">
              <div className="text-4xl mb-2">⚡</div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Power-ups</h3>
              <p className="text-2xl font-bold text-yellow-600">{powerUps.length}</p>
              <p className="text-xs text-gray-600">Available</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg p-4 text-center border-2 border-green-300">
              <div className="text-4xl mb-2">💎</div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Collectibles</h3>
              <p className="text-2xl font-bold text-green-600">{collectibles.length}</p>
              <p className="text-xs text-gray-600">Found</p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-lg p-4 text-center border-2 border-orange-300">
              <div className="text-4xl mb-2">🔥</div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Streak</h3>
              <p className="text-2xl font-bold text-orange-600">{streak}</p>
              <p className="text-xs text-gray-600">Current</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-amber-100 rounded-xl shadow-lg p-4 text-center border-2 border-yellow-300">
              <div className="text-4xl mb-2">⭐</div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Perfect</h3>
              <p className="text-2xl font-bold text-yellow-600">{perfectStreak}</p>
              <p className="text-xs text-gray-600">Streak</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentGameIndex + 1} of {GAMES.length}</span>
              <span>{Math.round(((currentGameIndex + 1) / GAMES.length) * 100)}% Complete</span>
            </div>
            <div className="bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${((currentGameIndex + 1) / GAMES.length) * 100}%` }}
              ></div>
            </div>
          </div>


          {/* Game Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mb-6 border-2 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🎯 {currentGame.question}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGame.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, [currentGame.id]: option.id }));
                    submitGameAnswer(currentGame, option.id);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-center hover:scale-105 shadow-lg ${
                    answers[currentGame.id] === option.id
                      ? feedback[currentGame.id]?.correct === true
                        ? 'border-green-500 bg-gradient-to-br from-green-100 to-emerald-100 shadow-green-200'
                        : feedback[currentGame.id]?.correct === false
                        ? 'border-red-500 bg-gradient-to-br from-red-100 to-pink-100 shadow-red-200'
                        : 'border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-blue-200'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 shadow-gray-200'
                  }`}
                >
                  <div className="text-lg font-semibold text-gray-800">{option.text}</div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div>
                {feedback[currentGame.id] && (
                  <div className={`text-sm ${feedback[currentGame.id].correct ? 'text-green-600' : 'text-red-600'}`}>
                    {feedback[currentGame.id].correct ? 'Correct!' : 'Incorrect'} 
                    {feedback[currentGame.id].points && ` (+${feedback[currentGame.id].points} points)`}
                  </div>
                )}
              </div>
              
              {/* Gamification Status */}
              <div className="flex items-center space-x-4 text-sm">
                {multiplier > 1 && (
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full font-bold animate-pulse">
                    ×{multiplier} Multiplier Active!
                  </div>
                )}
                {powerUps.length > 0 && (
                  <div className="bg-blue-400 text-blue-900 px-3 py-1 rounded-full font-bold">
                    {powerUps.length} Power-up{powerUps.length > 1 ? 's' : ''} Ready!
                  </div>
                )}
                {collectibles.length > 0 && (
                  <div className="bg-green-400 text-green-900 px-3 py-1 rounded-full font-bold">
                    {collectibles.length} Collectible{collectibles.length > 1 ? 's' : ''} Found!
                  </div>
                )}
                {streak > 0 && (
                  <div className="bg-orange-400 text-orange-900 px-3 py-1 rounded-full font-bold">
                    🔥 {streak} Streak!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentGameIndex(prev => Math.max(0, prev - 1))}
              disabled={currentGameIndex === 0}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            
            <button
              onClick={() => setCurrentGameIndex(prev => Math.min(GAMES.length - 1, prev + 1))}
              disabled={currentGameIndex === GAMES.length - 1}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>

          {/* Complete Level Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleLevelComplete}
              className={`px-12 py-6 text-xl font-bold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-2xl ${
                allCompleted
                  ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 animate-pulse'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
              disabled={!allCompleted}
            >
              {allCompleted ? '🎉🎊 Complete Level 1! 🎊🎉' : '❌ Complete All Questions First ❌'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1;
