import React from 'react';

export default function GameHUD({
  levelTitle,
  score,
  timeRemainingSec,
  hintsUsed,
  maxHints,
  onQuit,
}) {
  const minutes = Math.floor(timeRemainingSec / 60);
  const seconds = timeRemainingSec % 60;

  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold">{levelTitle}</div>
        <div className="flex items-center gap-6 text-sm">
          <div>
            ⏱ Time: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div>
            ⭐ Score: {score}
          </div>
          <div>
            💡 Hints: {hintsUsed}/{maxHints}
          </div>
          <button
            onClick={onQuit}
            className="px-3 py-1 rounded border text-gray-700 hover:bg-gray-50"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}


