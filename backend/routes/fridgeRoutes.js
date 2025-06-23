const express = require("express");
const router = express.Router();
const Fridge = require("../models/Fridge");

// 🔍 Get nearby fridges with food items
router.post("/nearby", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: "Missing coordinates" });
    }

    const fridges = await Fridge.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // [lng, lat]
          },
          $maxDistance: 5000, // 5 km in meters
        },
      },
    });

    res.status(200).json(fridges); // includes foodItems by default
  } catch (err) {
    console.error("❌ Error in /api/fridges/nearby:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🧊 Add food to a fridge by ID
router.post("/:id/add-food", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, expiryDate } = req.body;
    console.log("📥 Received in backend /add-food:", { name, quantity, expiryDate });


    if (!name || !quantity || !expiryDate) {
      return res.status(400).json({ error: "Incomplete food item data" });
    }

    const fridge = await Fridge.findById(id);
    if (!fridge) return res.status(404).json({ message: "Fridge not found" });

    fridge.foodItems.push({ name, quantity, expiryDate });
    await fridge.save();

    res.status(200).json({ message: "Food added to fridge successfully" });
  } catch (err) {
    console.error("❌ Error in /add-food:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🧭 Get all fridges (for map or admin use)
router.get("/all", async (req, res) => {
  try {
    const fridges = await Fridge.find();
    res.status(200).json(fridges);
  } catch (err) {
    console.error("❌ Error in /all:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
