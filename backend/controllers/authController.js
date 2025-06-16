// const User = require("../models/User");
// const validator = require("validator");

// // LOGIN controller
// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log("No user found with email:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       console.log("Password mismatch for email:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     console.log("Login successful for email:", email);
//     return res.status(200).json({ message: "Login successful" });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };

// // REGISTER controller
// exports.register = async (req, res) => {
//   const { name, username, email, address, password } = req.body;

//   // Validate email format
//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: "Invalid email format" });
//   }

//   // Validate password strength
//   const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
//   if (!passwordRegex.test(password)) {
//     return res.status(400).json({
//       message:
//         "Password must be at least 8 characters long and contain an uppercase letter, a number, and a special character.",
//     });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const existingUsername = await User.findOne({ username });
//     if (existingUsername) {
//       return res.status(400).json({ message: "Username already taken" });
//     }

//     // Create new user with all fields
//     const newUser = new User({ name, username, email, address, password });
//     await newUser.save();

//     console.log("User registered:", email);
//     return res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Registration error:", err);
//     return res.status(500).json({ message: "Server Error" });
//   }
// };
const User = require('../models/User');
const validator = require('validator');

exports.register = async (req, res) => {
  const { name, username, email, address, password } = req.body;

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Password strength regex
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        'Password must be at least 8 characters long and contain an uppercase letter, a number, and a special character.',
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const newUser = new User({ name, username, email, address, password });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server Error' });
  }
};
