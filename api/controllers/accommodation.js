import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { idGenerator } from "../idGenerator/index.js";

export const getAccomms = async (req, res) => {
  try {
    const q = req.query.type
      ? "SELECT * FROM accommodations WHERE Accommodation_Type = ? AND Is_Deleted = 0"
      : "SELECT * FROM accommodations WHERE Is_Deleted = 0";

    const connection = await db.getConnection();
    const [rows] = await connection.query(q, [req.query.type]);
    connection.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json("Internal server error");
  }
};

export const getAccomm = async (req, res) => {
  try {
    const q =
      'SELECT Accommodation_Id, Accommodation_Title, Accommodation_Desc, Accommodation_Cap, Accommodation_Price, Accommodation_Unit, Accommodation_Type, Accommodation_Img FROM accommodations WHERE Accommodation_Slug = ? AND Is_Deleted = 0';

    const connection = await db.getConnection();
    const [data] = await connection.query(q, [req.params.slug]);
    connection.release();

    return res.status(200).json(data[0]);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json('Internal server error');
  }
};

export const deleteAccomm = async (req, res) => {
  try {
    const accommId = req.params.id;
    const q = 'UPDATE accommodations SET Is_Deleted = 1 WHERE Accommodation_Id = ?';

    db.query(q, [accommId]);
    return res.status(200).json('Accommodation has been deleted');
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json('Internal server error');
  }
};


export const addAccomm = async (req, res) => {
  try {
    const q =
      "INSERT INTO accommodations (`Accommodation_Id`, `Accommodation_Title`, `Accommodation_Slug`, `Accommodation_Desc`, `Accommodation_Cap`, `Accommodation_Price`, `Accommodation_Unit`, `Accommodation_Type`, `Accommodation_Img`, `Accommodation_Date`) VALUES (?)";

    const Id = idGenerator();

    const values = [
      Id,
      req.body.accommTitle,
      req.body.accommSlug,
      req.body.accommDesc,
      req.body.accommCap,
      req.body.accommPrice,
      req.body.accommUnit,
      req.body.accommType,
      req.body.accommImg,
      req.body.accommDate,
    ];
   

    const connection = await db.getConnection();
    await connection.query(q, [values]);
    connection.release();

    return res.json("Accommodation has been added");
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
};

export const updateAccomm = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const q =
      'UPDATE accommodations SET `Accommodation_Title`=?, `Accommodation_Img`= ?, `Accommodation_Type`=?, `Accommodation_Desc`=?, `Accommodation_Cap`=?, `Accommodation_Price`=? , `Accommodation_Unit`=? WHERE `Accommodation_Id`=?';

    const accommId = req.params.id;
    const values = [
      req.body.accommTitle,
      req.body.accommImg,
      req.body.accommType,
      req.body.accommDesc,
      req.body.accommCap,
      req.body.accommPrice,
      req.body.accommUnit,
      accommId,
    ];
    connection.query(q, values);
    connection.release();
    return res.json('Accommodation has been updated');
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json('Internal server error');
  }
};
