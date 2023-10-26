import { db } from "../../db.js";

export const getAccommodation = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM accommodations");
    return rows;
  } catch (err) {
    console.error("Database error:", err);
    throw err;
  }
};
