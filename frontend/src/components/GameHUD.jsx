import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function GameHUD({
  levelTitle,
  score,
  timeRemainingSec,
  hintsUsed,
  maxHints,
  onQuit,
  streak = 0,
  combo = 0,
  levelProgress = 0
}) {
  const { user } = useAuth();
  const [showCombo, setShowCombo] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [timeWarning, setTimeWarning] = useState(false);

  const minutes = Math.floor(timeRemainingSec / 60);
  const seconds = timeRemainingSec % 60;

  // Show combo animation
  useEffect(() => {
    if (combo > 1) {
      setShowCombo(true);
      const timer = setTimeout(() => setShowCombo(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [combo]);

  // Show streak animation
  useEffect(() => {
    if (streak > 0) {
      setShowStreak(true);
      const timer = setTimeout(() => setShowStreak(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [streak]);

  // Time warning
  useEffect(() => {
    setTimeWarning(timeRemainingSec <= 60);
  }, [timeRemainingSec]);

  const getLevelProgress = () => {
    const currentLevelXP = (user?.level || 1) * 100;
    const nextLevelXP = ((user?.level || 1) + 1) * 100;
    const progress = ((user?.points || 0) % 100) / 100;
    const result = progress * 100;
    return isNaN(result) ? 0 : result;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Level Info */}
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{levelTitle}</h1>
              <div className="text-sm text-gray-600">Level Progress</div>
            </div>
            
            {/* Level Progress Bar */}
            <div className="w-32">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getLevelProgress()}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Level {user?.level || 1}
              </div>
            </div>
          </div>

          {/* Center Section - Score and Stats */}
          <div className="flex items-center space-x-8">
            {/* Score */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{score}</div>
              <div className="text-xs text-gray-600">Score</div>
            </div>

            {/* Time */}
            <div className={`text-center ${timeWarning ? 'animate-pulse' : ''}`}>
              <div className={`text-2xl font-bold ${timeWarning ? 'text-red-600' : 'text-gray-900'}`}>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-600">Time</div>
            </div>

            {/* Hints */}
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {maxHints - hintsUsed}/{maxHints}
              </div>
              <div className="text-xs text-gray-600">Hints</div>
            </div>
          </div>

          {/* Right Section - Streak, Combo, Quit */}
          <div className="flex items-center space-x-4">
            {/* Streak */}
            {streak > 0 && (
              <div className={`text-center transition-all duration-300 ${showStreak ? 'scale-110' : ''}`}>
                <div className="text-lg font-bold text-orange-600">🔥 {streak}</div>
                <div className="text-xs text-gray-600">Streak</div>
              </div>
            )}

            {/* Combo */}
            {combo > 1 && (
              <div className={`text-center transition-all duration-300 ${showCombo ? 'scale-110' : ''}`}>
                <div className="text-lg font-bold text-purple-600">⚡ {combo}x</div>
                <div className="text-xs text-gray-600">Combo</div>
              </div>
            )}

            {/* Quit Button */}
            <button
              onClick={onQuit}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
            >
              Quit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
