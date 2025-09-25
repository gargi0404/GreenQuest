const mongoose = require('mongoose');

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const mongoUri = process.env.MONGODB_URI;

  // In development, allow the API to boot without MongoDB to speed up local runs
  if (!mongoUri && !isProduction) {
    console.warn('MONGODB_URI not set. Skipping MongoDB connection in development.');
    return;
  }

  try {
    if (!mongoUri) {
      throw new Error('MONGODB_URI is required in production');
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (isProduction) {
      console.error('Database connection error (production):', error.message);
      process.exit(1);
    } else {
      console.warn('Database connection skipped or failed in development:', error.message);
    }
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

module.exports = connectDB;
