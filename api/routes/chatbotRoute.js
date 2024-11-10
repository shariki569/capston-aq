import express from "express";
import { chatbotRes } from "../chatbot/chatbot.js";

const router = express.Router();

router.post("/", chatbotRes);

export default router;
