import { db } from "../db.js";

export const getContacts = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Use the promise-based API

    const [rows] = await connection.query("SELECT * FROM contact_details");
    connection.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json("Internal server error");
  }
};

export const getContact = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Get a connection from the pool

    const [rows] = await connection.query(
      "SELECT `contact_id`, `con_address`, `con_email`, `con_telphone`, `con_cellphone` FROM contact_details WHERE contact_id = ?",
      [req.params.id]
    );

    connection.release(); // Release the connection back to the pool

    if (rows.length === 0) {
      return res.status(404).json("Contact not found");
    }

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json("Internal server error");
  }
};

// export const updateContact = (req, res) => {

//     const q = "UPDATE contact_details SET ? WHERE contact_id = ?";
//     const updatedContact = req.body;

//     db.query(q, [updatedContact, conId ], (err, data) => {
//         if (err) return res.status(500).json({error: err.message});
//         return res.json("Contact Updated");
//     })
// }

export const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;
    const { con_address, con_email, con_telphone, con_cellphone } = req.body;

    const q =
      "UPDATE contact_details SET `con_address` = ?, `con_email` = ?, `con_telphone` = ?, `con_cellphone` = ? WHERE `contact_id` = ?";

      const [result] = await db.query(q, [con_address, con_email, con_telphone, con_cellphone, contactId])

      if (result.affectedRows > 0) {
        return res.json('Contact Updated')

      } else {
        return res.status(404).json('Contact not found please add your contact info')
      }
  } catch (err) {
    console.error('Error during update', err)
    return res.status(500).json(err);
  }
};

// export const updateContact = (req, res) => {
//   const q =
//     "UPDATE contact_details SET `con_address` = ?, `con_email` = ?, `con_telphone` = ?, `con_cellphone` = ? WHERE `contact_id` = ?";

//   const conId = req.params.id;
//   const values = [
//     req.body.con_address,
//     req.body.con_email,
//     req.body.con_telphone,
//     req.body.con_cellphone,
//   ];

//   db.query(q, [...values, conId], (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: err.message });
//     }
//     return res.json("Contact Updated");
//   });
// };
