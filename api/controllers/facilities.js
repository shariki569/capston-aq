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
  f.Fac_Id = g.Fac_Id`;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

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
  });
};

export const addFacility = (req, res) => {
  const { fac_title, fac_desc, fac_date, featured_img, gallery_imgs } =
    req.body;

  const qFacility =
    "INSERT INTO facilities (`Fac_Id`,`Fac_Title`, `Fac_Desc`, `Fac_Date`) VALUES (?)";
  const Id = idGenerator();
  const values = [Id, fac_title, fac_desc, fac_date];

  db.query(qFacility, [values], (err, data) => {
    if (err) {
      return res.status(500).json("Database error: " + err.message);
    }

    if (featured_img) {
      const qFeaturedImg =
        "INSERT INTO facility_images (`Fac_Id`,`FacImg_Name`,`Is_Featured`) VALUES (?,?,1)";
      db.query(qFeaturedImg, [Id, featured_img], (err, data) => {
        if (err) return res.status(500).json("Database err: " + err.message);
      });
    }

    if (gallery_imgs && gallery_imgs.length > 0) {
      const qGalleryImgs =
        "INSERT INTO facility_images (`Fac_Id`,`FacImg_Name`,`Is_Featured` ) VALUES ?";
      const galleryImgValues = gallery_imgs.map((filename) => [
        Id,
        filename,
        0,
      ]);

      db.query(qGalleryImgs, [galleryImgValues], (err, data) => {
        if (err) return res.status(500).json("Database err: " + err.message);
      });
    }
    return res.json("Facility has been added");
  });
};


export const updateFacility = (req, res) => {
  const facId = req.params.id;
  const { fac_title, fac_desc, featured_img, gallery_imgs } = req.body;

  const updateFacilityQuery =
    "UPDATE facilities SET `Fac_Title` = ?, `Fac_Desc` = ? WHERE `Fac_Id` = ?";
  const updateFacilityValues = [fac_title, fac_desc, facId];
  db.query(updateFacilityQuery, updateFacilityValues, (error) => {
    if (error) {
      return res.status(500).json("Database error: " + error.message);
    }

    handleGalleryImages();
  });

  function handleGalleryImages() {
    if (gallery_imgs && gallery_imgs.length > 0) {
      const existingGalleryImagesQuery =
        "SELECT `FacImg_Name` FROM facility_images WHERE `Fac_Id` = ?";
      db.query(
        existingGalleryImagesQuery,
        [facId],
        (error, existingGalleryImages) => {
          if (error) {
            return res.status(500).json("Database error: " + error.message);
          }

          const existingGalleryImgs = existingGalleryImages.map(
            (img) => img.FacImg_Name
          );

          // Remove images that are not present in the updated gallery_imgs array
          const imagesToRemove = existingGalleryImgs.filter(
            (img) => !gallery_imgs.includes(img)
          );
          if (imagesToRemove.length > 0) {
            const removeImagesQuery =
              "DELETE FROM facility_images WHERE `Fac_Id` = ? AND `FacImg_Name` IN (?)";
            db.query(removeImagesQuery, [facId, imagesToRemove], (error) => {
              if (error) {
                return res.status(500).json("Database error: " + error.message);
              }

              insertNewGalleryImages();
            });
          } else {
            insertNewGalleryImages();
          }
        }
      );
    } else {
      handleFeaturedImage();
    }
  }

  function insertNewGalleryImages() {
    if (gallery_imgs && gallery_imgs.length > 0) {
      const existingGalleryImagesQuery =
        "SELECT `FacImg_Name` FROM facility_images WHERE `Fac_Id` = ?";
      db.query(
        existingGalleryImagesQuery,
        [facId],
        (error, existingGalleryImages) => {
          if (error) {
            return res.status(500).json("Database error: " + error.message);
          }

          const existingGalleryImgs = existingGalleryImages.map(
            (img) => img.FacImg_Name
          );

          // Add new images that are not already present in the existing gallery
          const imagesToAdd = gallery_imgs.filter(
            (img) => !existingGalleryImgs.includes(img)
          );
          if (imagesToAdd.length > 0) {
            const insertGalleryImagesQuery =
              "INSERT INTO facility_images (`Fac_Id`, `FacImg_Name`, `Is_Featured`) VALUES ?";
            const insertGalleryValues = imagesToAdd.map((filename) => [
              facId,
              filename,
              0,
            ]);
            db.query(
              insertGalleryImagesQuery,
              [insertGalleryValues],
              (error) => {
                if (error) {
                  return res
                    .status(500)
                    .json("Database error: " + error.message);
                }

                handleFeaturedImage();
              }
            );
          } else {
            handleFeaturedImage();
          }
        }
      );
    } else {
      handleFeaturedImage();
    }
  }

  function handleFeaturedImage() {
    if (featured_img) {
      const updateFeaturedImgQuery =
        "UPDATE facility_images SET `Is_Featured` = 0 WHERE `Fac_Id` = ?";
      db.query(updateFeaturedImgQuery, [facId], (error) => {
        if (error) {
          return res.status(500).json("Database error: " + error.message);
        }

        const insertFeaturedImgQuery =
          "INSERT INTO facility_images (`Fac_Id`, `FacImg_Name`, `Is_Featured`) VALUES (?, ?, 1)";
        const insertFeaturedImgValues = [facId, featured_img];
        db.query(insertFeaturedImgQuery, insertFeaturedImgValues, (error) => {
          if (error) {
            return res.status(500).json("Database error: " + error.message);
          }

          return res.json("Facility has been updated");
        });
      });
    } else {
      return res.json("Facility has been updated");
    }
  }
};

// export const updateFacility = (req, res) => {
//   const facId = req.params.id;
//   const { fac_title, fac_desc, featured_img, gallery_img } = req.body;

//   // Query to get existing gallery images for the facility
//   const qGetExistingGalleryImages = "SELECT `FacImg_Name` FROM facility_images WHERE `Fac_Id` = ?";
//   db.query(qGetExistingGalleryImages, [facId], (err, existingGalleryImages) => {
//     if (err) {
//       return res.status(500).json("Database error: " + err.message);
//     }

//     const existingGalleryImgs = existingGalleryImages.map((img) => img.FacImg_Name);

//     const qUpdateFacility = "UPDATE facilities SET `Fac_Title` = ?, `Fac_Desc` = ? WHERE `Fac_Id` = ?";
//     const updateFacilityValues = [fac_title, fac_desc, facId];

//     db.query(qUpdateFacility, updateFacilityValues, (err, data) => {
//       if (err) {
//         return res.status(500).json("Database error: " + err.message);
//       }

//       if (featured_img) {
//         const qFeaturedImg =
//           "UPDATE facility_images SET `FacImg_Name` = ?, `Is_Featured` = 1 WHERE `Fac_Id` = ? AND `Is_Featured` = 1";
//         const featuredValues = [featured_img, facId];

//         db.query(qFeaturedImg, featuredValues, (err, data) => {
//           if (err) {
//             return res.status(500).json("Database error: " + err.message);
//           }
//         });
//       }

//       if (gallery_img) {
//         // Delete existing gallery images not included in the updated gallery_img array
//         const deleteNonMatchingImage =
//           "DELETE FROM facility_images WHERE `Fac_Id` = ? AND `FacImg_Name` NOT IN (?)";
//         const deleteNonMatchingImageValues = [facId, gallery_img];
//         db.query(
//           deleteNonMatchingImage,
//           [deleteNonMatchingImageValues],
//           (err, data) => {
//             if (err) {
//               return res.status(500).json("Database error: " + err.message);
//             }
//           }
//         );

//         // Insert new gallery images not already in the gallery
//         const insertNewGalleryImg =
//           "INSERT INTO facility_images (`Fac_Id`, `FacImg_Name`, `Is_Featured`) VALUES ?";
//         const insertNewGalleryValues = gallery_img
//           .filter((filename) => !existingGalleryImgs.includes(filename))
//           .map((filename) => [facId, filename, 0]);

//         if (insertNewGalleryValues.length > 0) {
//           db.query(insertNewGalleryImg, [insertNewGalleryValues], (err, data) => {
//             if (err) {
//               return res.status(500).json("Database error: " + err.message);
//             }
//           });
//         }
//       }

//       return res.json("Facility has been updated");
//     });
//   });
// };

// export const updateFacility = (req, res) => {
//   const q =
//     "UPDATE facilities SET `Fac_Title` = ?, `Fac_Desc` = ?, `Fac_Img` = ? WHERE `Fac_Id` = ?";
//   const facId = req.params.id;
//   const values = [req.body.fac_title, req.body.fac_desc, req.body.fac_img];

//   db.query(q, [...values, facId], (err, data) => {
//     if (err) return res.status(500).json("Database error: " + err.message);
//     return res.json("Facility has been updated");
//   });
// };

export const deleteFacility = (req, res) => {
  const facId = req.params.id;
  const q = "DELETE FROM facilities WHERE `Fac_Id` = ?";

  db.query(q, [facId], (err, data) => {
    if (err) return res.status(500).json("Database error: " + err.message);
    return res.json("Facility has been deleted");
  });
};
