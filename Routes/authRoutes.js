import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { getUserProfile} from "../controllers/userController.js";
import protect from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, getUserProfile);
export default router;
