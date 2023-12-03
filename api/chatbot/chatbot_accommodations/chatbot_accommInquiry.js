import { db } from "../../db.js";

export const getAccommodation = async () => {
  const connection = await db.getConnection()
  try {
    const [rows] = await connection.query("SELECT * FROM accommodations WHERE Is_Deleted = 0");
    connection.release()
    return rows;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
};
