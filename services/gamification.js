const User = require('../models/User');
const Badge = require('../models/Badge');

/**
 * Award points to a user and check for badge unlocks
 * @param {string} userId - User ID
 * @param {number} points - Points to award
 * @param {string} reason - Reason for awarding points
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} - Result with points awarded and badges unlocked
 */
const awardPoints = async (userId, points, reason = 'General activity', metadata = {}) => {
  try {
    if (!userId || !points || points <= 0) {
      throw new Error('Invalid parameters for awarding points');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User account is deactivated');
    }

    // Award points
    const oldPoints = user.points;
    user.points += points;
    await user.save();

    // Check for badge unlocks
    const unlockedBadges = await checkAndUnlockBadges(userId, user.points, oldPoints);

    return {
      success: true,
      pointsAwarded: points,
      totalPoints: user.points,
      level: user.level,
      badgesUnlocked: unlockedBadges,
      reason
    };
  } catch (error) {
    console.error('Error awarding points:', error);
    throw error;
  }
};

/**
 * Check and unlock badges based on user's current points
 * @param {string} userId - User ID
 * @param {number} currentPoints - User's current points
 * @param {number} previousPoints - User's previous points
 * @returns {Promise<Array>} - Array of newly unlocked badges
 */
const checkAndUnlockBadges = async (userId, currentPoints, previousPoints = 0) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Find badges that can be unlocked with current points but not with previous points
    const availableBadges = await Badge.find({
      pointsRequired: { $lte: currentPoints, $gt: previousPoints },
      isActive: true
    });

    const unlockedBadges = [];

    for (const badge of availableBadges) {
      // Check if user already has this badge
      const hasBadge = user.badges.some(userBadge => userBadge.name === badge.name);
      
      if (!hasBadge) {
        const badgeData = {
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          earnedAt: new Date(),
          category: badge.category
        };

        await user.addBadge(badgeData);
        unlockedBadges.push({
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          category: badge.category,
          rarity: badge.rarity,
          pointsRequired: badge.pointsRequired
        });
      }
    }

    return unlockedBadges;
  } catch (error) {
    console.error('Error checking badge unlocks:', error);
    throw error;
  }
};

/**
 * Manually unlock a specific badge for a user
 * @param {string} userId - User ID
 * @param {string} badgeName - Badge name to unlock
 * @returns {Promise<Object>} - Result of badge unlock
 */
const unlockBadge = async (userId, badgeName) => {
  try {
    if (!userId || !badgeName) {
      throw new Error('User ID and badge name are required');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const badge = await Badge.findOne({ name: badgeName, isActive: true });
    if (!badge) {
      throw new Error('Badge not found or inactive');
    }

    // Check if user already has this badge
    const hasBadge = user.badges.some(userBadge => userBadge.name === badgeName);
    if (hasBadge) {
      return {
        success: false,
        message: 'User already has this badge',
        badge: null
      };
    }

    // Check if user meets requirements
    if (user.points < badge.pointsRequired) {
      return {
        success: false,
        message: `User needs ${badge.pointsRequired - user.points} more points to unlock this badge`,
        badge: null
      };
    }

    const badgeData = {
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      earnedAt: new Date(),
      category: badge.category
    };

    await user.addBadge(badgeData);

    return {
      success: true,
      message: 'Badge unlocked successfully',
      badge: {
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        category: badge.category,
        rarity: badge.rarity,
        pointsRequired: badge.pointsRequired
      }
    };
  } catch (error) {
    console.error('Error unlocking badge:', error);
    throw error;
  }
};

/**
 * Get user's gamification stats
 * @param {string} userId - User ID
 * @returns {Promise<Object>} - User's gamification stats
 */
const getUserStats = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Get next badges to unlock
    const nextBadges = await Badge.getNextToUnlock(user.points);

    // Get badges by category
    const badgesByCategory = {};
    for (const category of ['participation', 'achievement', 'milestone', 'special', 'environmental', 'social']) {
      badgesByCategory[category] = user.badges.filter(badge => badge.category === category).length;
    }

    return {
      success: true,
      stats: {
        totalPoints: user.points,
        level: user.level,
        totalBadges: user.badges.length,
        badgesByCategory,
        nextBadges: nextBadges.map(badge => ({
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          pointsRequired: badge.pointsRequired,
          pointsNeeded: badge.pointsRequired - user.points
        }))
      }
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    throw error;
  }
};

/**
 * Get leaderboard data
 * @param {Object} options - Leaderboard options
 * @returns {Promise<Object>} - Leaderboard data
 */
const getLeaderboard = async (options = {}) => {
  try {
    const {
      limit = 50,
      role = null,
      school = null,
      timeframe = 'all' // 'all', 'week', 'month'
    } = options;

    let query = { isActive: true };
    
    // Filter by role if specified
    if (role) {
      query.role = role;
    }
    
    // Filter by school if specified
    if (school) {
      query.school = school;
    }

    // Add timeframe filter if needed
    if (timeframe !== 'all') {
      const now = new Date();
      let startDate;
      
      switch (timeframe) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = null;
      }
      
      if (startDate) {
        query.lastLogin = { $gte: startDate };
      }
    }

    const users = await User.find(query)
      .select('name email role points badges school grade')
      .sort({ points: -1 })
      .limit(parseInt(limit));

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      name: user.name,
      role: user.role,
      points: user.points,
      level: user.level,
      badges: user.badges.length,
      school: user.school,
      grade: user.grade
    }));

    return {
      success: true,
      leaderboard,
      total: leaderboard.length,
      timeframe,
      filters: { role, school }
    };
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
};

/**
 * Get user's rank in leaderboard
 * @param {string} userId - User ID
 * @param {Object} options - Leaderboard options
 * @returns {Promise<Object>} - User's rank information
 */
const getUserRank = async (userId, options = {}) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const { role = null, school = null } = options;
    
    let query = { isActive: true };
    
    if (role) {
      query.role = role;
    }
    
    if (school) {
      query.school = school;
    }

    // Count users with more points
    const rank = await User.countDocuments({
      ...query,
      points: { $gt: user.points }
    }) + 1;

    // Get total users in the same category
    const totalUsers = await User.countDocuments(query);

    return {
      success: true,
      rank: {
        current: rank,
        total: totalUsers,
        percentile: Math.round(((totalUsers - rank + 1) / totalUsers) * 100),
        points: user.points,
        level: user.level
      }
    };
  } catch (error) {
    console.error('Error getting user rank:', error);
    throw error;
  }
};

module.exports = {
  awardPoints,
  unlockBadge,
  checkAndUnlockBadges,
  getUserStats,
  getLeaderboard,
  getUserRank
};
