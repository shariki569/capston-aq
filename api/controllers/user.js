import db from "../db.js";


export const getUsers = async  (req ,res) => {
 try {
    const [rows] = await db.query("SELECT id, username, email, img FROM users");

    if (rows.length === 0) {
        return res.status(404).json("No users found");
    }

    return res.status(200).json(rows);
 } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json("Internal server error");
 }
}