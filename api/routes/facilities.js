import express from "express";
import { 
    addFacility, 
    deleteFacility, 
    getFacilitiesWithImages, 
    // getFacilities, 
    updateFacility 
} from "../controllers/facilities.js";



const router = express.Router();

// router.get("/", getFacilities);
router.post("/", addFacility);
router.get("/", getFacilitiesWithImages)
router.put("/:id", updateFacility);
router.delete("/:id", deleteFacility);
export default router