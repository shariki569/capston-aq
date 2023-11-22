import { db } from "../db.js";
import jwt from "jsonwebtoken";
// import { envConfig } from "../middleware/envConfig.js";
// envConfig();
import env from "dotenv";
env.config();



export const getPosts = async (req, res) => {
  try {
    const q = req.query.cat
      ? 'SELECT p.*, u.username FROM posts p JOIN users u ON p.Post_Uid = u.id WHERE p.PostCat = ?'
      : 'SELECT p.*, u.username FROM posts p JOIN users u ON p.Post_Uid = u.id';

    const connection = await db.getConnection();
    const [rows] = await connection.query(q, [req.query.cat]);

    connection.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json(err);
  }
};

export const getPost = async (req, res) => {
  try {
    const q =
      'SELECT PostId, username, PostSlug, PostTitle, PostDesc, PostImg, u.img AS userImage, PostCat, date FROM users u JOIN posts p ON u.id = p.post_uid WHERE PostSlug = ?';
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
    SELECT c.Comment_Msg, u.username, u.img as userImg, c.Created_At, c.Comment_Id  
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