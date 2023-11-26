import express from "express";
import { register, login, logout, sendOTP, verifyOTP, resetPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-otp", sendOTP);
router.post('/verify-otp', verifyOTP)
router.post('/reset-password', resetPassword)
export default router;
