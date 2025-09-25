import React from 'react';
import { Link } from 'react-router-dom';

export default function GameHub() {
  const levels = [
    { id: 1, title: 'Carbon Detective', path: '/game/level-1', theme: 'Carbon Emissions & Household Energy' },
    { id: 2, title: 'Recycling Rush', path: '/game/level-2', theme: 'Recycling & Waste Management' },
    { id: 3, title: 'Clean Energy Tycoon', path: '/game/level-3', theme: 'Renewable Energy & Budget Balance' },
    { id: 4, title: 'Eco-Mission Escape Room', path: '/game/level-4', theme: 'Biodiversity & Environment' },
    { id: 5, title: 'City Planner', path: '/game/level-5', theme: 'Urban Sustainability & Green Living' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Green Innovators - Play</h1>
      <p className="text-gray-700 mb-6">Story-driven simulation with light strategy. Choose a level to start.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {levels.map((lvl) => (
          <Link key={lvl.id} to={lvl.path} className="block bg-white rounded-lg shadow p-5 hover:shadow-md transition">
            <div className="text-sm text-gray-500">Level {lvl.id}</div>
            <div className="text-xl font-semibold">{lvl.title}</div>
            <div className="text-gray-700">Theme: {lvl.theme}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


