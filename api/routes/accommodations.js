import express from "express";
import {
  getAccomms,
  addAccomm,
  deleteAccomm,
  updateAccomm
} from "../controllers/accommodation.js";

const router = express.Router();

router.get("/", getAccomms);
router.post("/", addAccomm);
router.delete("/:id", deleteAccomm);
router.patch("/:id", updateAccomm);

export default router;
