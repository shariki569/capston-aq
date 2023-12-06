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




export const getAboutUs = async (req, res) => {
  try {
    const connection = await db.getConnection();
    const q = 'SELECT * FROM about_us';
    const [rows] = await connection.query(q);

    connection.release();
    return res.status(200).json(rows);
  } catch (err) {
    // console.log(err);
    res.status(500).json("Internal Server Error",err);
  }
};

export const updateAboutUs = async (req, res) => {
  const { sections } = req.body;
  // console.log('Received sections:', sections);

  try {
    const connection = await db.getConnection();

    const updateSectionPromises = sections.map(async (section) => {
      const { About_Id, SectionHeading, SectionContent, SectionImage } = section;

      // Get the existing values for the About_Id
      const qGetExistingValues = "SELECT * FROM about_us WHERE About_Id = ?";
      const [existingValues] = await connection.query(qGetExistingValues, [About_Id]);

      // Merge the existing values with the updated ones
      const updatedValues = {
        About_Heading: SectionHeading || existingValues[0].About_Heading,
        About_Content: SectionContent || existingValues[0].About_Content,
        About_Img: SectionImage || existingValues[0].About_Img,
      };

      // Update the About Us section
      const qUpdateSection =
        "UPDATE about_us SET About_Heading = ?, About_Content = ?, About_Img = ? WHERE About_Id = ?";
      await connection.query(qUpdateSection, [
        updatedValues.About_Heading,
        updatedValues.About_Content,
        updatedValues.About_Img,
        About_Id,
      ]);
    });

    await Promise.all(updateSectionPromises);

    // Fetch and return the updated records
    const qGetUpdatedRecords = "SELECT * FROM about_us WHERE About_Id IN (?, ?)";
    const [updatedRecords] = await connection.query(qGetUpdatedRecords, [sections[0].About_Id, sections[1].About_Id]);    

    connection.release();
    res.json(updatedRecords);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error updating About Us sections: " + err.message);
  }
};

