import React from 'react';
import { FiXSquare } from 'react-icons/fi';
import placeholder from '../../img/placeholder-image.webp';
import ImageGalleryUploader from './ImageGalleryUploader';

const ImageUploader = (props) => {
  const {
    file,
    previewImage,
    handleImageChange,
    removeSelectedImage,
    existingImage,
    title,
    err,
    full,
    index,
  } = props;


  // const galleryImagesArray = Array.isArray(galleryImages) ? galleryImages : [];
  return (
    <>
      <span>{title}</span>
      <div className="img-preview">
        {file ? (
          <div className={ full ? "thumbnail full" : "thumbnail"}>
            <img className={full ? "full-img " :'img'} src={previewImage} alt="thumb" />
            <button onClick={removeSelectedImage}><FiXSquare size={20} /></button>
          </div>
        ) : (
          existingImage ? (
            <div className={ full ? "thumbnail full" : "thumbnail"}>
              <img className={full ? "full-img " : 'img'}  src={existingImage.startsWith('http') ? existingImage : `../../upload/${existingImage}`} alt="thumb" />
              <button onClick={removeSelectedImage}><FiXSquare size={20} /></button>
            </div>
          ) : (
            <div className="thumbnail">
              <img className='img' src={placeholder} alt="placeholder" />
            </div>
          )
        )}

        <div className='img-button'>
          <input style={{ display: "none" }} type="file" id={index ? `file${index}` : 'file'} name="file" accept="image/*" ref={null} onChange={handleImageChange} />
          <label htmlFor={index ? `file${index}` : 'file'} className='file' encType="multipart/form-data">
            {existingImage ? "Change Image" : "Upload"}
          </label>
        </div>
      </div>
      {err && <p className='error'>{err}</p>}
    </>
  );
}

export default ImageUploader;