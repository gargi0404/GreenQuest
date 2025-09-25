import React from 'react';

const Section = ({ title, theme, explanation, rules, hints, whoPlays }) => (
  <section className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6 mb-8">
    <h2 className="text-2xl font-bold mb-1">{title}</h2>
    <p className="text-sm text-gray-600 mb-4">Theme: {theme}</p>
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">Game Explanation</h3>
        <p className="text-gray-800 mt-1">{explanation}</p>
      </div>
      <div>
        <h3 className="font-semibold">Rules</h3>
        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-800">
          {rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">Hints</h3>
        <ul className="list-disc list-inside mt-1 space-y-1 text-gray-800">
          {hints.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold">Who Plays / How Played</h3>
        <p className="text-gray-800 mt-1">{whoPlays}</p>
      </div>
    </div>
  </section>
);

export default function GameDesign() {
  const commonRules = [
    'Each player must complete all tasks in this level before moving to the next.',
    'Players may use up to 3 hints per level.',
    'Correct answers award points; wrong answers deduct points.',
    'Teamwork is allowed for puzzles, but individual answers are needed for questions.',
    'The level must be completed within a time limit of 20 minutes.'
  ];

  const commonHints = [
    'Look for clues in the question statement itself.',
    'Break down larger problems into smaller parts.',
    'Think about real-life eco examples around you.',
    'Some puzzles may have hidden messages in patterns.',
    'Collaboration helps in harder challenges.'
  ];

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Green Innovators - Game Design</h1>
        <p className="text-gray-700 mt-2">Story-driven simulation with light strategy for ages 14–17.</p>
      </div>

      <Section
        title="Level 1: Carbon Detective"
        theme="Carbon Emissions & Household Energy"
        explanation="Carbon Detective is designed to teach students about Carbon Emissions & Household Energy. The objective is to solve eco-challenges, answer questions, and complete puzzles that directly link to real-world environmental issues."
        rules={commonRules}
        hints={commonHints}
        whoPlays="This level is best played in groups of 2–3 students or individually, depending on the complexity."
      />

      <Section
        title="Level 2: Recycling Rush"
        theme="Recycling & Waste Management"
        explanation="Recycling Rush is designed to teach students about Recycling & Waste Management. The objective is to solve eco-challenges, answer questions, and complete puzzles that directly link to real-world environmental issues."
        rules={commonRules}
        hints={commonHints}
        whoPlays="This level is best played in groups of 2–3 students or individually, depending on the complexity."
      />

      <Section
        title="Level 3: Clean Energy Tycoon"
        theme="Renewable Energy & Budget Balance"
        explanation="Clean Energy Tycoon is designed to teach students about Renewable Energy & Budget Balance. The objective is to solve eco-challenges, answer questions, and complete puzzles that directly link to real-world environmental issues."
        rules={commonRules}
        hints={commonHints}
        whoPlays="This level is best played in groups of 2–3 students or individually, depending on the complexity."
      />

      <Section
        title="Level 4: Eco-Mission Escape Room"
        theme="Riddles on Biodiversity & Environment"
        explanation="Eco-Mission Escape Room is designed to teach students about Riddles on Biodiversity & Environment. The objective is to solve eco-challenges, answer questions, and complete puzzles that directly link to real-world environmental issues."
        rules={commonRules}
        hints={commonHints}
        whoPlays="This level is best played in groups of 2–3 students or individually, depending on the complexity."
      />

      <Section
        title="Level 5: City Planner"
        theme="Urban Sustainability & Green Living"
        explanation="City Planner is designed to teach students about Urban Sustainability & Green Living. The objective is to solve eco-challenges, answer questions, and complete puzzles that directly link to real-world environmental issues."
        rules={commonRules}
        hints={commonHints}
        whoPlays="This level is best played in groups of 2–3 students or individually, depending on the complexity."
      />
    </div>
  );
}


