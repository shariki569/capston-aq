import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPages = (req, res) => {
  const q = req.query.title
    ? "SELECT * FROM pages WHERE PageTitle=?"
    : "SELECT * FROM pages";

  db.query(q, [req.query.title], (err, data) => {
    if (err) {
      return res.status(500).json();
    }
    return res.status(200).json(data);
  });
};

export const getPage = (req, res) => {
  const q =
    "SELECT PageId,`Slug`, `PageTitle`, `SectionId`, `SectionHeading`, `SectionContent` FROM pages p LEFT JOIN sections s ON p.PageId = s.Page_Id WHERE p.Slug = ?";

  db.query(q, [req.params.slug], (err, data) => {
    if (err) return res.status(500).json();
    const page = {
      PageId: data[0].PageId,
      Slug: data[0].Slug,
      PageTitle: data[0].PageTitle,
      sections: [],
    };

    const sections = {};
    data.forEach((row) => {
      const sectionId = row.SectionId;
      if (!sections[sectionId]) {
        sections[sectionId] = {
          SectionId: sectionId,
          SectionHeading: row.SectionHeading,
          SectionContent: row.SectionContent,
        };
      }
    });

    page.sections = Object.values(sections);

    return res.status(200).json(page);
  });
};

export const updatePage = (req, res) => {
  const { slug } = req.params;
  const { PageTitle, sections } = req.body; // Update the destructuring here

  // Check if the PageTitle exists in the request body
  if (!PageTitle) {
    return res.status(400).json("Page title is required for updating");
  }

  // Get the `PageId` based on the `Slug`
  const qGetPageId = "SELECT PageId FROM pages WHERE Slug = ?";
  db.query(qGetPageId, [slug], (err, result) => {
    if (err) return res.status(500).json("Error fetching page");

    // Check if a page with the provided Slug exists
    if (result.length === 0) {
      return res.status(404).json("Page not found");
    }

    const PageId = result[0].PageId;

    // Update page Title
    const qUpdatePage = "UPDATE pages SET `PageTitle`=? WHERE `PageId`=?";
    db.query(qUpdatePage, [PageTitle, PageId], (err, data) => {
      if (err) return res.status(500).json("Error updating page");

      // Update page sections
      const qUpdateSections =
        "UPDATE sections SET `SectionHeading` =? , `SectionContent` = ? WHERE `SectionId`=? AND `Page_Id`=?";
      const qUpdateSectionsPromises = sections.map((section) => {
        const { SectionId, SectionHeading, SectionContent } = section;

        return new Promise((resolve, reject) => {
          db.query(
            qUpdateSections,
            [SectionHeading, SectionContent, SectionId, PageId],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        });
      });

      Promise.all(qUpdateSectionsPromises)
        .then(() => {
          res.json({ message: "Page and Sections have been updated!" });
        })
        .catch(() => {
          res.status(500).json("Error updating sections");
        });
    });
  });
};


// export const updatePage = (req, res) => {
//   const { slug } = req.params;
//   const { PageId, PageTitle, sections } = req.body; // Update the destructuring here

//   // Check if the PageTitle exists in the request body
//   if (!PageTitle) {
//     return res.status(400).json("Page title is required for updating");
//   }

//   // Update page Title
//   const qUpdatePage = "UPDATE pages SET `PageTitle`=? WHERE `Slug`=?";
//   db.query(qUpdatePage, [PageTitle, slug], (err, data) => {
//     if (err) return res.status(500).json("Error updating page");

//     // Update page sections
//     const qUpdateSections =
//       "UPDATE sections SET `SectionHeading` =? , `SectionContent` = ? WHERE `SectionId`=? AND `Page_Id`=?";
//     const qUpdateSectionsPromises = sections.map((section) => {
//       const { SectionId, SectionHeading, SectionContent,  } = section;

//       return new Promise((resolve, reject) => {
//         db.query(
//           qUpdateSections,
//           [SectionHeading, SectionContent, SectionId, PageId],
//           (err) => {
//             if (err) reject(err);
//             else resolve();
//           }
//         );
//       });
//     });

//     Promise.all(qUpdateSectionsPromises)
//       .then(() => {
//         res.json({ message: "Page and Sections have been updated!" });
//       })
//       .catch(() => {
//         res.status(500).json("Error updating sections");
//       });
//   });
// };

// export const updatePage = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) return res.status(401).json("No User Found");

//   jwt.verify(token, "jwtkey", (err) => {
//     if (err) return res.status(403).json("Token is not valid");

//     const { slug } = req.params;
//     const { title, sections } = req.body;

//     //Update page Title
//     const qUpdatePage = "UPDATE pages SET `PageTitle`=? WHERE `Slug`=?";
//     db.query(qUpdatePage, [title, slug], (err, data) => {
//       if (err) return res.status(500).json("Error updating page");

//       //update page sections
//       const qUpdateSections =
//         "UPDATE sections SET `SectionHeading` =? , `SectionContent` = ? WHERE `SectionId`=? AND `Page_Id`=?";
//       const qUpdateSectionsPromises = sections.map((section) => {
//         const { sectionId, sectionHeading, sectionContent } = section;

//         return new Promise((resolve, reject) => {
//           db.query(
//             qUpdateSections,
//             [sectionHeading, sectionContent, sectionId, pageId],
//             (err) => {
//               if (err) reject(err);
//               else resolve();
//             }
//           );
//         });
//       });

//       Promise.all(qUpdateSectionsPromises)
//         .then(() => {
//           res.json({ message: "Page and Sections has been Updated!" });
//         })
//         .catch(() => {
//           res.status(500).json("Error updating sections");
//         });
//     });
//   });
// };
