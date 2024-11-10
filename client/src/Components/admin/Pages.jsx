import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from "../forms/FormFields/TextInput";
import placeholder from "../../img/placeholder-image.webp";
import TextArea from "../forms/FormFields/TextArea";
import { upload } from "../../Hooks/imageHandling";
const Pages = () => {
  const [editMode, setEditMode] = useState(false);
  const state = useLocation().state;
 
  const [pageSections, setPageSections] = useState(state?.sections || []);
  const [previewImages, setPreviewImages] = useState(
    state?.sections.map(() => null) || []
  );
  const navigate = useNavigate();

  useEffect(() => {
    // Use a clean-up function to revoke object URLs when unmounting or when sections change.
    return () => {
      previewImages.forEach((previewImage) => {
        if (previewImage) {
          URL.revokeObjectURL(previewImage);
        }
      });
    };
  }, [previewImages]);

  // const uploadImage = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const response = await axios.post("/api/upload", formData);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error Uploading image: ", error);
  //     throw new Error("Image upload failed. Please try again later.");
  //   }
  // };

  const handleSectionChange = async (sectionIndex, field, value) => {
    const updatedSections = [...pageSections];
    if (field === "SectionImage" && value) {
      try {
        const imgUrl = await uploadImage(value);
        updatedSections[sectionIndex][field] = imgUrl;

        // Clean up the previous object URL if it exists
        if (previewImages[sectionIndex]) {
          URL.revokeObjectURL(previewImages[sectionIndex]);
        }

        setPreviewImages((prevImages) => {
          const updatedImages = [...prevImages];
          updatedImages[sectionIndex] = URL.createObjectURL(value);
          return updatedImages;
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      updatedSections[sectionIndex][field] = value;
    }
    setPageSections(updatedSections);
  };

  const handleImageSelection = (sectionIndex, e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const selectedFile = files[0];
      const updatedSections = [...pageSections];
      updatedSections[sectionIndex].SectionImage = selectedFile;
      setPageSections(updatedSections);

      if (selectedFile instanceof Blob || selectedFile instanceof File) {
        // Clean up the previous object URL if it exists
        if (previewImages[sectionIndex]) {
          URL.revokeObjectURL(previewImages[sectionIndex]);
        }

        const updatedImages = [...previewImages];
        updatedImages[sectionIndex] = URL.createObjectURL(selectedFile);
        setPreviewImages(updatedImages);
      } else {
        console.error("Invalid file selected.");
        // Handle the error or provide user feedback as needed.
      }
    } else {
      // Handle the case where no file is selected.
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {

      const updatedPageSections = pageSections.map(async (section) => {
        if (section.SectionImage instanceof File) {
          const newImageUrl = await upload(section.SectionImage);
          return { ...section, SectionImage: newImageUrl };
        }
        return section;
      })

      const updatedSections = await Promise.all(updatedPageSections);

      await axios.put(`/api/pages/${state.Slug}`, {
      
        sections: updatedSections,
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

            <h1>About Us</h1>
            {/* <TextInput
              width={100}
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="Page Title"
            /> */}
          </div>
          <div className="container">
            <h2>Sections</h2>
            {pageSections.map((section, index) => (
              <div className="page-sections" key={index}>

                <h3>Section {index + 1}</h3>
                <div className="page-sections-wrapper">
                  <div className="image-wrapper">
                    <div className="img-preview">
                      {previewImages[index] ? (
                        <div className="thumbnail">
                          <img src={previewImages[index]} alt="" />
                        </div>) :
                        section.SectionImage ? (
                          <div className="thumbnail">
                            <img src={`/upload/${section.SectionImage}`} alt="" />
                          </div>
                        ) : (
                          <div className="thumbnail">
                            <img src={placeholder} alt="placeholder" />
                          </div>
                        )}

                      <div className="img-button">
                        <input style={{ display: "none" }} type="file" id={`file-${index}`} onChange={(e) => handleImageSelection(index, e)} />
                        <label htmlFor={`file-${index}`} className='file' encType="multipart/form-data">{section.SectionImage ? "Change Image" : "Upload"}</label>
                      </div>
                    </div>
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
                    {/* <div className="editorContainer">
                      <ReactQuill
                        className="editor"
                        theme="snow"
                        value={section.SectionContent}
                        onChange={(value) =>
                          handleSectionChange(index, "SectionContent", value)
                        }
                      />

                    </div> */}
                    <TextArea
                      type= 'text'
                      placeholder= 'Put Description'
                      value={section.SectionContent}
                      onChange={(e) => handleSectionChange(index, "SectionContent", e.target.value)}
                      rows={10}
                      cols={60}
                      />

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
