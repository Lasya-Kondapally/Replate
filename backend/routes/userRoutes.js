//it stores data from the chat: donor/reciver name,location etc
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users - Register donor or receiver
router.post('/', async (req, res) => {
  try {
    const { name, userType, location, foodDetails } = req.body;

    if (!name || !userType || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newUser = new User({
      name,
      userType,
      location,
      foodDetails
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/:id/dashboard
router.get('/:id/dashboard', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('matchedUser');
    if (!user) return res.status(404).json({ message: "User not found" });

    const dashboard = {
      name: user.name,
      status: user.status,
      role: user.userType,
      matchedWith: user.matchedUser
        ? {
            name: user.matchedUser.name,
            foodDetails: user.matchedUser.foodDetails,
            location: user.matchedUser.location
          }
        : null
    };

    res.json(dashboard);
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark donation as completed
router.post('/:id/complete', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || !user.matchedUser) return res.status(404).json({ message: 'User or match not found' });

  const matchedUser = await User.findById(user.matchedUser);

  user.status = 'completed';
  matchedUser.status = 'completed';

  await user.save();
  await matchedUser.save();

  res.json({ message: 'Donation marked as completed.' });
});
router.post('/', async (req, res) => {
  try {
    console.log("Received user data:", req.body); // 🪵 Add this
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error saving user:", err); // 🧨 This is the key!
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router;
