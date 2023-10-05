import express from "express";
import { 
    addFacility, 
    deleteFacility, 
    getFacilities, 
    updateFacility 
} from "../controllers/facilities.js";


const router = express.Router();

router.get("/", getFacilities);
router.post("/", addFacility);
router.patch("/:id", updateFacility);
router.delete("/:id", deleteFacility);
export default router