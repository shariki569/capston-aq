import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfig } from "../middleware/envConfig.js";
envConfig();

export const register = async (req, res) => {
  try {
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [req.body.email, req.body.username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json("Username already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isDeleted: 0,
      role: 3
    };

    const [result] = await db.query("INSERT INTO users SET ?", newUser);
    if (result.affectedRows > 0) {
      //User has created
      const userId = result.insertId;
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json("User has been created!");
    } else {
      return res.status(500).json("User registration failed");
    }
  } catch (err) {
    console.error("Error during registration", err);
    return res.status(500).json(err);
  }
};

export const login = async (req, res) => {
  try {
    // Check user
    const q = "SELECT users.*, role.Role_Name FROM users  INNER JOIN role ON users.role = role.Role_Id WHERE username = ?";
    const [rows] = await db.query(q, [req.body.username]);

    if (rows.length === 0) {
      return res.status(404).json("User Not Found!");
    }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      rows[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json("Wrong username and password!");
    }

    const token = jwt.sign({ id: rows[0].id, Role: rows[0].Role_Name }, process.env.JWT_SECRET);
    const { password, ...other } = rows[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
  
      })
      .status(200)
      .json(other);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json(err);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out");
};
