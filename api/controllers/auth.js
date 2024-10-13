import User from '../models/User.js'; // Import the User model
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
  try {
    // Check existing user
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) return res.status(409).json("User already exists!");

    // Create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Password will be hashed in the pre-save hook
    });

    await newUser.save();
    return res.status(200).json("User has been created!");
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    // Check user
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("User Not Found!");

    // Check password
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong username and password!");

    // Create JWT token
    const token = jwt.sign({ id: user._id }, "jwtkey");
    const { password, ...other } = user._doc; // Exclude the password from the response

    res.cookie("access_token", token, {
      httpOnly: true,
    })
      .status(200)
      .json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// Logout a user
export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true,
  }).status(200).json("User has been logged out");
};
