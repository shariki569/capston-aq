import express from "express";
import { deleteUsers, getProfile,  getUsers, updateProfile, updateRole } from "../controllers/user.js";
import { isAdmin } from "../middleware/authControl.js";

const router = express.Router();


router.get('/', getUsers)
router.delete('/:id', isAdmin, deleteUsers)
router.put('/role/:id', isAdmin, updateRole)
router.put('/:id', updateProfile)
router.get('/:id', getProfile)

export default router;
