import express from 'express';
import { addAmenity, deleteAmenity, getAmenities, updateAmenity } from '../controllers/amenities.js';
import { isAdmin } from '../middleware/authControl.js';

const router = express.Router();

router.get('/', getAmenities);
router.delete("/:id", isAdmin, deleteAmenity);
router.post('/', addAmenity);
router.put('/:id', isAdmin, updateAmenity);

export default router;