import express from 'express';
import { addAmenity, deleteAmenity, getAmenities, updateAmenity } from '../controllers/amenities.js';
import { isAdmin, isAuthorized } from '../middleware/authControl.js';

const router = express.Router();

router.get('/', getAmenities);
router.delete("/:id", isAdmin, deleteAmenity);
router.post('/', addAmenity);
router.put('/:id', isAuthorized, updateAmenity);

export default router;