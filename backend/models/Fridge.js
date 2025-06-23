
const mongoose = require("mongoose");

const fridgeSchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  foodItems: [
    {
      name: String,
      quantity: String,
      expiryDate: String,
    },
  ],
});

fridgeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Fridge", fridgeSchema);
