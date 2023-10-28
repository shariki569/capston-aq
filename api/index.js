import express from "express";
import postRoutes from "./routes/posts.js";
import facilityRoutes from "./routes/facilities.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import pageRoutes from "./routes/pages.js";
import chatbotRoutes from "./routes/chatbotRoute.js"
import contactRoutes from "./routes/contact.js";
import accommRoutes from "./routes/accommodations.js";
import imageRoutes from "./routes/images.js"
import emailRoutes from "./routes/emailRoute.js"
import amenityRoutes from "./routes/amenities.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import upload from "./middleware/multerUpload.js";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/chatbotRoute", chatbotRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/images", imageRoutes);
app.use('/api/emailRoute', emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/accommodations", accommRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/facilities", facilityRoutes);


// app.listen(8800, () => {
//   console.log("Connected oy amaw!");
// });
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
  console.log("Connected oy amaw!");
});
export default app;