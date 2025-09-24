const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  earnedAt: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['participation', 'achievement', 'milestone', 'special', 'environmental', 'social'],
    default: 'achievement'
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'ngo', 'admin'],
    default: 'student'
  },
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative']
  },
  badges: [badgeSchema],
  school: {
    type: String,
    trim: true
  },
  grade: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  profilePicture: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ role: 1 });
userSchema.index({ points: -1 }); // For leaderboards

// Virtual for user's level based on points
userSchema.virtual('level').get(function() {
  return Math.floor(this.points / 100) + 1;
});

// Method to add points
userSchema.methods.addPoints = function(points) {
  this.points += points;
  return this.save();
};

// Method to add badge
userSchema.methods.addBadge = function(badgeData) {
  // Check if badge already exists
  const existingBadge = this.badges.find(badge => badge.name === badgeData.name);
  if (!existingBadge) {
    this.badges.push(badgeData);
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to check if user has specific badge
userSchema.methods.hasBadge = function(badgeName) {
  return this.badges.some(badge => badge.name === badgeName);
};

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('passwordHash')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Remove passwordHash from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);
