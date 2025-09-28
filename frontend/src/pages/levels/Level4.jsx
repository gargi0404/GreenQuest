import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameHUD from '../../components/GameHUD';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';
const LEVEL_TIME_SEC = 1200; // 20 minutes

const Level4 = () => {
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
      id: 'environmental_problems',
      type: 'multiple_choice',
      question: 'What is the biggest environmental problem facing the world today?',
      options: [
        { id: 'a', text: 'Climate change' },
        { id: 'b', text: 'Deforestation' },
        { id: 'c', text: 'Pollution' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'ecosystem_balance',
      type: 'multiple_choice',
      question: 'What happens when an ecosystem is out of balance?',
      options: [
        { id: 'a', text: 'Species extinction' },
        { id: 'b', text: 'Environmental degradation' },
        { id: 'c', text: 'Loss of biodiversity' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'sustainable_solutions',
      type: 'multiple_choice',
      question: 'What is the most sustainable solution to environmental problems?',
      options: [
        { id: 'a', text: 'Individual action' },
        { id: 'b', text: 'Government policy' },
        { id: 'c', text: 'Combined approach' },
        { id: 'd', text: 'Technology alone' }
      ],
      correct: 'c',
      points: 20
    },
    {
      id: 'environmental_impact',
      type: 'multiple_choice',
      question: 'What is the environmental impact of human activities?',
      options: [
        { id: 'a', text: 'Positive' },
        { id: 'b', text: 'Negative' },
        { id: 'c', text: 'Neutral' },
        { id: 'd', text: 'Mixed' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'conservation_efforts',
      type: 'multiple_choice',
      question: 'What is the most effective conservation effort?',
      options: [
        { id: 'a', text: 'Protected areas' },
        { id: 'b', text: 'Species recovery programs' },
        { id: 'c', text: 'Habitat restoration' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'environmental_education',
      type: 'multiple_choice',
      question: 'What is the importance of environmental education?',
      options: [
        { id: 'a', text: 'Raising awareness' },
        { id: 'b', text: 'Changing behavior' },
        { id: 'c', text: 'Building knowledge' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'green_technology',
      type: 'multiple_choice',
      question: 'What is green technology?',
      options: [
        { id: 'a', text: 'Environmentally friendly technology' },
        { id: 'b', text: 'Renewable energy technology' },
        { id: 'c', text: 'Energy-efficient technology' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'environmental_policy',
      type: 'multiple_choice',
      question: 'What is environmental policy?',
      options: [
        { id: 'a', text: 'Government regulations' },
        { id: 'b', text: 'Environmental laws' },
        { id: 'c', text: 'Conservation strategies' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'sustainable_development',
      type: 'multiple_choice',
      question: 'What is sustainable development?',
      options: [
        { id: 'a', text: 'Development that meets present needs' },
        { id: 'b', text: 'Development that doesn\'t compromise future generations' },
        { id: 'c', text: 'Development that balances economic, social, and environmental factors' },
        { id: 'd', text: 'All of the above' }
      ],
      correct: 'd',
      points: 20
    },
    {
      id: 'environmental_activism',
      type: 'multiple_choice',
      question: 'What is environmental activism?',
      options: [
        { id: 'a', text: 'Protecting the environment' },
        { id: 'b', text: 'Raising awareness about environmental issues' },
        { id: 'c', text: 'Advocating for environmental policies' },
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
        levelNumber: 4
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
        levelTitle="Eco-Mission Escape - Level 4"
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

export default Level4;
