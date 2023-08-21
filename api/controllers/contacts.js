import { db } from "../db.js";

export const getContacts = (req, res) => {
  const q = "SELECT * FROM contact_details";

  db.query(q, (err, data) => {
    if (err) return res.status(500);
    return res.status(200).json(data);
  });
};

export const getContact = (req, res) => {
  const q =
    "SELECT `contact_id`, `con_address`, `con_email`, `con_telphone`, `con_cellphone` FROM contact_details WHERE contact_id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json;
    return res.status(200).json(data[0]);
  });
};

// export const updateContact = (req, res) => {

//     const q = "UPDATE contact_details SET ? WHERE contact_id = ?";
//     const updatedContact = req.body;

//     db.query(q, [updatedContact, conId ], (err, data) => {
//         if (err) return res.status(500).json({error: err.message});
//         return res.json("Contact Updated");
//     })
// }

export const updateContact = (req, res) => {
  const q =
    "UPDATE contact_details SET `con_address` = ?, `con_email` = ?, `con_telphone` = ?, `con_cellphone` = ? WHERE `contact_id` = ?";
  console.log(req.body);

  const conId = req.params.id;
  const values = [
    req.body.con_address,
    req.body.con_email,
    req.body.con_telphone,
    req.body.con_cellphone,
  ];

  db.query(q, [...values, conId], (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: err.message });
    }
    return res.json("Contact Updated");
  });
};
