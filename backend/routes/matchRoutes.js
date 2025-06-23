const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Haversine formula to calculate distance between coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// GET /api/match?lat=xx&lng=yy
router.get('/', async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: "Missing coordinates" });

    const donors = await User.find({ userType: 'donor', status: 'waiting' });

    const nearbyDonors = donors.map(donor => {
      const dist = calculateDistance(
        parseFloat(lat),
        parseFloat(lng),
        donor.location.lat,
        donor.location.lng
      );
      return {
        id: donor._id,
        name: donor.name,
        foodDetails: donor.foodDetails,
        distance: dist.toFixed(2)
      };
    }).sort((a, b) => a.distance - b.distance);

    res.json(nearbyDonors);
  } catch (error) {
    console.error("Error finding nearby donors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/match/confirm
router.post('/confirm', async (req, res) => {
  try {
    const { receiverId, donorId } = req.body;

    const donor = await User.findById(donorId);
    const receiver = await User.findById(receiverId);

    if (!donor || !receiver) {
      return res.status(404).json({ message: 'Donor or receiver not found' });
    }

    donor.status = 'matched';
    donor.matchedUser = receiver._id;

    receiver.status = 'matched';
    receiver.matchedUser = donor._id;

    await donor.save();
    await receiver.save();

    res.json({ message: 'Match successful', donor, receiver });
  } catch (error) {
    console.error("Error confirming match:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
