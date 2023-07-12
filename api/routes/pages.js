import express from "express";
import { getPages, getPage, updatePage } from "../controllers/page.js";

const router = express.Router();

router.get("/", getPages);
router.get("/:slug", getPage);
router.put("/:slug", updatePage);

export default router;
