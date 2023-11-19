import express from "express";
import { chatbotRes } from "../chatbot/chatbot.js";
import { addIntent, getIntents, updateIntent } from "../controllers/chatbot.js";

const router = express.Router();

router.post("/", chatbotRes);
router.get('/intents', getIntents);
router.post('/intents', addIntent);
router.patch('/intents/:id', updateIntent)

export default router;
