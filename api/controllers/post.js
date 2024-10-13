import Post from '../models/Post.js'; // Import the Post model
import jwt from 'jsonwebtoken';

// Get all posts or filter by category
export const getPosts = async (req, res) => {
  try {
    const { cat } = req.query;
    const filter = cat ? { PostCat: cat } : {};
    const posts = await Post.find(filter).populate('Post_Uid', 'username img');
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('Post_Uid', 'username img');
    if (!post) return res.status(404).json("Post not found");
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Add a new post
export const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    try {
      const newPost = new Post({
        PostTitle: req.body.title,
        PostDesc: req.body.desc,
        PostImg: req.body.img,
        PostCat: req.body.cat,
        date: req.body.date,
        Post_Uid: userInfo.id,
      });

      await newPost.save();
      return res.status(201).json("Post has been created");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

// Delete a post
export const deletePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    try {
      const post = await Post.findOneAndDelete({ _id: req.params.id, Post_Uid: userInfo.id });
      if (!post) return res.status(403).json("You can only delete your post!");
      return res.json("Post has been deleted!");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};

// Update a post
export const updatePost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: req.params.id, Post_Uid: userInfo.id },
        {
          PostTitle: req.body.title,
          PostDesc: req.body.desc,
          PostImg: req.body.img,
          PostCat: req.body.cat,
        },
        { new: true }
      );

      if (!updatedPost) return res.status(403).json("You can only update your post!");
      return res.json("Post has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
};
