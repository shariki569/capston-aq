import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useLocation, useNavigate } from "react-router-dom";

import placeholder from "../../../img/placeholder-image.webp";
import TextArea from "../../../forms/FormFields/TextArea";
import { upload } from "../../../../Hooks/imageHandling";
import AboutSections from "../AboutSections";
import SectionEditor from "../SectionEditor";
import { useAboutPageData } from "../../../../API/fetchPage";
const Pages1 = () => {
  const [editMode, setEditMode] = useState(false);
  const state = useLocation.state;
  const { pageData } = useAboutPageData()
  const [pageSections, setPageSections] = useState(pageData?.sections || []);
  const [previewImages, setPreviewImages] = useState(
    pageData?.sections.map(() => null) || []
  );


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



  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {

  //     const updatedPageSections = pageSections.map(async (section) => {
  //       if (section.SectionImage instanceof File) {
  //         const newImageUrl = await upload(section.SectionImage);
  //         return { ...section, SectionImage: newImageUrl };
  //       }
  //       return section;
  //     })

  //     const updatedSections = await Promise.all(updatedPageSections);

  //     await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/pages/update-about-us`, {

  //       sections: updatedSections,
  //     });
  //     navigate(`/${state.Slug}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



  return (
    <div>
      <div className="add">
        {editMode ? (
          <div className="content">
            <div className="container">
              <h2>Edit Page</h2>
              <h1>About Us</h1>
            </div>
            <div className="container">
              <h2>Sections</h2>
              <div className="page-sections">
                {pageSections?.map((section, index) =>
                  <SectionEditor
                    key={index}
                    section={section}
                    index={index}
                    handleSectionChange={handleSectionChange}
                    handleImageChange={handleImageSelection}
                    removeSelectedImage={removeSelectedImage}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="content">
            <div className="container">
              <h2>Edit Page</h2>
              <h1>About Us</h1>
            </div>
            <div className="container">
              <h2>Sections</h2>
              <AboutSections data={pageData} />
            </div>
          </div>
        )}
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
              {editMode ? (
                <>
                  <button type="button" className="btn"  >
                    Update
                  </button>
                  <button type="button" className="btn" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" className="btn" onClick={() => setEditMode(true)}>
                  Edit
                </button>
              )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages1;
