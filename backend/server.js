const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/booking");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});

app.use("/auth", authRoutes);
app.use("/booking", bookingRoutes);

const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Appointment Booking Backend is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

