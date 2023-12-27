import dotenv from "dotenv";
import express from "express";
// import { uploadImage } from "../controllers/uploadImage.js";
import upload from "../middleware/multerUpload.js";
import cloudinary from "../utils/cloudinary.js";
dotenv.config();
const router = express.Router();

router.post("/", upload.single("file"), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (err, result) {
        if(err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Upload failed",
                error: err
            })
        } 
        res.status(200).send(result.secure_url);
    })
});

export default router;


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "../client/public/upload");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage });
  
//   app.post("/api/upload", upload.single("file"), function (req, res) {
//     const file = req.file;
//     res.status(200).json(file.filename);
//   });