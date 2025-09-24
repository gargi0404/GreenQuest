const express = require('express');
const { query, validationResult } = require('express-validator');
const { getLeaderboard, getUserRank } = require('../services/gamification');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @desc    Get leaderboard
// @route   GET /api/leaderboard
// @access  Public (with optional auth for personalized data)
router.get('/', [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  query('role')
    .optional()
    .isIn(['student', 'teacher', 'ngo', 'admin'])
    .withMessage('Invalid role specified'),
  query('timeframe')
    .optional()
    .isIn(['all', 'week', 'month'])
    .withMessage('Invalid timeframe specified')
], optionalAuth, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      limit = 50,
      role = null,
      school = null,
      timeframe = 'all'
    } = req.query;

    const options = {
      limit: parseInt(limit),
      role,
      school,
      timeframe
    };

    const result = await getLeaderboard(options);

    // Add user's rank if authenticated
    let userRank = null;
    if (req.user) {
      try {
        const rankResult = await getUserRank(req.user.id, { role, school });
        userRank = rankResult.rank;
      } catch (error) {
        console.log('Could not get user rank:', error.message);
      }
    }

    res.json({
      success: true,
      data: {
        leaderboard: result.leaderboard,
        total: result.total,
        timeframe: result.timeframe,
        filters: result.filters,
        userRank
      }
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard'
    });
  }
});

// @desc    Get school leaderboard
// @route   GET /api/leaderboard/school
// @access  Public
router.get('/school', [
  query('school')
    .notEmpty()
    .withMessage('School name is required'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { school, limit = 50 } = req.query;

    const options = {
      limit: parseInt(limit),
      school,
      role: 'student' // Only students for school leaderboard
    };

    const result = await getLeaderboard(options);

    res.json({
      success: true,
      data: {
        school,
        leaderboard: result.leaderboard,
        total: result.total
      }
    });
  } catch (error) {
    console.error('School leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching school leaderboard'
    });
  }
});

// @desc    Get role-specific leaderboard
// @route   GET /api/leaderboard/role/:role
// @access  Public
router.get('/role/:role', [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
], async (req, res) => {
  try {
    const { role } = req.params;
    const { limit = 50, timeframe = 'all' } = req.query;

    // Validate role
    if (!['student', 'teacher', 'ngo', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified'
      });
    }

    const options = {
      limit: parseInt(limit),
      role,
      timeframe
    };

    const result = await getLeaderboard(options);

    res.json({
      success: true,
      data: {
        role,
        leaderboard: result.leaderboard,
        total: result.total,
        timeframe
      }
    });
  } catch (error) {
    console.error('Role leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching role leaderboard'
    });
  }
});

// @desc    Get user's rank
// @route   GET /api/leaderboard/rank
// @access  Private
router.get('/rank', authMiddleware, [
  query('role')
    .optional()
    .isIn(['student', 'teacher', 'ngo', 'admin'])
    .withMessage('Invalid role specified'),
  query('school')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('School name cannot exceed 100 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { role = null, school = null } = req.query;

    const options = { role, school };
    const result = await getUserRank(req.user.id, options);

    res.json({
      success: true,
      data: result.rank
    });
  } catch (error) {
    console.error('User rank error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user rank'
    });
  }
});

// @desc    Get top performers by category
// @route   GET /api/leaderboard/top
// @access  Public
router.get('/top', [
  query('category')
    .optional()
    .isIn(['points', 'badges', 'level'])
    .withMessage('Invalid category specified'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Limit must be between 1 and 20')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { category = 'points', limit = 10 } = req.query;

    let sortField;
    switch (category) {
      case 'badges':
        sortField = { 'badges': -1 };
        break;
      case 'level':
        sortField = { 'points': -1 }; // Level is calculated from points
        break;
      default:
        sortField = { 'points': -1 };
    }

    const User = require('../models/User');
    const users = await User.find({ isActive: true })
      .select('name email role points badges school grade')
      .sort(sortField)
      .limit(parseInt(limit));

    const topPerformers = users.map((user, index) => ({
      rank: index + 1,
      id: user._id,
      name: user.name,
      role: user.role,
      points: user.points,
      level: user.level,
      badges: user.badges.length,
      school: user.school,
      grade: user.grade,
      [category]: category === 'badges' ? user.badges.length : 
                  category === 'level' ? user.level : user.points
    }));

    res.json({
      success: true,
      data: {
        category,
        topPerformers,
        total: topPerformers.length
      }
    });
  } catch (error) {
    console.error('Top performers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching top performers'
    });
  }
});

module.exports = router;
