const express = require('express');
const { body, query, validationResult } = require('express-validator');
const Badge = require('../models/Badge');
const { 
  awardPoints, 
  unlockBadge, 
  getUserStats, 
  getLeaderboard, 
  getUserRank 
} = require('../services/gamification');
const { authMiddleware, requireAdmin, requireTeacherOrAdmin } = require('../middleware/auth');

const router = express.Router();

// @desc    Award points to user
// @route   POST /api/gamification/award-points
// @access  Private (Teacher/Admin only)
router.post('/award-points', authMiddleware, requireTeacherOrAdmin, [
  body('userId')
    .isMongoId()
    .withMessage('Valid user ID is required'),
  body('points')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Points must be between 1 and 1000'),
  body('reason')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Reason cannot exceed 200 characters')
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

    const { userId, points, reason = 'Manual award', metadata = {} } = req.body;

    const result = await awardPoints(userId, points, reason, metadata);

    res.json({
      success: true,
      message: 'Points awarded successfully',
      data: result
    });
  } catch (error) {
    console.error('Award points error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while awarding points'
    });
  }
});

// @desc    Unlock badge for user
// @route   POST /api/gamification/unlock-badge
// @access  Private (Admin only)
router.post('/unlock-badge', authMiddleware, requireAdmin, [
  body('userId')
    .isMongoId()
    .withMessage('Valid user ID is required'),
  body('badgeName')
    .trim()
    .notEmpty()
    .withMessage('Badge name is required')
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

    const { userId, badgeName } = req.body;

    const result = await unlockBadge(userId, badgeName);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }

    res.json({
      success: true,
      message: 'Badge unlocked successfully',
      data: result
    });
  } catch (error) {
    console.error('Unlock badge error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while unlocking badge'
    });
  }
});

// @desc    Get user's gamification stats
// @route   GET /api/gamification/stats
// @access  Private
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const result = await getUserStats(req.user.id);

    res.json({
      success: true,
      data: result.stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user stats'
    });
  }
});

// @desc    Get user's rank
// @route   GET /api/gamification/rank
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
    console.error('Get user rank error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user rank'
    });
  }
});

// @desc    Get all badges
// @route   GET /api/gamification/badges
// @access  Public
router.get('/badges', [
  query('category')
    .optional()
    .isIn(['participation', 'achievement', 'milestone', 'special', 'environmental', 'social'])
    .withMessage('Invalid category specified'),
  query('rarity')
    .optional()
    .isIn(['common', 'uncommon', 'rare', 'epic', 'legendary'])
    .withMessage('Invalid rarity specified'),
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

    const { category, rarity, limit = 50 } = req.query;

    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (rarity) {
      query.rarity = rarity;
    }

    const badges = await Badge.find(query)
      .sort({ pointsRequired: 1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        badges,
        total: badges.length,
        filters: { category, rarity }
      }
    });
  } catch (error) {
    console.error('Get badges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching badges'
    });
  }
});

// @desc    Get available badges for user
// @route   GET /api/gamification/badges/available
// @access  Private
router.get('/badges/available', authMiddleware, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const availableBadges = await Badge.getAvailableForPoints(user.points);
    const nextBadges = await Badge.getNextToUnlock(user.points);

    res.json({
      success: true,
      data: {
        available: availableBadges,
        next: nextBadges,
        userPoints: user.points,
        userLevel: user.level
      }
    });
  } catch (error) {
    console.error('Get available badges error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching available badges'
    });
  }
});

// @desc    Create new badge (Admin only)
// @route   POST /api/gamification/badges
// @access  Private (Admin only)
router.post('/badges', authMiddleware, requireAdmin, [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Badge name must be between 2 and 50 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Badge description must be between 10 and 200 characters'),
  body('pointsRequired')
    .isInt({ min: 0 })
    .withMessage('Points required must be a non-negative integer'),
  body('icon')
    .trim()
    .notEmpty()
    .withMessage('Badge icon is required'),
  body('category')
    .isIn(['participation', 'achievement', 'milestone', 'special', 'environmental', 'social'])
    .withMessage('Invalid category specified'),
  body('rarity')
    .optional()
    .isIn(['common', 'uncommon', 'rare', 'epic', 'legendary'])
    .withMessage('Invalid rarity specified')
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

    const badgeData = {
      ...req.body,
      rarity: req.body.rarity || 'common'
    };

    const badge = await Badge.create(badgeData);

    res.status(201).json({
      success: true,
      message: 'Badge created successfully',
      data: badge
    });
  } catch (error) {
    console.error('Create badge error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Badge with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating badge'
    });
  }
});

// @desc    Update badge (Admin only)
// @route   PUT /api/gamification/badges/:id
// @access  Private (Admin only)
router.put('/badges/:id', authMiddleware, requireAdmin, [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Badge name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Badge description must be between 10 and 200 characters'),
  body('pointsRequired')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Points required must be a non-negative integer'),
  body('category')
    .optional()
    .isIn(['participation', 'achievement', 'milestone', 'special', 'environmental', 'social'])
    .withMessage('Invalid category specified'),
  body('rarity')
    .optional()
    .isIn(['common', 'uncommon', 'rare', 'epic', 'legendary'])
    .withMessage('Invalid rarity specified')
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

    const { id } = req.params;
    const updateData = req.body;

    const badge = await Badge.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found'
      });
    }

    res.json({
      success: true,
      message: 'Badge updated successfully',
      data: badge
    });
  } catch (error) {
    console.error('Update badge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating badge'
    });
  }
});

// @desc    Delete badge (Admin only)
// @route   DELETE /api/gamification/badges/:id
// @access  Private (Admin only)
router.delete('/badges/:id', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const badge = await Badge.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!badge) {
      return res.status(404).json({
        success: false,
        message: 'Badge not found'
      });
    }

    res.json({
      success: true,
      message: 'Badge deactivated successfully'
    });
  } catch (error) {
    console.error('Delete badge error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting badge'
    });
  }
});

module.exports = router;
