import { db } from "../db.js";
import { idGenerator } from "../idGenerator/index.js";

export const getFacilities = (req, res) => {
    const q = "SELECT * FROM facilities";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}


export const addFacility = (req, res ) => {
    const q = "INSERT INTO facilities (`Fac_Id`,`Fac_Title`, `Fac_Desc`, `Fac_Img`  ) VALUES (?)";
    const Id = idGenerator();
    const values = [
        Id,
        req.body.fac_title,
        req.body.fac_desc,
        req.body.fac_img,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Database error: " + err.message);
        return res.json("Facility has been added");
    })
}

export const updateFacility = (req, res) => {
    const q = "UPDATE facilities SET `Fac_Title` = ?, `Fac_Desc` = ?, `Fac_Img` = ? WHERE `Fac_Id` = ?";
   const facId = req.params.id;
    const values = [
        req.body.fac_title,
        req.body.fac_desc,
        req.body.fac_img,
    ];

    db.query(q, [...values, facId], (err, data) => {
        if (err) return res.status(500).json("Database error: " + err.message);
        return res.json("Facility has been updated");
    })
}

export const deleteFacility = (req, res) => {
    
    const facId = req.params.id;
    const q = "DELETE FROM facilities WHERE `Fac_Id` = ?";
    
    db.query(q, [facId], (err, data) => {
        if (err) return res.status(500).json("Database error: " + err.message);
        return res.json("Facility has been deleted");
    })
}