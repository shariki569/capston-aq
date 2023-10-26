import React, { useRef } from 'react'
import placeholder from '../../img/placeholder-image.webp';
import placeholder2 from '../../img/addGallery.png';
import { FiXSquare } from 'react-icons/fi';
const ImageGalleryUploader = ({ galleryImages, handleGalleryImageChange, removeImageItem, galleryFiles, title }) => {
    const galleryImagesArray = Array.isArray(galleryImages) ? galleryImages : [];
    const galleryFilesArray = Array.isArray(galleryFiles) ? galleryFiles : [];

    // const inputRef = useRef(null);

    return (
        <>
            <span>{title}</span>
            <div className="img-gallery-preview">
                <div className="thumbnail thumbnail-btn">
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="galleryInput"
                        onChange={handleGalleryImageChange}
                        multiple
                        // ref={inputRef}
                    />
                    <label htmlFor="galleryInput" className="file" encType="multipart/form-data">
                        <img className='thumbnail-img' src={placeholder} alt="" />
                    </label>
                </div>

                {galleryImagesArray.map((galleryImage, index) => (
                    <div className="thumbnail" key={index}>
                        <img src={`/upload/${galleryImage}`} alt="thumb" />
                        <button onClick={() => removeImageItem(index, "galleryImages")}>
                            <FiXSquare size={20} />
                        </button>
                    </div>
                ))}
                {galleryFilesArray.map((galleryFile, index) => (
                    <div className="thumbnail" key={index}>
                        <img src={galleryFile.preview} alt="thumb" />
                        <button onClick={() => removeImageItem(index, "galleryFiles")}>
                            <FiXSquare size={20} />
                        </button>
                    </div>
                ))}

            </div>
        </>
    );
};
export default ImageGalleryUploader