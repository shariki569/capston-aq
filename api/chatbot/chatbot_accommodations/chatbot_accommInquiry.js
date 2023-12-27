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


// export const getRooms = async () => {
//   const connection = await db.getConnection()
//   try {
//     const [rows] = await connection.query('SELECT * FROM accommodations WHERE Is_Deleted = 0 AND Accommodation_Type = `Room`')
//     connection.release()
//     return rows;
//   } catch (err) {
//     console.error("Database error:", err);
//     throw err;
//   }
// }
