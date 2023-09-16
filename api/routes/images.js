import express from "express"
import { uploadedImages } from "../controllers/image.js"


const router = express.Router();

router.get('/', uploadedImages);

export default router;