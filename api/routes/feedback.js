import express from "express";
import { addFeedback, getFeedback, getRatings } from "../controllers/feedback.js";

const router = express.Router()


router.post('/', addFeedback);
router.get('/', getFeedback);
router.get('/rating', getRatings);

export default router