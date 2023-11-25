import express from "express";
import {
  getAccomms,
  getAccomm,
  addAccomm,
  deleteAccomm,
  updateAccomm
} from "../controllers/accommodation.js";
import { isAdmin } from "../middleware/authControl.js";

const router = express.Router();

router.get("/", getAccomms);
router.get("/:slug", getAccomm);
router.post("/", addAccomm);
router.delete("/:id", isAdmin,  deleteAccomm);
router.patch("/:id", updateAccomm);

export default router;
