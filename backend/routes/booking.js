const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  const booking = req.body;

  // 🔒 safety check
  if (!booking || Object.keys(booking).length === 0) {
    return res.status(400).json({ message: "Invalid booking data" });
  }

  const bookings = JSON.parse(fs.readFileSync(dataPath));
  bookings.push(booking);

  fs.writeFileSync(dataPath, JSON.stringify(bookings, null, 2));

  res.json({ message: "Booking successful" });
});


//router.post("/", (req, res) => {
  //const bookings = JSON.parse(
    //fs.readFileSync("data/bookings.json")
  //);

  //bookings.push(req.body);

  // fs.writeFileSync("data/bookings.json", JSON.stringify(bookings, null, 2));

  //res.json({ message: "Booking successful" });
//});

router.get("/", (req, res) => {
  const bookings = JSON.parse(
    fs.readFileSync("data/bookings.json")
  );
  res.json(bookings);
});

module.exports = router;
