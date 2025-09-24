const mongoose = require('mongoose');
const Badge = require('../models/Badge');
require('dotenv').config();

const sampleBadges = [
  // Participation Badges
  {
    name: 'First Steps',
    description: 'Complete your first environmental challenge',
    pointsRequired: 10,
    icon: '🌱',
    category: 'participation',
    rarity: 'common'
  },
  {
    name: 'Active Learner',
    description: 'Complete 5 environmental challenges',
    pointsRequired: 50,
    icon: '📚',
    category: 'participation',
    rarity: 'common'
  },
  {
    name: 'Dedicated Student',
    description: 'Complete 20 environmental challenges',
    pointsRequired: 200,
    icon: '🎓',
    category: 'participation',
    rarity: 'uncommon'
  },

  // Achievement Badges
  {
    name: 'Eco Warrior',
    description: 'Earn 100 eco-points',
    pointsRequired: 100,
    icon: '🛡️',
    category: 'achievement',
    rarity: 'uncommon'
  },
  {
    name: 'Green Champion',
    description: 'Earn 500 eco-points',
    pointsRequired: 500,
    icon: '🏆',
    category: 'achievement',
    rarity: 'rare'
  },
  {
    name: 'Environmental Hero',
    description: 'Earn 1000 eco-points',
    pointsRequired: 1000,
    icon: '🦸‍♂️',
    category: 'achievement',
    rarity: 'epic'
  },

  // Milestone Badges
  {
    name: 'Level 5 Master',
    description: 'Reach level 5',
    pointsRequired: 500,
    icon: '⭐',
    category: 'milestone',
    rarity: 'uncommon'
  },
  {
    name: 'Level 10 Legend',
    description: 'Reach level 10',
    pointsRequired: 1000,
    icon: '🌟',
    category: 'milestone',
    rarity: 'rare'
  },
  {
    name: 'Level 20 Supreme',
    description: 'Reach level 20',
    pointsRequired: 2000,
    icon: '💫',
    category: 'milestone',
    rarity: 'epic'
  },

  // Environmental Badges
  {
    name: 'Tree Hugger',
    description: 'Learn about forest conservation',
    pointsRequired: 75,
    icon: '🌳',
    category: 'environmental',
    rarity: 'common'
  },
  {
    name: 'Ocean Guardian',
    description: 'Complete marine life protection challenges',
    pointsRequired: 150,
    icon: '🐋',
    category: 'environmental',
    rarity: 'uncommon'
  },
  {
    name: 'Climate Crusader',
    description: 'Master climate change knowledge',
    pointsRequired: 300,
    icon: '🌍',
    category: 'environmental',
    rarity: 'rare'
  },
  {
    name: 'Renewable Energy Expert',
    description: 'Become an expert in renewable energy',
    pointsRequired: 400,
    icon: '⚡',
    category: 'environmental',
    rarity: 'rare'
  },

  // Social Badges
  {
    name: 'Team Player',
    description: 'Collaborate with other students',
    pointsRequired: 80,
    icon: '🤝',
    category: 'social',
    rarity: 'common'
  },
  {
    name: 'Community Leader',
    description: 'Lead environmental initiatives',
    pointsRequired: 250,
    icon: '👑',
    category: 'social',
    rarity: 'uncommon'
  },
  {
    name: 'Eco Influencer',
    description: 'Inspire others to go green',
    pointsRequired: 600,
    icon: '📢',
    category: 'social',
    rarity: 'rare'
  },

  // Special Badges
  {
    name: 'Perfect Score',
    description: 'Get 100% on 10 quizzes',
    pointsRequired: 350,
    icon: '💯',
    category: 'special',
    rarity: 'rare'
  },
  {
    name: 'Speed Demon',
    description: 'Complete challenges quickly',
    pointsRequired: 180,
    icon: '⚡',
    category: 'special',
    rarity: 'uncommon'
  },
  {
    name: 'Consistency King',
    description: 'Login for 30 consecutive days',
    pointsRequired: 500,
    icon: '📅',
    category: 'special',
    rarity: 'epic'
  },
  {
    name: 'GreenQuest Master',
    description: 'Unlock all other badges',
    pointsRequired: 2000,
    icon: '👑',
    category: 'special',
    rarity: 'legendary'
  }
];

const seedBadges = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing badges
    await Badge.deleteMany({});
    console.log('Cleared existing badges');

    // Insert sample badges
    const badges = await Badge.insertMany(sampleBadges);
    console.log(`Created ${badges.length} badges`);

    // Display created badges
    console.log('\nCreated badges:');
    badges.forEach(badge => {
      console.log(`- ${badge.icon} ${badge.name} (${badge.pointsRequired} points, ${badge.rarity})`);
    });

    console.log('\nBadge seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding badges:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedBadges();
