import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameHUD from '../../components/GameHUD';

const QUESTIONS = [
  {
    id: 'q1',
    type: 'mcq',
    prompt: 'Which appliance typically uses the most electricity in a household?',
    options: ['LED bulb', 'Laptop charger', 'Refrigerator', 'Phone charger'],
    answerIndex: 2,
    explanation: 'Refrigerators run continuously and consume significant energy over time.'
  },
  {
    id: 'q2',
    type: 'numeric',
    prompt: 'Replacing 10 old bulbs with 10 LEDs saves about how many watts total if each saves ~40W?',
    unit: 'W',
    correct: 400,
    tolerance: 5,
    explanation: '10 × 40W ≈ 400W. Small tolerance allowed.'
  },
  {
    id: 'q3',
    type: 'puzzle',
    prompt: 'Hidden hint: Count the vowels in "INSULATION" × 10 = ?',
    explanation: 'INSULATION has 5 vowels (I,U,A,I,O). 5 × 10 = 50.',
    solution: '50'
  }
];

const MAX_HINTS = 3;
const LEVEL_TIME_SEC = 20 * 60; // 20 minutes

export default function Level1() {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(LEVEL_TIME_SEC);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  // Timer
  useEffect(() => {
    const id = setInterval(() => setTimeRemaining((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      alert('Time is up!');
      navigate('/game');
    }
  }, [timeRemaining, navigate]);

  const allCompleted = useMemo(() => QUESTIONS.every((q) => !!feedback[q.id]?.correct), [feedback]);

  const requestHint = (q) => {
    if (hintsUsed >= MAX_HINTS) return;
    setHintsUsed((h) => h + 1);
    alert(`Hint: ${q.explanation}`);
  };

  const submitAnswer = (q) => {
    let correct = false;
    if (q.type === 'mcq') {
      correct = answers[q.id] === q.answerIndex;
    } else if (q.type === 'numeric') {
      const val = Number(answers[q.id]);
      if (!Number.isNaN(val)) {
        correct = Math.abs(val - q.correct) <= (q.tolerance ?? 0);
      }
    } else if (q.type === 'puzzle') {
      correct = String(answers[q.id] ?? '').trim() === q.solution;
    }

    setFeedback((f) => ({ ...f, [q.id]: { correct } }));
    setScore((s) => s + (correct ? 100 : -25));
  };

  const quit = () => navigate('/game');

  return (
    <div>
      <GameHUD
        levelTitle="Level 1: Carbon Detective"
        score={score}
        timeRemainingSec={timeRemaining}
        hintsUsed={hintsUsed}
        maxHints={MAX_HINTS}
        onQuit={quit}
      />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="bg-white rounded-lg shadow p-5">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold mb-2">{q.prompt}</h3>
              <button
                onClick={() => requestHint(q)}
                disabled={hintsUsed >= MAX_HINTS}
                className="ml-4 text-sm px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50"
              >
                Get Hint
              </button>
            </div>

            {q.type === 'mcq' && (
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === idx}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: idx }))}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === 'numeric' && (
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  className="border rounded px-3 py-2 w-40"
                  value={answers[q.id] ?? ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                />
                <span className="text-gray-600">{q.unit}</span>
              </div>
            )}

            {q.type === 'puzzle' && (
              <div className="mt-2">
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-60"
                  value={answers[q.id] ?? ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                />
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => submitAnswer(q)}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Submit
              </button>
              {feedback[q.id] && (
                <span className={feedback[q.id].correct ? 'text-green-700' : 'text-red-700'}>
                  {feedback[q.id].correct ? 'Correct! +100' : 'Incorrect -25'}
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between pt-2">
          <div className="text-sm text-gray-500">Complete all tasks to finish the level.</div>
          <button
            onClick={() => allCompleted ? navigate('/game') : alert('Finish all tasks first!')}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Finish Level
          </button>
        </div>
      </div>
    </div>
  );
}


