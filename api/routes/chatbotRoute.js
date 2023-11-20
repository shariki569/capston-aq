import express from "express";
import { chatbotRes, trainChatbot } from "../chatbot/chatbot.js";
import { addIntent, deleteIntent, getIntents, updateIntent } from "../controllers/chatbot.js";

const router = express.Router();

router.post("/train", trainChatbot)
router.post("/", chatbotRes);
router.get('/intents', getIntents);
router.post('/intents', addIntent);
router.patch('/intents/:id', updateIntent)
router.delete('/intents/:id', deleteIntent)
export default router;
