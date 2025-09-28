import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameHUD from '../../components/GameHUD';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';
const LEVEL_TIME_SEC = 1200; // 20 minutes

const Level5 = () => {
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
      id: 'urban_planning',
      type: 'multiple_choice',
      question: 'What is the main goal of sustainable urban planning?',
      options: [
        { id: 'a', text: 'Economic growth' },
        { id: 'b', text: 'Environmental protection' },
        { id: 'c', text: 'Social equity' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'green_buildings',
      type: 'multiple_choice',
      question: 'What makes a building green?',
      options: [
        { id: 'a', text: 'Energy efficiency' },
        { id: 'b', text: 'Sustainable materials' },
        { id: 'c', text: 'Water conservation' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'public_transport',
      type: 'multiple_choice',
      question: 'What is the benefit of public transportation?',
      options: [
        { id: 'a', text: 'Reduces traffic congestion' },
        { id: 'b', text: 'Lowers emissions' },
        { id: 'c', text: 'Saves energy' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'green_spaces',
      type: 'multiple_choice',
      question: 'Why are green spaces important in cities?',
      options: [
        { id: 'a', text: 'Improve air quality' },
        { id: 'b', text: 'Provide recreation' },
        { id: 'c', text: 'Support biodiversity' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'waste_management',
      type: 'multiple_choice',
      question: 'What is the best approach to urban waste management?',
      options: [
        { id: 'a', text: 'Reduce, reuse, recycle' },
        { id: 'b', text: 'Landfill disposal' },
        { id: 'c', text: 'Incineration' },
        { id: 'd', text: 'Export waste' }
      ],
      correct: 'a',
      points: 20
    },
    {
      id: 'water_management',
      type: 'multiple_choice',
      question: 'What is sustainable water management?',
      options: [
        { id: 'a', text: 'Conserving water resources' },
        { id: 'b', text: 'Preventing water pollution' },
        { id: 'c', text: 'Efficient water use' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'energy_efficiency',
      type: 'multiple_choice',
      question: 'How can cities become more energy efficient?',
      options: [
        { id: 'a', text: 'Smart grid systems' },
        { id: 'b', text: 'Energy-efficient buildings' },
        { id: 'c', text: 'Renewable energy' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'climate_resilience',
      type: 'multiple_choice',
      question: 'What is climate resilience in urban planning?',
      options: [
        { id: 'a', text: 'Adapting to climate change' },
        { id: 'b', text: 'Reducing vulnerability' },
        { id: 'c', text: 'Building capacity to recover' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'sustainable_mobility',
      type: 'multiple_choice',
      question: 'What is sustainable mobility?',
      options: [
        { id: 'a', text: 'Walking and cycling' },
        { id: 'b', text: 'Public transportation' },
        { id: 'c', text: 'Electric vehicles' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'smart_cities',
      type: 'multiple_choice',
      question: 'What makes a city smart?',
      options: [
        { id: 'a', text: 'Technology integration' },
        { id: 'b', text: 'Data-driven decisions' },
        { id: 'c', text: 'Citizen engagement' },
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
        levelNumber: 5
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <GameHUD
        levelTitle="City Planner - Level 5"
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

export default Level5;
