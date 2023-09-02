import React, { useEffect, useState } from 'react'

const ImageUpload = ({ existingImage, placeholder, onImageChange, onRemoveImage }) => {
    const [file, setFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
   


    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile);
            setPreviewImage(URL.createObjectURL(selectedFile));
        }
    }
    const removeSelectedImage = () => {
        setFile(null);
        setPreviewImage(null);
        onRemoveImage(); // Notify the parent component that the image has been removed
    };


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
                    <label htmlFor="file" className='file' encType="multipart/form-data">{existingImage ? "Change Image" : "Upload"}</label>
                </div>

            </div>
        </>
    )
}

export default ImageUpload
