import { db } from "../../db.js";


export const  getContactDetails = async () => {
    try {
      const [rows] = await db.query("SELECT * FROM contact_details");
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
  