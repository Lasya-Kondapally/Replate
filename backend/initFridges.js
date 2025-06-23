const Fridge = require("./models/Fridge");

const defaultFridges = [
  {
    name: "Fridge at Jubilee Hills",
    location: { type: "Point", coordinates: [78.4145, 17.4305] },
  },
  {
    name: "Fridge at Banjara Hills",
    location: { type: "Point", coordinates: [78.4513, 17.4239] },
  },
  {
    name: "Fridge at Manikonda",
    location: { type: "Point", coordinates: [78.3829, 17.4065] },
  },
];

const initializeFridges = async () => {
  const count = await Fridge.countDocuments();
  if (count === 0) {
    await Fridge.insertMany(defaultFridges);
    console.log("✅ Default fridges inserted");
  } else {
    console.log("ℹ️ Fridges already exist");
  }
};

module.exports = initializeFridges;
