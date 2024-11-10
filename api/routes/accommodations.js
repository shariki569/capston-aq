import express from "express";
import {
  getAccomms,
  getAccomm,
  addAccomm,
  deleteAccomm,
  updateAccomm
} from "../controllers/accommodation.js";

const router = express.Router();

router.get("/", getAccomms);
router.get("/:id", getAccomm);
router.post("/", addAccomm);
router.delete("/:id", deleteAccomm);
router.patch("/:id", updateAccomm);

export default router;
