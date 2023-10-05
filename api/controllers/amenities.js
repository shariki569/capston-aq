import { db } from "../db.js";

export const getAmenities = (req, res) => {
    const q = "SELECT * FROM amenities";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}


export const deleteAmenity = (req, res) => {

    const amenityId = req.params.id;
    const q = "DELETE FROM amenities WHERE `Amenity_Id` = ?"

    db.query(q, [amenityId], (err, data) => {
        if (err) return res.status(500).json("Error Deleting" + err.message);
        return res.json("Amenity Deleted")
    })

};