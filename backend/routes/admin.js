const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/bookings", (req, res) => {
  const bookings = JSON.parse(
    fs.readFileSync("data/bookings.json")
  );
  res.json(bookings);
});

module.exports = router;
