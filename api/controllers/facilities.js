import { db } from "../db.js";
import { idGenerator } from "../idGenerator/index.js";

// export const getFacilities = (req, res) => {
//   const q = "SELECT * FROM facilities";
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json(err);
//     return res.status(200).json(data);
//   });
// };

export const getFacilitiesWithImages = async (req, res) => {
  const q = `SELECT
  f.Fac_Id,
  f.Fac_Title,
  f.Fac_Desc,
  f.Fac_Date,
  i.Featured_Image AS Featured_Image,
  g.Gallery_Images AS Gallery_Images
FROM
  facilities f
 
LEFT JOIN (  SELECT Fac_Id, GROUP_CONCAT(FacImg_Name) AS Featured_Image FROM
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
  f.Fac_Id = g.Fac_Id
  
  WHERE f.Is_Deleted = 0`;

try {
    const [data] = await db.query(q);
    
    const facilitiesWithImages = [];

    data.forEach((facility) => {
      const {
        Fac_Id,
        Fac_Title,
        Fac_Desc,
        Fac_Date,
        Featured_Image,
        Gallery_Images,
      } = facility;

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
          Fac_Date,
          Featured_Image,
          Gallery_Images: Gallery_Images ? Gallery_Images.split(",") : [],
        });
      } else if (Gallery_Images) {
        // If the facility exists, add the images to its Images array
        existingFacility.Gallery_Images.push(Gallery_Images);
      }
    });

    return res.status(200).json(facilitiesWithImages);
} catch (err) {
    return res.status(500).json(err);
}
};

export const addFacility = async (req, res) => {
  const { fac_title, fac_desc, fac_date, featured_img, gallery_imgs } = req.body;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const Id = idGenerator();

    // Insert facility
    const insertFacilityQuery =
      'INSERT INTO facilities (`Fac_Id`,`Fac_Title`, `Fac_Desc`, `Fac_Date`) VALUES (?, ?, ?, ?)';
    const facilityValues = [Id, fac_title, fac_desc, fac_date];

    await connection.query(insertFacilityQuery, facilityValues);

    // Insert featured image
    if (featured_img) {
      const insertFeaturedImgQuery =
        'INSERT INTO facility_images (`Fac_Id`,`FacImg_Name`,`Is_Featured`) VALUES (?, ?, 1)';
      await connection.query(insertFeaturedImgQuery, [Id, featured_img]);
    }

    // Insert gallery images
    if (gallery_imgs && gallery_imgs.length > 0) {
      const galleryImgValues = gallery_imgs.map((filename) => [Id, filename, 0]);

      const insertGalleryImagesQuery =
        'INSERT INTO facility_images (`Fac_Id`,`FacImg_Name`,`Is_Featured` ) VALUES ?';
      await connection.query(insertGalleryImagesQuery, [galleryImgValues]);
    }

    await connection.commit();
    return res.json('Facility has been added');
  } catch (error) {
    await connection.rollback();
    console.error('Database error:', error);
    return res.status(500).json('Database error: ' + error.message);
  } finally {
    connection.release();
  }
};


export const updateFacility = async (req, res) => {
  try {
    const facId = req.params.id;
    const { fac_title, fac_desc, featured_img, gallery_imgs } = req.body;

    // Define the SQL query to update facility title and description
    const updateFacilityQuery = `
      UPDATE facilities
      SET Fac_Title = ?, Fac_Desc = ?
      WHERE Fac_Id = ?;
    `;

    // Execute the query to update facility title and description
    const [updateFacilityResult] = await db.query(updateFacilityQuery, [fac_title, fac_desc, facId]);

    if (updateFacilityResult.affectedRows < 1) {
      return res.status(404).json('Facility not found or not updated');
    }

    // Handle gallery images
    const existingGalleryImagesQuery = `
      SELECT FacImg_Name
      FROM facility_images
      WHERE Fac_Id = ?;
    `;

    const [existingGalleryImages] = await db.query(existingGalleryImagesQuery, [facId]);

    const existingGalleryImgs = existingGalleryImages.map((img) => img.FacImg_Name);

    const imagesToRemove = existingGalleryImgs.filter((img) => !gallery_imgs.includes(img));

    if (imagesToRemove.length > 0) {
      const removeImagesQuery = `
        DELETE FROM facility_images
        WHERE Fac_Id = ? AND FacImg_Name IN (?);
      `;

      await db.query(removeImagesQuery, [facId, imagesToRemove]);
    }

    const imagesToAdd = gallery_imgs.filter((img) => !existingGalleryImgs.includes(img));

    if (imagesToAdd.length > 0) {
      const insertGalleryImagesQuery = `
        INSERT INTO facility_images (Fac_Id, FacImg_Name, Is_Featured)
        VALUES ?;
      `;

      const insertGalleryValues = imagesToAdd.map((filename) => [facId, filename, 0]);

      await db.query(insertGalleryImagesQuery, [insertGalleryValues]);
    }

    // Handle featured image
    const updateFeaturedImgQuery = `
      UPDATE facility_images
      SET Is_Featured = 0
      WHERE Fac_Id = ?;
    `;

    await db.query(updateFeaturedImgQuery, [facId]);

    if (featured_img) {
      const insertFeaturedImgQuery = `
        INSERT INTO facility_images (Fac_Id, FacImg_Name, Is_Featured)
        VALUES (?, ?, 1);
      `;

      const insertFeaturedImgValues = [facId, featured_img];

      await db.query(insertFeaturedImgQuery, insertFeaturedImgValues);
    }

    return res.json('Facility has been updated');
  } catch (err) {
    console.error('Error during facility update:', err);
    return res.status(500).json(err);
  }
};
// ! do not DELETE THIISS!!!!
// export const updateFacility = (req, res) => {
//   const facId = req.params.id;
//   const { fac_title, fac_desc, featured_img, gallery_imgs } = req.body;

//   const updateFacilityQuery =
//     "UPDATE facilities SET `Fac_Title` = ?, `Fac_Desc` = ? WHERE `Fac_Id` = ?";
//   const updateFacilityValues = [fac_title, fac_desc, facId];
//   db.query(updateFacilityQuery, updateFacilityValues, (error) => {
//     if (error) {
//       return res.status(500).json("Database error: " + error.message);
//     }

//     handleGalleryImages();
//   });

//   function handleGalleryImages() {
//     if (gallery_imgs && gallery_imgs.length > 0) {
//       const existingGalleryImagesQuery =
//         "SELECT `FacImg_Name` FROM facility_images WHERE `Fac_Id` = ?";
//       db.query(
//         existingGalleryImagesQuery,
//         [facId],
//         (error, existingGalleryImages) => {
//           if (error) {
//             return res.status(500).json("Database error: " + error.message);
//           }

//           const existingGalleryImgs = existingGalleryImages.map(
//             (img) => img.FacImg_Name
//           );

//           // Remove images that are not present in the updated gallery_imgs array
//           const imagesToRemove = existingGalleryImgs.filter(
//             (img) => !gallery_imgs.includes(img)
//           );
//           if (imagesToRemove.length > 0) {
//             const removeImagesQuery =
//               "DELETE FROM facility_images WHERE `Fac_Id` = ? AND `FacImg_Name` IN (?)";
//             db.query(removeImagesQuery, [facId, imagesToRemove], (error) => {
//               if (error) {
//                 return res.status(500).json("Database error: " + error.message);
//               }

//               insertNewGalleryImages();
//             });
//           } else {
//             insertNewGalleryImages();
//           }
//         }
//       );
//     } else {
//       handleFeaturedImage();
//     }
//   }

//   function insertNewGalleryImages() {
//     if (gallery_imgs && gallery_imgs.length > 0) {
//       const existingGalleryImagesQuery =
//         "SELECT `FacImg_Name` FROM facility_images WHERE `Fac_Id` = ?";
//       db.query(
//         existingGalleryImagesQuery,
//         [facId],
//         (error, existingGalleryImages) => {
//           if (error) {
//             return res.status(500).json("Database error: " + error.message);
//           }

//           const existingGalleryImgs = existingGalleryImages.map(
//             (img) => img.FacImg_Name
//           );

//           // Add new images that are not already present in the existing gallery
//           const imagesToAdd = gallery_imgs.filter(
//             (img) => !existingGalleryImgs.includes(img)
//           );
//           if (imagesToAdd.length > 0) {
//             const insertGalleryImagesQuery =
//               "INSERT INTO facility_images (`Fac_Id`, `FacImg_Name`, `Is_Featured`) VALUES ?";
//             const insertGalleryValues = imagesToAdd.map((filename) => [
//               facId,
//               filename,
//               0,
//             ]);
//             db.query(
//               insertGalleryImagesQuery,
//               [insertGalleryValues],
//               (error) => {
//                 if (error) {
//                   return res
//                     .status(500)
//                     .json("Database error: " + error.message);
//                 }

//                 handleFeaturedImage();
//               }
//             );
//           } else {
//             handleFeaturedImage();
//           }
//         }
//       );
//     } else {
//       handleFeaturedImage();
//     }
//   }

//   function handleFeaturedImage() {
//     if (featured_img) {
//       const updateFeaturedImgQuery =
//         "UPDATE facility_images SET `Is_Featured` = 0 WHERE `Fac_Id` = ?";
//       db.query(updateFeaturedImgQuery, [facId], (error) => {
//         if (error) {
//           return res.status(500).json("Database error: " + error.message);
//         }

//         const insertFeaturedImgQuery =
//           "INSERT INTO facility_images (`Fac_Id`, `FacImg_Name`, `Is_Featured`) VALUES (?, ?, 1)";
//         const insertFeaturedImgValues = [facId, featured_img];
//         db.query(insertFeaturedImgQuery, insertFeaturedImgValues, (error) => {
//           if (error) {
//             return res.status(500).json("Database error: " + error.message);
//           }

//           return res.json("Facility has been updated");
//         });
//       });
//     } else {
//       return res.json("Facility has been updated");
//     }
//   }
// };
//! --------------!!

export const deleteFacility = (req, res) => {
  const facId = req.params.id;
  const q = "UPDATE facilities SET `Is_Deleted` = 1 WHERE `Fac_Id` = ?";

  db.query(q, [facId], (err, data) => {
    if (err) return res.status(500).json("Database error: " + err.message);
    return res.json("Facility has been deleted");
  });
};
