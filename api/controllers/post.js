import { db } from "../db.js";
import jwt from "jsonwebtoken";
// import { envConfig } from "../middleware/envConfig.js";
// envConfig();
import env from "dotenv";
env.config();


export const getPosts = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const q = req.query.cat
      ? 'SELECT p.*, u.username, u.display_name FROM posts p JOIN users u ON p.Post_Uid = u.id WHERE p.PostCat = ? AND Is_Deleted = 0 LIMIT ? OFFSET ?'
      : 'SELECT p.*, u.username, u.display_name FROM posts p JOIN users u ON p.Post_Uid = u.id WHERE Is_Deleted = 0 LIMIT ? OFFSET ?';

    const countQuery = req.query.cat
      ? 'SELECT COUNT(*) AS count FROM posts WHERE PostCat = ? AND Is_Deleted = 0'
      : 'SELECT COUNT(*) AS count FROM posts WHERE Is_Deleted = 0';

    const [[{ count }]] = await connection.query(countQuery, req.query.cat ? [req.query.cat] : []);

    const totalPages = Math.ceil(count / limit);

    const [rows] = await connection.query(q, req.query.cat ? [req.query.cat, limit, offset] : [limit, offset]);

    if (!rows.length) {
      return res.status(404).json("No posts found");
    }

    return res.status(200).json({ posts: rows, totalPages });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json(err);
  } finally {
    connection.release();
  }
};


export const getPost = async (req, res) => {
  try {
    const q =
      'SELECT PostId, username, display_name, PostSlug, PostTitle, PostDesc, PostImg, u.img AS userImage, PostCat, date FROM users u JOIN posts p ON u.id = p.post_uid WHERE PostSlug = ?';
    const connection = await db.getConnection();
    const [data] = await connection.query(q, [req.params.slug]);

    connection.release();
    return res.status(200).json(data[0]);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json(err);
  }
};

export const addPost = async (req, res) => {

  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');
  const userInfo = jwt.verify(token, process.env.JWT_SECRET);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 4;
  try {
    const connection = await db.getConnection();
    const q =
      'INSERT INTO posts(`PostTitle`,`PostSlug`, `PostDesc`, `PostImg`, `PostCat`, `date`, `post_uid` ) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const values = [
      req.body.title,
      req.body.slug,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id
    ];

    await connection.query(q, values);
    connection.release();
    return res.json('Post has been created');
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(403).json('Token is not valid');
  }
};

export const getPostCount = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const userId = req.params.id;
    const q = 'SELECT COUNT(*) AS TotalPosts FROM posts WHERE Is_Deleted = 0 AND Post_Uid = ?';
    const [count] = await connection.query(q, [userId]);
    connection.release();
    return res.json({ posts: count[0].TotalPosts });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json(err);
  }
}

export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const postId = req.params.id;

    // const q = 'DELETE FROM posts WHERE `PostId` = ? AND `Post_Uid` = ?';
    const q = `UPDATE posts SET Is_Deleted = 1 WHERE PostId = ? AND Post_Uid = ?`;
    const [result] = await db.query(q, [postId, userInfo.id]);

    if (result.affectedRows === 0) {
      return res.status(403).json('You can only delete your post!');
    }

    return res.json('Post has been deleted!');
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(403).json('Token is not valid');
  }
};


export const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');
  const connection = await db.getConnection();
  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const postId = req.params.id;

    const q =
      'UPDATE posts SET `PostTitle` = ?,`PostSlug` = ?, `PostDesc` = ?, `PostImg` = ?, `PostCat` = ? WHERE `PostId` = ? AND `post_uid` = ?';

    const values = [req.body.title, req.body.slug, req.body.desc, req.body.img, req.body.cat, postId, userInfo.id];

    const [result] = await connection.query(q, values);

    if (result.affectedRows === 0) {
      return res.status(403).json('You can only update your post!');
    }
    connection.release();
    return res.json('Post has been updated');
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(403).json('Token is not valid');
  }
};

export const addComment = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');
  const connection = await db.getConnection();
  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const q = 'INSERT INTO comments (`post_id`, `user_id`, `Comment_Msg`, `Created_At`) VALUES (?, ?, ?, ?)';
    connection.query(q, [req.body.postId, userInfo.id, req.body.comment, req.body.comment_date]);
    connection.release();
    return res.status(200).json('Comment has been added');
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(500).json('Server Error');
  }
}


export const getComments = async (req, res) => {
  try {
    const q = `
    SELECT c.Comment_Msg, u.username, u.display_name, u.img as userImg, c.Created_At, c.Comment_Id  
    FROM comments c 
    JOIN users u 
    ON c.user_id = u.id 
    WHERE c.post_id = ?
    ORDER BY c.Created_At DESC`;


    const connection = await db.getConnection();
    const [rows] = await connection.query(q, [req.params.id]);
    connection.release();
    return res.status(200).json(rows);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json(err);
  }
}

export const deleteComment = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');
  const connection = await db.getConnection();
  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    const commentId = req.params.id;
    const q = 'DELETE FROM comments WHERE `Comment_Id` = ? AND `user_id` = ?';
    const [rows] = await connection.query(q, [commentId, userInfo.id]);

    if (rows.affectedRows === 0) {
      return res.status(403).json('You can only delete your comment!');
    }
    return res.status(200).json('Comment has been deleted!');
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(500).json('Internal server error');
  } finally {
    connection.release();
  }
}