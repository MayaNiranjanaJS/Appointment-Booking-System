const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// POST /auth/login
router.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  // Correct relative path
  const file =
    role === "admin"
      ? path.join(__dirname, "../data/admins.json")
      : path.join(__dirname, "../data/users.json");

  const users = JSON.parse(fs.readFileSync(file));

  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!found) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", role, user: found });
});

// POST /auth/signup
router.post("/signup", (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const file =
  role === "admin"
    ? path.join(__dirname, "../data/admins.json")
    : path.join(__dirname, "../data/users.json");
    
  const users = JSON.parse(fs.readFileSync(file, "utf-8"));

  // Check if username already exists
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  // Add new user
  const newUser = {
    id: Date.now(),
    username,
    password
  };
  users.push(newUser);

  fs.writeFileSync(file, JSON.stringify(users, null, 2));
  res.json({ message: "Signup successful" });
});

module.exports = router;