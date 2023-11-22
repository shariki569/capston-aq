import { db } from "../../db.js";


export const  getContactDetails = async () => {
  const connection = await db.getConnection() 
  try {
      const [rows] = await connection.query("SELECT * FROM contact_details");
      connection.release();
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
  