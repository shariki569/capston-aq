import React from 'react';
import { FiXSquare } from 'react-icons/fi';
import placeholder from '../../img/placeholder-image.webp';
// import { useImageUpload } from '../../Hooks/imageHandling';

const ImageUploader = (props) => {
const {
  file, 
  previewImage, 
  handleImageChange, 
  removeSelectedImage, 
  existingImage
} = props;

  return (
    <>
      <div className="img-preview">
        {file ? (
          <div className="thumbnail">
            <img src={previewImage} alt="thumb" />
            <button onClick={removeSelectedImage}><FiXSquare size={20} /></button>
          </div>
        ) : (
          existingImage ? (
            <div className="thumbnail">
              <img src={`/upload/${existingImage}`} alt="thumb" />
            </div>
          ) : (
            <div className="thumbnail">
              <img src={placeholder} alt="placeholder" />
            </div>
          )
        )}

        <div className='img-button'>
          <input style={{ display: "none" }} type="file" id='file' onChange={handleImageChange} />
          <label htmlFor="file" className='file' encType="multipart/form-data">
            {existingImage ? "Change Image" : "Upload"}
          </label>
        </div>
      </div>
    </>
  );
}

export default ImageUploader;