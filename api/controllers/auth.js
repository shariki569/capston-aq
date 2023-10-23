import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
    try {
        const [existingUsers] = await db.query( 'SELECT * FROM users WHERE email = ? OR username = ?' , [req.body.email, req.body.username]);
        
        if (existingUsers.length > 0) {
            return res.status(409).json('Username already exists')
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        }

        const [result] = await db.query('INSERT INTO users SET ?', newUser);
        if (result.affectedRows > 0) {
            //User has created
            const userId = result.insertId;
            const token = jwt.sign({id: userId}, 'jwtkey')

            res.cookie('access_token', token, {
                httpOnly: true,
            }).status(200).json('User has been created!')
        } else {
            return res.status(500).json('User registration failed')
        }
    } catch (err) {
        console.error('Error during registration', err);
        return res.status(500).json(err)
    }
}


export const login = async (req, res) => {
    try {
      // Check user
      const q = 'SELECT * FROM users WHERE username = ?';
      const [rows] = await db.query(q, [req.body.username]);
  
      if (rows.length === 0) {
        return res.status(404).json('User Not Found!');
      }
  
      // Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        rows[0].password
      );
  
      if (!isPasswordCorrect) {
        return res.status(400).json('Wrong username and password!');
      }
  
      const token = jwt.sign({ id: rows[0].id }, 'jwtkey');
      const { password, ...other } = rows[0];
  
      res.cookie('access_token', token, {
        httpOnly: true,
      }).status(200).json(other);
    } catch (err) {
      console.error('Database error:', err);
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
