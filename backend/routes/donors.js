const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// ✅ Route 1: Save Donor
router.post('/', async (req, res) => {
  const { name, age, location, foodType, quantity, expiry } = req.body;

  try {
    const [lat, lng] = location.split(',').map(Number); // Convert to float
    const newDonor = new Donor({
      name,
      age,
      location: {
        type: 'Point',
        coordinates: [lng, lat], // MongoDB requires [lng, lat]
      },
      foodType,
      quantity,
      expiry,
      claimed: false // 👈 Mark as unclaimed by default
    });

    await newDonor.save();
    res.status(201).json({ message: 'Donor saved successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving donor data.' });
  }
});

// ✅ Route 2: Find Nearby Unclaimed Donors
router.post('/nearby', async (req, res) => {
  const { lat, lng } = req.body;

  try {
    const donors = await Donor.find({
      claimed: false, // 👈 Only show unclaimed donors
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: 5000 // 5km radius
        }
      }
    });

    res.json(donors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching nearby donors.' });
  }
});

// ✅ Route 3: Mark a Donor as Claimed
router.post('/claim/:id', async (req, res) => {
  try {
    await Donor.findByIdAndUpdate(req.params.id, { claimed: true });
    res.json({ message: 'Donor successfully marked as claimed.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark donor as claimed.' });
  }
});

module.exports = router;
