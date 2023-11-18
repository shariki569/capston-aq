import express from "express";
// import { uploadImage } from "../controllers/uploadImage.js";
import upload from "../middleware/multerUpload.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();

router.post("/", upload.single("file"), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (err, result) {
        if(err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Upload failed",
            })
        } 
        res.status(200).send(result.url);
    })
});

export default router;
