const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger (optional but good)
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// ===== FRONTEND SERVING =====

// Absolute path to frontend folder
const frontendPath = path.join(__dirname, "../frontend");

// Serve static files (CSS, JS, images)
app.use(express.static(frontendPath));

// Serve frontend homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== API ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);

// Test API
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working fine 🚀" });
});

// ===== SERVER START =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
