// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db");

// const app = express();
// const geoChatRouter = require("./routes/geoChat");
// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// connectDB();

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/chat", require("./routes/chat"));


// app.use("/api/geo", geoChatRouter);

// // Starting server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
 

///////////////////////////////////////////////////////////////////////////////////////////////////////

// 22nd
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

// Routes
const geoChatRouter = require("./routes/geoChat");
const donorRoutes = require("./routes/donors"); // ✅ added

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Mount all routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chat"));
app.use("/api/geo", geoChatRouter);
app.use("/api/donors", donorRoutes); // ✅ added

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
