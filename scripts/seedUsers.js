const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const testUsers = [
  {
    name: 'Test Student',
    email: 'student@test.com',
    password: 'password123',
    role: 'student',
    school: 'Green Valley School',
    age: 15,
    points: 150,
    level: 2
  },
  {
    name: 'Test Teacher',
    email: 'teacher@test.com',
    password: 'password123',
    role: 'teacher',
    school: 'Green Valley School',
    points: 300,
    level: 5
  },
  {
    name: 'Test Admin',
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin',
    school: 'Green Valley School',
    points: 500,
    level: 8
  },
  {
    name: 'Test NGO',
    email: 'ngo@test.com',
    password: 'password123',
    role: 'ngo',
    school: 'Eco Foundation',
    points: 200,
    level: 3
  }
];

const seedUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing test users
    await User.deleteMany({
      email: { $in: testUsers.map(user => user.email) }
    });
    console.log('Cleared existing test users');

    // Create new test users
    for (const userData of testUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      const user = new User({
        ...userData,
        passwordHash: hashedPassword
      });
      
      await user.save();
      console.log(`Created user: ${userData.name} (${userData.email})`);
    }

    console.log('✅ Test users seeded successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('===================');
    testUsers.forEach(user => {
      console.log(`${user.role.toUpperCase()}:`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${user.password}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seedUsers();
