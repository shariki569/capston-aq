import express from "express";
import {
  addComment,
  addPost,
  deleteComment,
  deletePost,
  getComments,
  getPost,
  getPostCount,
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
router.get('/count/:id', getPostCount)
router.delete('/comments/:id', deleteComment)
export default router;
