import { db } from "../db.js";


export const getPages = async (req, res) => {
  try {
    const title = req.query.title;
    const connection = await db.getConnection();

    let query = 'SELECT * FROM pages';

    const values = [];

    if (title) {
      query = 'SELECT * FROM pages WHERE PageTitle = ?';
      values.push(title);
    }

    const [rows] = await connection.query(query, values);
    connection.release();

    return res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json(error);
  }
};

export const getPage = async (req, res) => {
  try {
    const slug = req.params.slug;
    const connection = await db.getConnection();

    const query = `
      SELECT p.PageId, p.Slug, p.PageTitle, s.SectionId, s.SectionHeading, s.SectionContent, s.SectionImage
      FROM pages p
      LEFT JOIN sections s ON p.PageId = s.Page_Id
      WHERE p.Slug = ?`;

    const [rows] = await connection.query(query, [slug]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json("Page not found");
    }

    const page = {
      PageId: rows[0].PageId,
      Slug: rows[0].Slug,
      PageTitle: rows[0].PageTitle,
      sections: [],
    };

    const sections = {};

    rows.forEach((row) => {
      const sectionId = row.SectionId;
      if (!sections[sectionId]) {
        sections[sectionId] = {
          SectionId: sectionId,
          SectionHeading: row.SectionHeading,
          SectionContent: row.SectionContent,
          SectionImage: row.SectionImage,
        };
      }
    });

    page.sections = Object.values(sections);

    return res.status(200).json(page);
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json(error);
  }
};

export const updatePage = async (req, res) => {
  const { slug } = req.params;
  const { PageTitle, sections } = req.body;

  try {
    if (!PageTitle) {
      return res.status(400).json("Page title is required for updating");
    }

    const connection = await db.getConnection();

    // Get the `PageId` based on the `Slug`
    const qGetPageId = "SELECT PageId FROM pages WHERE Slug = ?";
    const [pageIdRow] = await connection.query(qGetPageId, [slug]);

    if (!pageIdRow) {
      connection.release();
      return res.status(404).json("Page not found");
    }

    const PageId = pageIdRow[0].PageId;

    // Update page Title
    const qUpdatePage = "UPDATE pages SET `PageTitle` = ? WHERE `PageId` = ?";
    await connection.query(qUpdatePage, [PageTitle, PageId]);

    // Update page sections
    const qUpdateSections =
      "UPDATE sections SET `SectionHeading` = ?, `SectionContent` = ?, `SectionImage` = ? WHERE `SectionId` = ? AND `Page_Id` = ?";

    const updateSectionPromises = sections.map(async (section) => {
      const { SectionId, SectionHeading, SectionContent, SectionImage } = section;
      await connection.query(qUpdateSections, [SectionHeading, SectionContent, SectionImage, SectionId, PageId]);
    });

    await Promise.all(updateSectionPromises);

    connection.release();
    res.json({ message: "Page and Sections have been updated!" });
  } catch (err) {
    console.error(err);
    res.status(500).json("Error updating page and sections: " + err.message);
  }
};








// export const updatePage = (req, res) => {
//   const { slug } = req.params;
//   const { PageTitle, sections } = req.body; // Update the destructuring here

//   // Check if the PageTitle exists in the request body
//   if (!PageTitle) {
//     return res.status(400).json("Page title is required for updating");
//   }

//   // Get the `PageId` based on the `Slug`
//   const qGetPageId = "SELECT PageId FROM pages WHERE Slug = ?";
//   db.query(qGetPageId, [slug], (err, result) => {
//     if (err) return res.status(500).json("Error fetching page");

//     // Check if a page with the provided Slug exists
//     if (result.length === 0) {
//       return res.status(404).json("Page not found");
//     }

//     const PageId = result[0].PageId;

//     // Update page Title
//     const qUpdatePage = "UPDATE pages SET `PageTitle`=? WHERE `PageId`=?";
//     db.query(qUpdatePage, [PageTitle, PageId], (err, data) => {
//       if (err) return res.status(500).json("Error updating page");

//       // Update page sections
//       const qUpdateSections =
//         "UPDATE sections SET `SectionHeading` = ?, `SectionContent` = ?, `SectionImage` = ? WHERE `SectionId` = ? AND `Page_Id` = ?";
//       const qUpdateSectionsPromises = sections.map((section) => {
//         const { SectionId, SectionHeading, SectionContent, SectionImage } =
//           section;

//         return new Promise((resolve, reject) => {
//           db.query(
//             qUpdateSections,
//             [
//               SectionHeading, 
//               SectionContent, 
//               SectionImage, 
//               SectionId, 
//               PageId
//             ],
//             (err) => {
//               if (err) reject(err);
//               else resolve();
//             }
//           );
//         });
//       });

//       Promise.all(qUpdateSectionsPromises)
//         .then(() => {
//           res.json({ message: "Page and Sections have been updated!" });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(500).json("Error updating sections: " + err.message);
//         });
//     });
//   });
// };

// export const updatePage1 = (req, res) => {
//   const { slug } = req.params;
//   const { PageTitle, sections } = req.body; // Update the destructuring here

//   // Check if the PageTitle exists in the request body
//   if (!PageTitle) {
//     return res.status(400).json("Page title is required for updating");
//   }

//   // Get the `PageId` based on the `Slug`
//   const qGetPageId = "SELECT PageId FROM pages WHERE Slug = ?";
//   db.query(qGetPageId, [slug], (err, result) => {
//     if (err) return res.status(500).json("Error fetching page");

//     // Check if a page with the provided Slug exists
//     if (result.length === 0) {
//       return res.status(404).json("Page not found");
//     }

//     const PageId = result[0].PageId;

//     // Update page Title
//     const qUpdatePage = "UPDATE pages SET `PageTitle`=? WHERE `PageId`=?";
//     db.query(qUpdatePage, [PageTitle, PageId], (err, data) => {
//       if (err) return res.status(500).json("Error updating page");

//       // Update page sections
//       const qUpdateSections = "UPDATE sections SET `SectionHeading` =? , `SectionContent` =?, `SectionImage`=? WHERE `SectionId`=? AND `Page_Id`=?";
//       const qUpdateSectionsPromises = sections.map((section) => {
//         const sectionId = section.SectionId
//         const sectionValues = [
//           section.SectionHeading,
//           section.SectionContent,
//           section.SectionImage,
//         ]

//         return new Promise((resolve, reject) => {
//           db.query(
//             qUpdateSections,
//             [...sectionValues, PageId, sectionId],
//             (err) => {
//               if (err) reject(err);
//               else resolve();
//             }
//           );
//         });
//       });

//       Promise.all(qUpdateSectionsPromises)
//         .then(() => {
//           res.json({ message: "Page and Sections have been updated!" });
//         })
//         .catch(() => {
//           res.status(500).json("Error updating sections");
//         });
//     });
//   });
// };
