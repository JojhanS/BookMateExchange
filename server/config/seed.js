const db = require('./connection');
const { User } = require('../models');

db.once('open', async () => {
  try {
    await User.deleteMany(); // Optional: Delete existing users

    // Create users
    await User.create({
      firstName: 'Pamela',
      lastName: 'Washington',
      email: 'pamela@testmail.com',
      password: 'password12345',
    });

    await User.create({
      firstName: 'Elijah',
      lastName: 'Holt',
      email: 'eholt@testmail.com',
      password: 'password12345'
    });

    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    process.exit();
  }
});
