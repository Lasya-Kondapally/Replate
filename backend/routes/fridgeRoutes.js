// const express = require("express");
// const router = express.Router();
// const Fridge = require("../models/Fridge");

// // 🔍 Get nearby fridges
// router.post("/nearby", async (req, res) => {
//   try{const { latitude, longitude } = req.body;

//   if (!latitude || !longitude) return res.status(400).json({ error: "Missing coordinates" });
//   }

//   const fridges = await Fridge.find({
//     location: {
//       $nearSphere: {
//         $geometry: { type: "Point", coordinates: [longitude, latitude] },
//         $maxDistance: 5000, // meters
//       },
//     },
//   });

//   res.json(fridges);
//   } catch (err) {
//     console.error("❌ Error in /api/fridges/nearby:", err.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // 🧊 Add food to fridge
// router.post("/:id/add-food", async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity, expiryDate } = req.body;

//   const fridge = await Fridge.findById(id);
//   if (!fridge) return res.status(404).json({ message: "Fridge not found" });

//   fridge.foodItems.push({ name, quantity, expiryDate });
//   await fridge.save();

//   res.json({ message: "Food added to fridge successfully" });
// });

// // 🧭 Get all fridges (for map display, optional)
// router.get("/all", async (req, res) => {
//   const fridges = await Fridge.find();
//   res.json(fridges);
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Fridge = require("../models/Fridge");

// 🔍 Get nearby fridges
router.post("/nearby", async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Missing coordinates" });
    }

    const fridges = await Fridge.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude], // [lng, lat]
          },
          $maxDistance: 5000, // meters (5 km)
        },
      },
    });

    res.json(fridges);
  } catch (err) {
    console.error("❌ Error in /api/fridges/nearby:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🧊 Add food to fridge
router.post("/:id/add-food", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, expiryDate } = req.body;

    const fridge = await Fridge.findById(id);
    if (!fridge) return res.status(404).json({ message: "Fridge not found" });

    fridge.foodItems.push({ name, quantity, expiryDate });
    await fridge.save();

    res.json({ message: "Food added to fridge successfully" });
  } catch (err) {
    console.error("❌ Error in /add-food:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 🧭 Get all fridges (for map display, optional)
router.get("/all", async (req, res) => {
  try {
    const fridges = await Fridge.find();
    res.json(fridges);
  } catch (err) {
    console.error("❌ Error in /all:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
