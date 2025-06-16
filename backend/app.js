const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();
const geoChatRouter = require("./routes/geoChat");
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chat"));


app.use("/api/geo", geoChatRouter);

// Starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB (replace your connection string)
// mongoose
//   .connect("mongodb://localhost:27017/replate", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Use geoChat routes
// const geoChatRouter = require("./routes/geoChat");
// app.use("/api/geo", geoChatRouter);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
