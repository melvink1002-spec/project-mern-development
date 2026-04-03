import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/authMiddleware.js"

router.get("/me", protect, (req, res) => {
  res.json(req.user)
})

const router = express.Router();

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json({ token: generateToken(user._id) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && await user.matchPassword(password)) {
    res.json({ token: generateToken(user._id) });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

export default router;