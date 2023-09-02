import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT p.*, u.username FROM posts p JOIN users u ON p.Post_Uid = u.id WHERE p.PostCat=?"
    : "SELECT p.*, u.username FROM posts p JOIN users u ON p.Post_Uid = u.id";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT PostId, `username`, `PostTitle`, `PostDesc`, `PostImg`, u.img AS userImage, `PostCat`, `date` FROM users u JOIN posts p ON u.id = p.Post_Uid WHERE PostId = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json;

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO posts(`PostTitle`, `PostDesc`, `PostImg`, `PostCat`, `date`, `Post_Uid` ) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json();
      return res.json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `PostId` = ? AND `Post_Uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can only delete your post!");
      return res.json("Post has been deleted!");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat` =? WHERE `id`=? AND `post_uid`=?";

    const postId = req.params.id;
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated");
    });
  });
};
