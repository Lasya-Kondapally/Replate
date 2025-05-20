// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// connectDB();

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));

// // Starting server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Existing routes
app.use("/api/auth", require("./routes/authRoutes"));

// Add chat route here
app.use("/api/chat", require("./routes/chat"));

// Optional: handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
