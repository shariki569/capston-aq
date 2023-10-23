import { db} from "../db.js";
import jwt from "jsonwebtoken";


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
      'SELECT PostId, `username`, `PostTitle`, `PostDesc`, `PostImg`, u.img AS userImage, `PostCat`, `date` FROM users u JOIN posts p ON u.id = p.Post_Uid WHERE PostId = ?';
      const connection = await db.getConnection();
    const [rows] = await connection.query(q, [req.params.id]);
    
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json(err);
  }
};

export const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json('Not authenticated');

  try {
    const userInfo = jwt.verify(token, 'jwtkey');

    const q =
      'INSERT INTO posts(`PostTitle`, `PostDesc`, `PostImg`, `PostCat`, `date`, `Post_Uid` ) VALUES (?, ?, ?, ?, ?, ?)';
    
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, req.body.date, userInfo.id];
    
    await db.query(q, values);
    
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
    const userInfo = jwt.verify(token, 'jwtkey');
    const postId = req.params.id;
    
    const q = 'DELETE FROM posts WHERE `PostId` = ? AND `Post_Uid` = ?';
    
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

  try {
    const userInfo = jwt.verify(token, 'jwtkey');
    const postId = req.params.id;
    
    const q =
      'UPDATE posts SET `PostTitle` = ?, `PostDesc` = ?, `PostImg` = ?, `PostCat` = ? WHERE `PostId` = ? AND `Post_Uid` = ?';
    
    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat, postId, userInfo.id];
    
    const [result] = await db.query(q, values);
    
    if (result.affectedRows === 0) {
      return res.status(403).json('You can only update your post!');
    }
    
    return res.json('Post has been updated');
  } catch (err) {
    console.error('JWT error:', err);
    return res.status(403).json('Token is not valid');
  }
};
