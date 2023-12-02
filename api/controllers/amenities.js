import { db } from "../db.js";

export const getAmenities = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Use the promise-based API

    const [rows] = await connection.query("SELECT * FROM amenities WHERE Is_deleted = 0");
    connection.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json("Internal server error");
  }
};

export const deleteAmenity = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const amenityId = req.params.id;

    const checkAmen = 'SELECT `Is_Deleted` FROM `amenities` WHERE `Amenity_Id` = ?';
    const [result] = await connection.query(checkAmen, [amenityId]);

    if (result.length > 0 && result[0].Is_Deleted === 1) {
      return res.status(400).json({ message:"Amenity Already Deleted"});
    }

    const q = "UPDATE `amenities` SET `Is_deleted` = 1 WHERE `Amenity_Id` = ?";
    const [amenity] = await connection.query(q, [amenityId]);
    return res.status(200).json("Amenity Deleted");
  } catch (err) {
    return res.status(500).json("Error Deleting" + err.message);

  } finally {
    connection.release();
  }

};

export const addAmenity = async (req, res) => {
  try {

    const connection = await db.getConnection();
    const q = 'INSERT INTO `amenities` (`Amenity_Title`, `Amenity_Img`) VALUES (?)';
    // const { Amen_Title, Amen_Img } = req.body;
    const values = [
      req.body.Amen_Title,
      req.body.Amen_Img
    ]

    const [rows] = await connection.query(q, [values]);
    connection.release();

    return res.status(200).json('Amenity has been added');
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json("Internal server error");
  }
}

export const updateAmenity = async (req, res) => {
  try {
    const connection = await db.getConnection();

    const q = 'UPDATE amenities SET `Amenity_Title` = ?, `Amenity_Img` = ? WHERE `Amenity_Id` = ?';
    const amen_id = req.params.id;
    const values = [
      req.body.Amen_Title,
      req.body.Amen_Img,
      amen_id
    ]

    const [rows] = await connection.query(q, values);
    connection.release();
    return res.status(200).json('Amenity has been updated');
  } catch (err) {
    return res.status(500).json("Error Updating" + err.message);
  }
}