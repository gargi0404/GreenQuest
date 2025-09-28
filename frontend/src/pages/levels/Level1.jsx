import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameHUD from '../../components/GameHUD';
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
  const [xpGained, setXpGained] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(100);
  const [showPowerUpEffect, setShowPowerUpEffect] = useState(null);

  // Power-ups available in this level
  const POWER_UPS = [
    {
      id: 'time_boost',
      name: 'Time Boost',
      icon: '⏰',
      description: 'Adds 30 seconds to the timer',
      effect: () => {
        setTimeRemaining(prev => prev + 30);
        setShowPowerUpEffect('⏰ +30 seconds!');
        setTimeout(() => setShowPowerUpEffect(null), 2000);
      }
    },
    {
      id: 'hint_reveal',
      name: 'Hint Reveal',
      icon: '💡',
      description: 'Reveals the correct answer',
      effect: () => {
        const currentGame = GAMES[currentGameIndex];
        setAnswers(prev => ({ ...prev, [currentGame.id]: currentGame.correct }));
        setShowPowerUpEffect('💡 Answer revealed!');
        setTimeout(() => setShowPowerUpEffect(null), 2000);
      }
    },
    {
      id: 'score_multiplier',
      name: 'Score Multiplier',
      icon: '⭐',
      description: '2x points for next 3 answers',
      effect: () => {
        setCombo(prev => Math.max(prev, 2));
        setShowPowerUpEffect('⭐ 2x Score Active!');
        setTimeout(() => setShowPowerUpEffect(null), 2000);
      }
    },
    {
      id: 'energy_boost',
      name: 'Energy Boost',
      icon: '⚡',
      description: 'Restores 25 energy',
      effect: () => {
        setEnergyLevel(prev => Math.min(100, prev + 25));
        setShowPowerUpEffect('⚡ +25 Energy!');
        setTimeout(() => setShowPowerUpEffect(null), 2000);
      }
    }
  ];

  // Collectibles that can be found
  const COLLECTIBLES = [
    { id: 'eco_coin', name: 'Eco Coin', icon: '🪙', points: 50 },
    { id: 'green_gem', name: 'Green Gem', icon: '💚', points: 100 },
    { id: 'solar_crystal', name: 'Solar Crystal', icon: '☀️', points: 75 },
    { id: 'wind_token', name: 'Wind Token', icon: '💨', points: 60 }
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
    
    // Apply combo multiplier
    if (isCorrect && combo > 1) {
      points = Math.floor(points * combo);
    }
    
    // Apply streak bonus
    if (isCorrect && streak > 0) {
      points += Math.floor(streak * 5);
    }
    
    setFeedback(prev => ({ ...prev, [game.id]: { correct: isCorrect, points } }));
    
    if (isCorrect) {
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setCombo(prev => prev + 1);
      
      // Award XP
      const xpEarned = Math.floor(points / 2);
      setXpGained(xpEarned);
      
      // Random collectible chance (20%)
      if (Math.random() < 0.2) {
        const randomCollectible = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
        setCollectibles(prev => [...prev, randomCollectible]);
        setScore(prev => prev + randomCollectible.points);
      }
      
      // Random power-up chance (15%)
      if (Math.random() < 0.15 && powerUps.length < 3) {
        const randomPowerUp = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)];
        setPowerUps(prev => [...prev, randomPowerUp]);
      }
      
      // Energy consumption
      setEnergyLevel(prev => Math.max(0, prev - 5));
    } else {
      setStreak(0);
      setCombo(0);
      setEnergyLevel(prev => Math.max(0, prev - 10));
    }
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

  const usePowerUp = (powerUp) => {
    powerUp.effect();
    setPowerUps(prev => prev.filter(p => p.id !== powerUp.id));
  };

  const addCollectible = (collectible) => {
    setCollectibles(prev => [...prev, collectible]);
    setScore(prev => prev + collectible.points);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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
        xpGained={xpGained}
        energyLevel={energyLevel}
      />

      <div className="pt-20 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentGameIndex + 1} of {GAMES.length}</span>
              <span>{Math.round(((currentGameIndex + 1) / GAMES.length) * 100)}% Complete</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentGameIndex + 1) / GAMES.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Game Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentGame.question}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentGame.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setAnswers(prev => ({ ...prev, [currentGame.id]: option.id }));
                    submitGameAnswer(currentGame, option.id);
                  }}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-center hover:scale-105 ${
                    answers[currentGame.id] === option.id
                      ? feedback[currentGame.id]?.correct === true
                        ? 'border-green-500 bg-green-50'
                        : feedback[currentGame.id]?.correct === false
                        ? 'border-red-500 bg-red-50'
                        : 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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

          {/* Power-up Effect Display */}
          {showPowerUpEffect && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-2xl p-6 text-center animate-bounce">
              <div className="text-4xl mb-2">{showPowerUpEffect}</div>
              <div className="text-lg font-semibold text-gray-800">Power-up Activated!</div>
            </div>
          )}

          {/* Collectibles Display */}
          {collectibles.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 z-40">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Collectibles Found:</h3>
              <div className="flex space-x-2">
                {collectibles.map((collectible, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl">{collectible.icon}</div>
                    <div className="text-xs text-gray-600">{collectible.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Complete Level Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleLevelComplete}
              className={`px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-lg ${
                allCompleted
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!allCompleted}
            >
              {allCompleted ? '🎉 Complete Level' : 'Complete All Questions First'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level1;
