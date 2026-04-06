import express from "express";
import { login, registerUser } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js"; // import protect

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);

router.get("/me", protect, async (req, res) => {
    try {
        res.json(req.user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to get user info" });
    }
});

export default router;