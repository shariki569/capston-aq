import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TextInput from '../../forms/FormFields/TextInput'
import ReactQuill from 'react-quill'
import placeholder from '../../../img/placeholder-image.webp'
import TextArea from '../../forms/FormFields/TextArea'
import { upload } from '../../../Hooks/imageHandling'
import ImageUploader from '../../util/ImageUploader'
import axios from 'axios'
import ImageGalleryUploader from '../../util/ImageGalleryUploader'

const Add_Facility = () => {

  const state = useLocation().state
  const [facility, setFacilities] = useState({
    fac_title: state?.Fac_Title || "",
    fac_desc: state?.Fac_Desc || "",
    file: null,
    existingImage: state?.Fac_Img || null,
    previewImage: null,
    galleryImages: [],
    galleryImagePreviews: []
  })

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFacilities({ ...facility, file: selectedFile, previewImage: URL.createObjectURL(selectedFile) })
    }
  }
  const handleGalleryImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);
      const previewUrls = [];
  
      // Create a function to read each selected image and generate a preview URL
      const readAndPreview = (image) => {
        const reader = new FileReader();
  
        reader.onload = (e) => {
          previewUrls.push(e.target.result);
  
          // If the number of preview URLs matches the number of selected images, update the state
          if (previewUrls.length === selectedImages.length) {
            const updatedGalleryImages = selectedImages.map((selectedImage, index) => ({
              file: selectedImage,
              preview: previewUrls[index],
            }));
  
            setFacilities((prevFacilities) => ({
              ...prevFacilities,
              galleryImages: [...prevFacilities.galleryImages, ...updatedGalleryImages],
            }));
          }
        };
  
        reader.readAsDataURL(image);
      };
  
      // Read and preview each selected image
      selectedImages.forEach(readAndPreview);
    }
  };

  
  const removeSelectedImage = (index) => {
    if (facility.file) {
      setFacilities({ ...facility, file: null, previewImage: null })
    } else if (facility.existingImage) {
      setFacilities({ ...facility, existingImage: null, previewImage: null })
    } else if (facility.galleryImages.length > 0) {
      const updatedGalleryImages = [...facility.galleryImages];
        updatedGalleryImages.splice(index, 1 );
        setFacilities({ ...facility, galleryImages: updatedGalleryImages })
      
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const imgUrl = facility.file ? await upload(facility.file) : facility.existingImage;


    try {
      state
        ?
        await axios.patch(`/api/facilities/${state.Fac_Id}`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          fac_img: facility.file ? imgUrl : facility.existingImage,
        })
        : await axios.post(`/api/facilities/`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          featured_img: facility.file ? imgUrl : "",
          gallery_imgs: facility.galleryImages.map((image) => image.file.name),

        })

      navigate('/dashboard/facilities')
    } catch (err) {
      console.log(err, "cannot post")
    }
  }




  return (
    <>
      <div className='add'>
        <div className="content">
          <span><Link to='/dashboard/facilities/'>Back</Link></span>
          <TextInput
            type='text'
            label='Title'
            value={facility.fac_title}
            onChange={(e) => setFacilities({ ...facility, fac_title: e.target.value })}
          />

          <TextArea
            rows={10}
            cols={100}
            value={facility.fac_desc}
            onChange={(e) => setFacilities({ ...facility, fac_desc: e.target.value })}
            label="Description"
          />

        </div>
        <div className="menu">
          <div className='item'>
            <h1>Publish</h1>
          </div>
          <ImageUploader
            file={facility.file}
            existingImage={facility.existingImage}
            previewImage={facility.previewImage}
            removeSelectedImage={removeSelectedImage}
            handleImageChange={handleImageChange}
          />


          <ImageGalleryUploader
            galleryImages={facility.galleryImages}
            handleGalleryImageChange={handleGalleryImageChange}
            removeImageItem={removeSelectedImage}
          />

          <div className="buttons">
            <button onClick={handleClick}>Publish</button>
            <button>Save as a Draft</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Add_Facility
