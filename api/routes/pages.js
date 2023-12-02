import express from "express";
import {  getAboutUs, updateAboutUs,  } from "../controllers/page.js";

const router = express.Router();

// router.get("/", getPages);
// router.get("/:slug", getPage);
// router.put("/update-about-us", updatePage);
// router.put("/:slug", updatePage);
router.get("/", getAboutUs);
router.put("/update-about-us", updateAboutUs);

export default router;
