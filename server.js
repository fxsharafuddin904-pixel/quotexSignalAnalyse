require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const signalRoutes = require("./signal");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/signal", signalRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Trading Signal Analysis Server Running 🚀"
  });
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found"
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
