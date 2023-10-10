import { db } from "../db.js";
import { idGenerator } from "../idGenerator/index.js";

export const getFacilities = (req, res) => {
  const q = "SELECT * FROM facilities";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getFacilitiesWithImages = (req, res) => {

  const  q = `SELECT
  f.Fac_Id,
  f.Fac_Title,
  f.Fac_Desc,
  i.Featured_Image AS Featured_Image,
  g.Gallery_Images AS Gallery_Images
FROM
  facilities f
LEFT JOIN (
  SELECT
    Fac_Id,
    GROUP_CONCAT(FacImg_Name) AS Featured_Image
  FROM
    facility_images
  WHERE
    Is_Featured = 1
  GROUP BY
    Fac_Id
) i
ON
  f.Fac_Id = i.Fac_Id
LEFT JOIN (
  SELECT
    Fac_Id,
    GROUP_CONCAT(FacImg_Name) AS Gallery_Images
  FROM
    facility_images
  WHERE
    Is_Featured = 0
  GROUP BY
    Fac_Id
) g
ON
  f.Fac_Id = g.Fac_Id`;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    const facilitiesWithImages = [];

    data.forEach((facility) => {
      const { Fac_Id, Fac_Title, Fac_Desc,Featured_Image, Gallery_Images } = facility;

      // Find the facility by ID in the result array
      const existingFacility = facilitiesWithImages.find(
        (f) => f.Fac_Id === Fac_Id
      );

      if (!existingFacility) {
        // If the facility doesn't exist in the result array, add it
        facilitiesWithImages.push({
          Fac_Id,
          Fac_Title,
          Fac_Desc,
          Featured_Image,
          Gallery_Images: Gallery_Images ? Gallery_Images.split(",") : [],
        });
      } else if (Gallery_Images) {
        // If the facility exists, add the images to its Images array
        existingFacility.Gallery_Images.push(Gallery_Images);
      }
    });

    return res.status(200).json(facilitiesWithImages);
  });
};

export const addFacility = (req, res) => {
  const { fac_title, fac_desc, featured_img, gallery_imgs } = req.body;

  const qFacility =
    "INSERT INTO facilities (`Fac_Id`,`Fac_Title`, `Fac_Desc`) VALUES (?)";
  const Id = idGenerator();
  const values = [Id, fac_title, fac_desc];

  db.query(qFacility, [values], (err, data) => {
    if (err) {
      return res.status(500).json("Database error: " + err.message);
    }

    if(featured_img){
      const qFeaturedImg = "INSERT INTO facility_images (`Fac_Id`,`FacImg_Name`,`Is_Featured`) VALUES (?,?,1)";
      db.query(qFeaturedImg, [Id, featured_img], (err, data) =>{
        if (err)
        return res.status(500).json("Database err: " + err.message)
      })
    }

    if(gallery_imgs && gallery_imgs.length > 0) {
      const qGalleryImgs = "INSERT INTO facility_images (`Fac_Id`,`FacImg_Name`,`Is_Featured` ) VALUES ?";
      const galleryImgValues = gallery_imgs.map((filename) => [Id, filename, 0])
  
      db.query(qGalleryImgs, [galleryImgValues], (err,data) => {
        if(err)
        return res.status(500).json("Database err: " + err.message)
      })
    }

    // const qImages =
    //   "INSERT INTO facility_images (`Fac_Id`,`FacImg_Name`) VALUES ?";

    // const imageValues = fac_img.map((filename) => [Id, filename]);
    // db.query(qImages, [imageValues], (err, data) => {
    //   if (err) return res.status(500).json("Database error: " + err.message);
    // });

    return res.json("Facility has been added");
  });
};

// export const addFacility = (req, res ) => {
//     const q = "INSERT INTO facilities (`Fac_Id`,`Fac_Title`, `Fac_Desc`, `Fac_Img`  ) VALUES (?)";
//     const Id = idGenerator();
//     const values = [
//         Id,
//         req.body.fac_title,
//         req.body.fac_desc,
//         req.body.fac_img,
//     ];

//     db.query(q, [values], (err, data) => {
//         if (err) return res.status(500).json("Database error: " + err.message);
//         return res.json("Facility has been added");
//     })
// }

export const updateFacility = (req, res) => {
  const q =
    "UPDATE facilities SET `Fac_Title` = ?, `Fac_Desc` = ?, `Fac_Img` = ? WHERE `Fac_Id` = ?";
  const facId = req.params.id;
  const values = [req.body.fac_title, req.body.fac_desc, req.body.fac_img];

  db.query(q, [...values, facId], (err, data) => {
    if (err) return res.status(500).json("Database error: " + err.message);
    return res.json("Facility has been updated");
  });
};

export const deleteFacility = (req, res) => {
  const facId = req.params.id;
  const q = "DELETE FROM facilities WHERE `Fac_Id` = ?";

  db.query(q, [facId], (err, data) => {
    if (err) return res.status(500).json("Database error: " + err.message);
    return res.json("Facility has been deleted");
  });
};
