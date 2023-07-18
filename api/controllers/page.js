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

    const sections = {}
    data.forEach(row => {
      const sectionId = row.SectionId
      if (!sections[sectionId]) {
        sections[sectionId] = {
          SectionId: sectionId,
          SectionHeading: row.SectionHeading,
          SectionContent:  row.SectionContent
        };
      };
    });

    page.sections = Object.values(sections);

    return res.status(200).json(page);
});
};

export const updatePage = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
        
      const {slug} = req.params;
      const {title, sections} = req.body;

    //Update page Title
    const qUpdatePage = "UPDATE pages SET `PageTitle`=? WHERE `Slug`=?";
    db.query(qUpdatePage, [title, slug], (err, data) => {
      if(err) return res.status(500).json("Error updating page");

      //update page sections
      const qUpdateSections = "UPDATE sections SET `SectionHeading` =? , `SectionContent` = ? WHERE `SectionId`=? AND `Page_Id`=?";
      const qUpdateSectionsPromises = sections.map((section) => {
        const {sectionId, sectionHeading, sectionContent} = section;

        return new Promise((resolve, reject) => {
          db.query(qUpdateSections, [sectionHeading, sectionContent, sectionId], (err) => {
            if(err) reject(err);
            else resolve();
          });
        });
      });

      Promise.all(qUpdateSectionsPromises) 
        .then(() => {
          res.json({message: "Page and Sections has been Updated!"})
        })
        .catch(()=> {
          res.status(500).json("Error updating sections");
        });
      });
    });
};
