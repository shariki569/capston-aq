import express from "express";
import { chatbotRes } from "../chatbot/chatbot.js";
import { addIntent, getIntents } from "../controllers/chatbot.js";

const router = express.Router();

router.post("/", chatbotRes);
router.get('/intents', getIntents);
router.post('/intents', addIntent);

export default router;
