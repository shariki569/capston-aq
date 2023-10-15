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
import moment from 'moment'


const Add_Facility = () => {

  const state = useLocation().state
  const [facility, setFacilities] = useState({
    fac_title: state?.Fac_Title || "",
    fac_desc: state?.Fac_Desc || "",
    // file: null,
    featuredImg: null,
    // existingImage: state?.Fac_Img || null,
    previewFeaturedImage: null,
    galleryImages: [],
    galleryImagePreviews: []
  })
  // const [facility, setFacilities] = useState({
  //   fac_title: state?.Fac_Title || "",
  //   fac_desc: state?.Fac_Desc || "",
  //   file: null,
  //   existingImage: state?.Fac_Img || null,
  //   previewImage: null,
  //   galleryImages: [],
  //   galleryImagePreviews: []
  // })

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFacilities((prevFacilities) => ({
        ...prevFacilities,
        featuredImg: selectedFile,
        previewFeaturedImage: URL.createObjectURL(selectedFile)
      }));
    }
  };
  const handleGalleryImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);

      const updatedGalleryImages = selectedImages.map((selectedImage) => ({
        file: selectedImage,
        preview: URL.createObjectURL(selectedImage),
      }));

      setFacilities((prevFacilities) => ({
        ...prevFacilities,
        galleryImages: [...prevFacilities.galleryImages, ...updatedGalleryImages],
        galleryImagePreviews: [
          ...prevFacilities.galleryImagePreviews,
          ...updatedGalleryImages.map((image) => image.preview),
        ],
      }));
    }
  };

  const removeFeaturedImage = () => {
    setFacilities((prevFacilities) => ({
      ...prevFacilities, featuredImg: null,
      previewFeaturedImage: null
    }))
  }

  const removeGalleryImage = (index) => {
    if (facility.galleryImages.length > 0) {
      const updatedGalleryImages = [...facility.galleryImages];
      updatedGalleryImages.splice(index, 1)
      setFacilities((prevFacilities) => ({
        ...prevFacilities,
        galleryImages: updatedGalleryImages,
        galleryImagePreviews: updatedGalleryImages.map((image) => image.preview)
      }))
    }
  }

  // const removeSelectedImage = (index) => {
  //   if (index === -1) {
  //     setFacilities((prevFacilities) => ({
  //       ...prevFacilities,
  //       featuredImg: null,
  //       previewFeaturedImage: null
  //     }));
  //   } else if (facility.galleryImages.length > 0) {
  //     const updatedGalleryImages = [...facility.galleryImages];
  //     updatedGalleryImages.splice(index, 1);
  //     setFacilities((prevFacilities) => ({
  //       ...prevFacilities,
  //       galleryImages: updatedGalleryImages,
  //       galleryImagePreviews: updatedGalleryImages.map((image) => image.preview)
  //     }));
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault()
    const imgUrl = facility.featuredImg ? await upload(facility.featuredImg) : null;
    const galleryUrls = await Promise.all(
      facility.galleryImages.map((image) => upload(image.file))
    );

    try {
      state
        ?
        await axios.patch(`/api/facilities/${state.Fac_Id}`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          featuredImg: facility.featuredImg ? imgUrl : facility.featuredImg,
          gallery_imgs: galleryUrls ? galleryUrls : [],
        })
        : await axios.post(`/api/facilities/`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          fac_date: moment(Date.now()).format('YYYY-MM-DD'),
          featured_img: imgUrl,
          gallery_imgs: galleryUrls,

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
            file={facility.featuredImg}
            existingImage={facility.featuredImg}
            previewImage={facility.previewFeaturedImage}
            removeSelectedImage={removeFeaturedImage}
            handleImageChange={handleImageChange}
          />


          <ImageGalleryUploader
            galleryImages={facility.galleryImages}
            handleGalleryImageChange={handleGalleryImageChange}
            removeImageItem={removeGalleryImage}
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
