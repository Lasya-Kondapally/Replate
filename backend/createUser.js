const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path if needed

mongoose.connect('mongodb+srv://lakkadiabhigna:wYFIepB0pdYBApvD@replatedb.dehgox7.mongodb.net/replateDb?retryWrites=true&w=majority&appName=replateDb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Hash the password
    const hashedPassword = await bcrypt.hash('98765', 10);

    // Create a new user with hashed password
    const testUser = new User({
      email: 'asdfz2gmail.com',
      password: hashedPassword, // Save the hashed password
    });

    // Save the user
    await testUser.save();
    console.log('✅ Test user created!');

    // Disconnect from the database
    mongoose.disconnect();
  })
  .catch((err) => console.error('❌ DB connection error:', err));
