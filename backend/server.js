const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);
app.use("/admin", adminRoutes);

const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Appointment Booking Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

