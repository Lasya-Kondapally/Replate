
// 22nd
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const initializeFridges = require("./initFridges");
const fridgeRoutes = require("./routes/fridgeRoutes");

const app = express();

// Routes
const geoChatRouter = require("./routes/geoChat");
const donorRoutes = require("./routes/donors"); // ✅ added

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", require("./routes/userRoutes")); // ✅ Mount the users route


// Connect to DB
//connectDB();

connectDB().then(() => {
  // 🚀 Initialize fridges after DB is ready
  initializeFridges();
});

// Mount all routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/geo", geoChatRouter);
app.use("/api/donors", donorRoutes); // ✅ added
app.use("/api/fridges", fridgeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
