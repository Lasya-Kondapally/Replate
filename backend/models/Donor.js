const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    location: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [longitude, latitude]
    },
    claimed: {
      type: Boolean,
      default: false,
      required: true, // ✅ This will guarantee it's saved
    },
    foodType: String,
    quantity: String,
    expiry: String,
  },
  { timestamps: true }
);

donorSchema.index({ location: "2dsphere" }); // enable geo queries

module.exports = mongoose.model("Donor", donorSchema);
