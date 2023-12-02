import React from 'react'
import ImageUploader from '../../util/ImageUploader'
import TextInput from '../../forms/FormFields/TextInput'
import TextArea from '../../forms/FormFields/TextArea'
// import './aboutSection.scss'
import placeholder from "../../../img/placeholder-image.webp";
const SectionEditor = ({ section, onSectionChange, previewImages, handleImageChange, index }) => {


  return (
    <div className='section-editor'>
      <div className="img-preview">
        {previewImages ? (
          <div className="thumbnail full">
            <img className='full-img' src={previewImages} alt="" />
          </div>
        ) : section.About_Img ? (
          <div className="thumbnail full">
            <img className='full-img' src={section.About_Img.startsWith('http') ? section.About_Img : `/upload/${section.About_Img}`} alt="" />
          </div>
        ) : (
          <div className="thumbnail full">
            <img className='full-img' src={placeholder} alt="placeholder" />
          </div>
        )}

        <div className="img-button">
          <input style={{ display: "none" }} type="file" id={`file-${index}`} onChange={handleImageChange} />
          <label htmlFor={`file-${index}`} className='file' encType="multipart/form-data">{section.About_Img ? "Change Image" : "Upload"}</label>
        </div>
      </div>

      <TextInput
        value={section.About_Heading}
        onChange={(e) => {
          onSectionChange(index, 'SectionHeading', e.target.value);
        }}
        label="Title"
        placeholder="Enter Title Here"
        containerClass="about-section-title"
      />

      <TextArea
        label="Description"
        value={section.About_Content}
        onChange={(e) => {
          onSectionChange(index, 'SectionContent', e.target.value);
        }}
        rows={10}
        placeholder="Enter Text Here"
      />
    </div>
  )
}

export default SectionEditor
