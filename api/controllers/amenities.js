import { db } from "../db.js";

export const getAmenities = async (req, res) => {
  try {
    const connection = await db.getConnection(); // Use the promise-based API

    const [rows] = await connection.query("SELECT * FROM amenities");
    connection.release();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json("Internal server error");
  }
};

export const deleteAmenity = (req, res) => {
  const amenityId = req.params.id;
  const q = "DELETE FROM amenities WHERE `Amenity_Id` = ?";

  db.query(q, [amenityId], (err, data) => {
    if (err) return res.status(500).json("Error Deleting" + err.message);
    return res.json("Amenity Deleted");
  });
};
