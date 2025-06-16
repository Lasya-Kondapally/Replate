const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema for donor/receiver with location
const UserSchema = new mongoose.Schema({
  name: String,
  role: String, // 'donor' or 'receiver'
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number], // [lng, lat]
  },
});

UserSchema.index({ location: "2dsphere" });

const User = mongoose.model("GeoUser", UserSchema);

// POST /api/geo/addUser - save user with location
router.post("/addUser", async (req, res) => {
  try {
    const { name, role, location } = req.body;
    const user = new User({
      name,
      role,
      location: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
    });
    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    console.error("Add user error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/geo/findNearby - find nearby users within radius
router.post("/findNearby", async (req, res) => {
  try {
    const { role, location, radiusInMeters = 5000 } = req.body;

    // Find users with opposite role nearby (donors find receivers, receivers find donors)
    const oppositeRole = role === "donor" ? "receiver" : "donor";

    const nearbyUsers = await User.find({
      role: oppositeRole,
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [location.lng, location.lat],
          },
          $maxDistance: radiusInMeters,
        },
      },
    }).limit(10);

    res.json({ success: true, nearbyUsers });
  } catch (error) {
    console.error("Find nearby error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
