import express from "express";
import { addFeedback, approvedFeedback, deleteFeedback, getFeedback, getRatings, updateFeedback } from "../controllers/feedback.js";

const router = express.Router()


router.post('/', addFeedback);
router.get('/', getFeedback);
router.get('/rating', getRatings);
router.put('/:id', updateFeedback);
router.get('/approved', approvedFeedback);
router.delete('/:id', deleteFeedback)

export default router