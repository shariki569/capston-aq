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
    "SELECT PageId,`Slug`, `PageTitle`, `SectionHeading`, `SectionContent` FROM pages p JOIN sections s ON p.PageId = s.Page_Id WHERE Slug = ?";

  db.query(q, [req.params.slug], (err, data) => {
    if (err) return res.status(500).json();
    return res.status(200).json(data[0]);
  });
};

export const updatePage = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const qPages =
      "UPDATE pages SET `title` = ? WHERE `slug`=? AND `pages_uid`= ?";

    const qSection =
      "UPDATE sections SET `heading`=?, `content`=?, `user_id` = ? WHERE `id`=?";

    const pageSlug = req.params.slug;
    const pageValues = [req.body.title, pageSlug, userInfo.id];

    const sectionId = req.params.id;
    const sectionValues = [
      req.body.heading,
      req.body.content,
      userInfo.id,
      sectionId,
    ];

    db.query(qPages, [...pageValues], (err, pageData) => {
      if (err) return res.status(500).json(err);

      db.query(qSection, [...sectionValues], (err, sectionData) => {
        if (err) return res.status(500).json(err);
        return res.json("Page and Section have been updated");
      });
    });
  });
};
