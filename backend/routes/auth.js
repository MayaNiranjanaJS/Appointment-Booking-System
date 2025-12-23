const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  const file =
    role === "admin" ? "data/admins.json" : "data/users.json";

  const users = JSON.parse(fs.readFileSync(file));

  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!found) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", role });
});

module.exports = router;
