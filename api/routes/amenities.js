import express from 'express';
import { deleteAmenity, getAmenities } from '../controllers/amenities.js';

const router = express.Router();

router.get('/', getAmenities);
router.delete("/:id", deleteAmenity);

export default router;