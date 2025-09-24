const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Badge name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Badge name cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Badge description is required'],
    trim: true,
    maxlength: [200, 'Badge description cannot be more than 200 characters']
  },
  pointsRequired: {
    type: Number,
    required: [true, 'Points required is required'],
    min: [0, 'Points required cannot be negative']
  },
  icon: {
    type: String,
    required: [true, 'Badge icon is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['participation', 'achievement', 'milestone', 'special', 'environmental', 'social'],
    default: 'achievement'
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    default: 'common'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  requirements: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for better query performance
badgeSchema.index({ pointsRequired: 1 });
badgeSchema.index({ category: 1 });
badgeSchema.index({ rarity: 1 });
badgeSchema.index({ isActive: 1 });

// Virtual for badge difficulty level
badgeSchema.virtual('difficulty').get(function() {
  if (this.pointsRequired <= 50) return 'Easy';
  if (this.pointsRequired <= 200) return 'Medium';
  if (this.pointsRequired <= 500) return 'Hard';
  return 'Expert';
});

// Static method to get badges by category
badgeSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ pointsRequired: 1 });
};

// Static method to get badges by rarity
badgeSchema.statics.getByRarity = function(rarity) {
  return this.find({ rarity, isActive: true }).sort({ pointsRequired: 1 });
};

// Static method to get available badges for user points
badgeSchema.statics.getAvailableForPoints = function(userPoints) {
  return this.find({ 
    pointsRequired: { $lte: userPoints }, 
    isActive: true 
  }).sort({ pointsRequired: -1 });
};

// Static method to get next badges to unlock
badgeSchema.statics.getNextToUnlock = function(userPoints) {
  return this.find({ 
    pointsRequired: { $gt: userPoints }, 
    isActive: true 
  }).sort({ pointsRequired: 1 }).limit(5);
};

module.exports = mongoose.model('Badge', badgeSchema);
