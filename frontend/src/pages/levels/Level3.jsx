import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameHUD from '../../components/GameHUD';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';
const LEVEL_TIME_SEC = 1200; // 20 minutes

const Level3 = () => {
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

  const GAMES = [
    {
      id: 'energy_efficiency',
      type: 'multiple_choice',
      question: 'What is the most energy-efficient lighting option?',
      options: [
        { id: 'a', text: 'Incandescent bulbs' },
        { id: 'b', text: 'LED bulbs' },
        { id: 'c', text: 'Fluorescent bulbs' },
        { id: 'd', text: 'Halogen bulbs' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'energy_conservation',
      type: 'multiple_choice',
      question: 'What is the best way to conserve energy at home?',
      options: [
        { id: 'a', text: 'Turn off lights when not needed' },
        { id: 'b', text: 'Use energy-efficient appliances' },
        { id: 'c', text: 'Insulate your home' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'smart_grid',
      type: 'multiple_choice',
      question: 'What is a smart grid?',
      options: [
        { id: 'a', text: 'A grid that uses renewable energy' },
        { id: 'b', text: 'An intelligent electricity distribution network' },
        { id: 'c', text: 'A grid that stores energy' },
        { id: 'd', text: 'A grid that generates energy' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'energy_storage',
      type: 'multiple_choice',
      question: 'What is the main purpose of energy storage?',
      options: [
        { id: 'a', text: 'To save money' },
        { id: 'b', text: 'To balance supply and demand' },
        { id: 'c', text: 'To reduce emissions' },
        { id: 'd', text: 'To increase efficiency' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'energy_audit',
      type: 'multiple_choice',
      question: 'What is an energy audit?',
      options: [
        { id: 'a', text: 'Checking energy bills' },
        { id: 'b', text: 'Analyzing energy consumption patterns' },
        { id: 'c', text: 'Installing energy-efficient equipment' },
        { id: 'd', text: 'Reducing energy usage' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'peak_demand',
      type: 'multiple_choice',
      question: 'What is peak demand?',
      options: [
        { id: 'a', text: 'Highest energy consumption period' },
        { id: 'b', text: 'Lowest energy consumption period' },
        { id: 'c', text: 'Average energy consumption' },
        { id: 'd', text: 'Total energy consumption' }
      ],
      correct: 'a',
      points: 20
    },
    {
      id: 'energy_management',
      type: 'multiple_choice',
      question: 'What is energy management?',
      options: [
        { id: 'a', text: 'Controlling energy consumption' },
        { id: 'b', text: 'Monitoring energy usage' },
        { id: 'c', text: 'Optimizing energy efficiency' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'demand_response',
      type: 'multiple_choice',
      question: 'What is demand response?',
      options: [
        { id: 'a', text: 'Reducing energy demand during peak periods' },
        { id: 'b', text: 'Increasing energy supply' },
        { id: 'c', text: 'Storing energy' },
        { id: 'd', text: 'Generating energy' }
      ],
      correct: 'a',
      points: 20
    },
    {
      id: 'energy_policy',
      type: 'multiple_choice',
      question: 'What is energy policy?',
      options: [
        { id: 'a', text: 'Government regulations on energy' },
        { id: 'b', text: 'Energy conservation measures' },
        { id: 'c', text: 'Energy efficiency standards' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'clean_energy',
      type: 'multiple_choice',
      question: 'What is clean energy?',
      options: [
        { id: 'a', text: 'Energy with low environmental impact' },
        { id: 'b', text: 'Renewable energy' },
        { id: 'c', text: 'Energy-efficient technology' },
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
    const points = isCorrect ? game.points : 0;
    
    setFeedback(prev => ({ ...prev, [game.id]: { correct: isCorrect, points } }));
    
    if (isCorrect) {
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setCombo(prev => prev + 1);
    } else {
      setStreak(0);
      setCombo(0);
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
        levelNumber: 3
      });
      
      if (response.data.success) {
        alert(`🎉 Level Complete! You earned the "${response.data.data.badge.name}" badge!`);
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
    <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <GameHUD
        levelTitle="Clean Energy Tycoon - Level 3"
        score={score}
        timeRemainingSec={timeRemaining}
        hintsUsed={hintsUsed}
        maxHints={3}
        onQuit={quit}
        streak={streak}
        combo={combo}
        levelProgress={((currentGameIndex + 1) / GAMES.length) * 100}
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

export default Level3;
