import React, { useRef } from 'react'
import placeholder from '../../img/placeholder-image.webp';
import placeholder2 from '../../img/addGallery.png';
import { FiXSquare } from 'react-icons/fi';
const ImageGalleryUploader = ({ galleryImages, handleGalleryImageChange, removeImageItem, }) => {
    const galleryImagesArray = Array.isArray(galleryImages) ? galleryImages : [];
    const inputRef = useRef(null);

    return (
        <>
            <div className="img-gallery-preview">
                <div className="thumbnail thumbnail-btn">
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        id="galleryInput"
                        onChange={handleGalleryImageChange}
                        multiple
                        ref={inputRef}
                    />
                    <label htmlFor="galleryInput" className="file" encType="multipart/form-data">
                        <img className='thumbnail-img' src={placeholder} alt="" />
                    </label>
                </div>

                {galleryImagesArray.length > 0 ? (
                    galleryImagesArray.map((galleryImage, index) => (
                        <div className='thumbnail' key={index}>
                            <img src={galleryImage.preview} alt="thumb" />
                            <button onClick={() => removeImageItem(index)}>
                                <FiXSquare size={20} />
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="thumbnail">
                      
                    </div>
                )}
            </div>
        </>
    );
};
export default ImageGalleryUploader