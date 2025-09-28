import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import GameHUD from '../../components/GameHUD';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';
const LEVEL_TIME_SEC = 1200; // 20 minutes

const Level2 = () => {
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
  const [draggedItems, setDraggedItems] = useState({});

  const GAMES = [
    {
      id: 'solar_power',
      type: 'multiple_choice',
      question: 'What is the main advantage of solar power?',
      options: [
        { id: 'a', text: 'Low cost' },
        { id: 'b', text: 'Renewable and clean' },
        { id: 'c', text: 'High efficiency' },
        { id: 'd', text: 'Easy installation' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'wind_energy',
      type: 'multiple_choice',
      question: 'What is the main disadvantage of wind energy?',
      options: [
        { id: 'a', text: 'High cost' },
        { id: 'b', text: 'Intermittent supply' },
        { id: 'c', text: 'Low efficiency' },
        { id: 'd', text: 'Environmental impact' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'recycling_sort',
      type: 'recycling_sort',
      question: 'Click on items to assign them to the correct recycling bins',
      items: [
        { id: 'plastic_bottle', name: 'Plastic Bottle', icon: '🍼' },
        { id: 'newspaper', name: 'Newspaper', icon: '📰' },
        { id: 'aluminum_can', name: 'Aluminum Can', icon: '🥤' },
        { id: 'glass_bottle', name: 'Glass Bottle', icon: '🍾' },
        { id: 'cardboard', name: 'Cardboard', icon: '📦' },
        { id: 'tin_can', name: 'Tin Can', icon: '🥫' }
      ],
      bins: [
        { id: 'plastic', name: 'Plastic', icon: '♻️', color: 'bg-blue-100 border-blue-300' },
        { id: 'paper', name: 'Paper', icon: '📄', color: 'bg-green-100 border-green-300' },
        { id: 'metal', name: 'Metal', icon: '🔩', color: 'bg-gray-100 border-gray-300' },
        { id: 'glass', name: 'Glass', icon: '🪟', color: 'bg-purple-100 border-purple-300' }
      ],
      correct: {
        'plastic_bottle': 'plastic',
        'newspaper': 'paper',
        'aluminum_can': 'metal',
        'glass_bottle': 'glass',
        'cardboard': 'paper',
        'tin_can': 'metal'
      },
      points: 20
    },
    {
      id: 'hydroelectric',
      type: 'multiple_choice',
      question: 'What is the main source of energy for hydroelectric power?',
      options: [
        { id: 'a', text: 'Wind' },
        { id: 'b', text: 'Water flow' },
        { id: 'c', text: 'Sun' },
        { id: 'd', text: 'Heat' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'geothermal',
      type: 'multiple_choice',
      question: 'What is geothermal energy?',
      options: [
        { id: 'a', text: 'Energy from the sun' },
        { id: 'b', text: 'Energy from the earth\'s heat' },
        { id: 'c', text: 'Energy from wind' },
        { id: 'd', text: 'Energy from water' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'biomass',
      type: 'multiple_choice',
      question: 'What is biomass energy?',
      options: [
        { id: 'a', text: 'Energy from living organisms' },
        { id: 'b', text: 'Energy from dead plants and animals' },
        { id: 'c', text: 'Energy from fossil fuels' },
        { id: 'd', text: 'Energy from nuclear reactions' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'tidal_energy',
      type: 'multiple_choice',
      question: 'What is tidal energy?',
      options: [
        { id: 'a', text: 'Energy from ocean waves' },
        { id: 'b', text: 'Energy from ocean tides' },
        { id: 'c', text: 'Energy from ocean currents' },
        { id: 'd', text: 'Energy from ocean temperature' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'sustainability',
      type: 'multiple_choice',
      question: 'What does sustainability mean?',
      options: [
        { id: 'a', text: 'Using resources without depleting them' },
        { id: 'b', text: 'Using all available resources' },
        { id: 'c', text: 'Saving money' },
        { id: 'd', text: 'Protecting the environment' }
      ],
      correct: 'a',
      points: 20
    },
    {
      id: 'carbon_neutral',
      type: 'multiple_choice',
      question: 'What does carbon neutral mean?',
      options: [
        { id: 'a', text: 'No carbon emissions' },
        { id: 'b', text: 'Net zero carbon emissions' },
        { id: 'c', text: 'Low carbon emissions' },
        { id: 'd', text: 'Carbon storage' }
      ],
      correct: 'b',
      points: 20
    },
    {
      id: 'renewable_future',
      type: 'multiple_choice',
      question: 'What is the main goal of renewable energy?',
      options: [
        { id: 'a', text: 'Reduce costs' },
        { id: 'b', text: 'Reduce environmental impact' },
        { id: 'c', text: 'Increase efficiency' },
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
    let isCorrect = false;
    
    if (game.type === 'recycling_sort') {
      isCorrect = Object.keys(game.correct).every(itemId => 
        draggedItems[itemId] === game.correct[itemId]
      );
    } else {
      isCorrect = answer === game.correct;
    }
    
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
        levelNumber: 2
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
        levelTitle="Renewable Rangers - Level 2"
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
            
            {currentGame.type === 'multiple_choice' && (
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
            )}

            {currentGame.type === 'recycling_sort' && (
              <div className="space-y-6">
                {/* Items to Sort */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Items to Sort:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentGame.items.map((item) => (
                      <div
                        key={item.id}
                        className={`p-4 rounded-lg border-2 text-center cursor-pointer transition-all duration-200 ${
                          draggedItems[item.id]
                            ? 'bg-green-50 border-green-400'
                            : 'bg-gray-50 border-dashed border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => {
                          const currentBin = draggedItems[item.id];
                          const binIndex = currentBin ? currentGame.bins.findIndex(bin => bin.id === currentBin) : -1;
                          const nextBinIndex = (binIndex + 1) % currentGame.bins.length;
                          const nextBin = currentGame.bins[nextBinIndex];
                          setDraggedItems(prev => ({ ...prev, [item.id]: nextBin.id }));
                        }}
                      >
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className="font-semibold text-gray-800">{item.name}</div>
                        {draggedItems[item.id] && (
                          <div className="text-sm text-green-600 mt-1">
                            → {currentGame.bins.find(bin => bin.id === draggedItems[item.id])?.name}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recycling Bins */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Recycling Bins:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {currentGame.bins.map((bin) => (
                      <div key={bin.id} className={`p-4 rounded-lg border-2 ${bin.color} text-center`}>
                        <div className="text-2xl mb-2">{bin.icon}</div>
                        <div className="font-semibold text-gray-800">{bin.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {Object.values(draggedItems).filter(binId => binId === bin.id).length} items
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">Click on items to assign them to bins</p>
                  <button
                    onClick={() => submitGameAnswer(currentGame, 'sort')}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 font-semibold"
                  >
                    Check Sorting
                  </button>
                </div>
              </div>
            )}

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

export default Level2;
