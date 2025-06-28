const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// ✅ Route 1: Save Donor
router.post('/', async (req, res) => {
  const { name, age, location, foodType, quantity, expiry, userId } = req.body;



  try {
    // const [lat, lng] = location.split(',').map(Number); // Convert to float
    const [lng, lat] = location.coordinates;
    const newDonor = new Donor({
      name,
      age,
      userId, // 👈 add this
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


router.get('/my-donations/:userId', async (req, res) => {
  try {
    const donations = await Donor.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your donations.' });
  }
});


// ✅ Get all food claimed by the receiver
router.get('/my-claims/:userId', async (req, res) => {
  try {
    const claims = await Donor.find({ claimed: true, claimedBy: req.params.userId }).populate('claimedBy').sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch your claimed donations.' });
  }
});

router.get('/stats/donor/:username', async (req, res) => {
  try {
    const total = await Donor.countDocuments({ name: req.params.username });
    const active = await Donor.countDocuments({ name: req.params.username, claimed: false });
    const claimed = await Donor.countDocuments({ name: req.params.username, claimed: true });

    res.json({ total, active, claimed });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching donor stats' });
  }
});


router.get('/stats/receiver/:userId', async (req, res) => {
  try {
    const claims = await Donor.find({ claimed: true, claimedBy: req.params.userId });
    const total = claims.length;
    const uniqueDonors = new Set(claims.map(c => c.name)).size;
    const lastLocation = claims.length > 0 ? claims[0].location.coordinates : null;

    res.json({ total, uniqueDonors, lastLocation });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching receiver stats' });
  }
});




// ✅ Route 3: Mark a Donor as Claimed
router.post('/claim/:id', async (req, res) => {
  try {
    await Donor.findByIdAndUpdate(req.params.id, {
  claimed: true,
  claimedBy: req.body.userId  // 👈 You'll pass this from frontend
});

    res.json({ message: 'Donor successfully marked as claimed.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to mark donor as claimed.' });
  }
});

module.exports = router;
