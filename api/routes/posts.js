import express from "express";
import {
  addComment,
  addPost,
  deletePost,
  getComments,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.js";
// import { authenticateToken, restrictTo } from "../middleware/authControl.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", addPost);
router.delete("/:id",  deletePost);
router.put("/:id", updatePost);
router.post('/comments/', addComment)
router.get('/comments/:id', getComments)
export default router;
