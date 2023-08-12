import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAccomms = (req, res) => {
  const q = req.query.type
    ? "SELECT * FROM accommodations WHERE Accommodation_Type = ?"
    : "SELECT * FROM accommodations";

  db.query(q, [req.query.type], (err, data) => {
    if (err) return res.status(500);
    return res.status(200).json(data);
  });
};


// export const getAccomm = (req, res) => {
//   const q = "SELECT * FROM accommodations";
//   db.query(q, (err, data) => {
//     if (err) return res.status(500);
//     return res.status(200).json(data);
//   });
// }

export const deleteAccomm = (req, res) => {

  const accommId = req.params.id;
  const q = "DELETE FROM accommodations WHERE Accommodation_Id = ?";
  
  db.query(q, [accommId], (err, data) => {
    if (err) return res.status(500).json("Database error: " + err.message);
    return res.json("Accommodation has been deleted");
  })
}

export const addAccomm = (req, res) => {
    const q = "INSERT INTO accommodations( `Accommodation_Title`, `Accommodation_Desc`, `Accommodation_Cap`, `Accommodation_Price`, `Accommodation_Unit`, `Accommodation_Type`, `Accommodation_Img`) VALUES (?)";

    const values = [
      req.body.accommTitle,
      req.body.accommDesc,
      req.body.accommCap,
      req.body.accommPrice,
      req.body.accommUnit,
      req.body.accommType,
      req.body.accommImg,
    ];
    
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("Database error: " + err.message);
      return res.json("Accommodation has been added");
    })

}

export const updateAccomm = (req, res) => {
  const q = "UPDATE accommodations SET `Accommodation_Title`=?, `Accommodation_Img`= ?, `Accommodation_Type`=?, `Accommodation_Desc`=?, `Accommodation_Cap`=?, `Accommodation_Price`=? , `Accommodation_Unit`=? WHERE `Accommodation_Id`=?";

  const accommId = req.params.id;
  const values = [
    req.body.accommTitle,
    req.body.accommImg,
    req.body.accommType,
    req.body.accommDesc,
    req.body.accommCap,
    req.body.accommPrice,
    req.body.accommUnit,
  ];

  db.query(q, [...values, accommId], (err, data) => {
    if (err) return res.status(500).json("Database error: " + err.message);
    return res.json("Accommodation has been updated");
  })
}