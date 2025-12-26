const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dataPath = path.join(__dirname, "../data/bookings.json");

// POST booking
router.post("/", (req, res) => {
  try {
    const booking = req.body;

    if (!booking || Object.keys(booking).length === 0) {
      return res.status(400).json({ message: "Invalid booking data" });
    }

    const { date, time } = booking;
    
    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required" });
    }
    
    const bookingDateTime = new Date(`${date}T${time}`);
    
    if (isNaN(bookingDateTime.getTime())) {
      return res.status(400).json({ message: "Invalid date or time format" });
    }
    
    if (bookingDateTime < new Date()) {
      return res.status(400).json({ message: "Booking cannot be in the past" });
    }
    
    const bookings = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    booking.id = Date.now();
    bookings.push(booking);

    fs.writeFileSync(dataPath, JSON.stringify(bookings, null, 2));

    res.json({ message: "Booking successful" });
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: "Server error while saving booking" });
  }
});

router.delete("/:id", (req, res) => {
  const bookingId = Number(req.params.id);

  const bookings = JSON.parse(fs.readFileSync(dataPath,"utf-8"));
  const updatedBookings = bookings.filter(b => b.id !== bookingId);

  if (bookings.length === updatedBookings.length) {
    return res.status(404).json({ message: "Booking not found" });
  }

  fs.writeFileSync(dataPath, JSON.stringify(updatedBookings, null, 2));
  res.json({ message: "Booking deleted successfully" });
});

// GET all bookings
router.get("/", (req, res) => {
  try {
    const bookings = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to read bookings" });
  }
});

module.exports = router;