import { Page } from '../models/Page.js'; // Import the Page model

export const getPages = async (req, res) => {
  try {
    const { title } = req.query;
    const pages = title
      ? await Page.find({ PageTitle: title })
      : await Page.find();

    return res.status(200).json(pages);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getPage = async (req, res) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ Slug: slug }).populate('sections');

    if (!page) return res.status(404).json("Page not found");

    return res.status(200).json(page);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const updatePage = async (req, res) => {
  try {
    const { slug } = req.params;
    const { PageTitle, sections } = req.body;

    if (!PageTitle) {
      return res.status(400).json("Page title is required for updating");
    }

    // Update the page title
    const updatedPage = await Page.findOneAndUpdate(
      { Slug: slug },
      { PageTitle: PageTitle, sections: sections }, // Update the sections as well
      { new: true } // Return the updated document
    );

    if (!updatedPage) return res.status(404).json("Page not found");

    return res.json({ message: "Page and Sections have been updated!", updatedPage });
  } catch (err) {
    return res.status(500).json(err);
  }
};
