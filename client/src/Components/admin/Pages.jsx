import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from "../forms/FormFields/TextInput";
import placeholder from "../../img/placeholder-image.webp";
const Pages = () => {
  const state = useLocation().state;
  const [pageTitle, setPageTitle] = useState(state?.PageTitle || "");
  const [pageSections, setSections] = useState(state?.sections || []);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await axios.post("/api/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }



  const handleSectionChange = (sectionIndex, field, value) => {
    setSections((prevSections) => {
      const updateSections = [...prevSections];
      updateSections[sectionIndex][field] = value;
      return updateSections;
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/pages/${state.Slug}`, {
        PageTitle: pageTitle,
        sections: pageSections,
      });
      navigate(`/${state.Slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="add">
        <div className="content">
          <div className="container">
            <h2>Edit Page</h2>
            <TextInput
              width={100}
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Page Title"
            />
          </div>
          <div className="container">
            <h2>Sections</h2>
            {pageSections.map((section, index) => (
              <div className="page-sections" key={index}>

                <h3>Section {index + 1}</h3>
                <div className="page-sections-wrapper">
                  <div className="image-wrapper">
                    <img src={section.SectionImage} alt="" />
                  </div>

                  <div className="description-wrapper">
                    <TextInput
                      type="text"
                      value={section.SectionHeading}
                      onChange={(e) =>
                        handleSectionChange(index, "SectionHeading", e.target.value)
                      }
                      placeholder="Section Title"
                      width={100}
                    />
                    <div className="editorContainer">
                      <ReactQuill
                        className="editor"
                        theme="snow"
                        value={section.SectionContent}
                        onChange={(value) =>
                          handleSectionChange(index, "SectionContent", value)
                        }
                      />
                    </div>

                  </div>
                </div>


              </div>
            ))}

          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
            <span>
              <b>Status</b> Draft
            </span>
            <span>
              <b>Visibility</b> Public
            </span>
            <div className="buttons">
              <button type="button" onClick={handleUpdate}>
                Update
              </button>
              <button>Save as a Draft</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;
