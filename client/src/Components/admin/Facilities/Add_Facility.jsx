import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextInput from '../../forms/FormFields/TextInput';
import ReactQuill from 'react-quill';
import placeholder from '../../../img/placeholder-image.webp';
import TextArea from '../../forms/FormFields/TextArea';
import { upload } from '../../../Hooks/imageHandling';
import ImageUploader from '../../util/ImageUploader';
import axios from 'axios';
import ImageGalleryUploader from '../../util/ImageGalleryUploader';
import moment from 'moment';

const Add_Facility = () => {
  const state = useLocation().state;
  const navigate = useNavigate();

  const [facility, setFacility] = useState({
    fac_title: state?.Fac_Title || '',
    fac_desc: state?.Fac_Desc || '',
    file: null,
    featuredImg: state?.Featured_Image || null,
    previewFeaturedImage: null,
    galleryImages: state?.Gallery_Images || [],
    galleryImagePreviews: [],
    galleryFiles: [],
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFacility((prevFacility) => ({
        ...prevFacility,
        file: selectedFile,
        previewFeaturedImage: URL.createObjectURL(selectedFile),
        
      }));
    }
  };

  // const handleGalleryImageChange = (e) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     const selectedImages = Array.from(e.target.files);
  //     const updatedGalleryImages = selectedImages.map((selectedImage) => ({
  //       file: selectedImage,
  //       preview: URL.createObjectURL(selectedImage),
  //     }));
  //     // Merge existing and new gallery images
  //     const allGalleryImages = [...facility.galleryImages, ...updatedGalleryImages];
  //     setFacility((prevFacility) => ({
  //       ...prevFacility,
  //       galleryImages: allGalleryImages,
  //       galleryImagePreviews: allGalleryImages.map((image) => image.preview),
  //     }));
  //   }
  // };

  const handleGalleryImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);
      const newGalleryImages = selectedImages.map((selectedImage) => ({
        file: selectedImage,
        preview: URL.createObjectURL(selectedImage),
      }));
  
      // Concatenate the new gallery images with the existing ones
      const updatedGalleryImages = [...facility.galleryImages, ...newGalleryImages];
      
      setFacility((prevFacilities) => ({
        ...prevFacilities,
        galleryImages: updatedGalleryImages,
      }));
    }
  };
  
  

  const removeFeaturedImage = () => {
    setFacility((prevFacility) => ({
      ...prevFacility,
      featuredImg: null,
      previewFeaturedImage: null,
    }));
  };

  const removeGalleryImage = (index) => {
    if (facility.galleryImages.length > 0) {
      const updatedGalleryImages = [...facility.galleryImages];
      updatedGalleryImages.splice(index, 1);
      setFacility((prevFacility) => ({
        ...prevFacility,
        galleryImages: updatedGalleryImages,
        galleryImagePreviews: updatedGalleryImages.map((image) => image.preview),
      }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const hasNewGalleryImages = facility.galleryImages.some((image) => image.file);

    // Filter out any images that have been removed
    const updatedGalleryImages = facility.galleryImages.filter(
      (image) => image.file || image.url
    );

    // Upload the new gallery images if they exist
    const galleryUrls = hasNewGalleryImages
      ? await Promise.all(
          updatedGalleryImages.map(async (image) =>
            image.file ? await upload(image.file) : image.url
          )
        )
      : updatedGalleryImages.map((image) => image.url);
  
    try {
      state
        ? await axios.patch(`/api/facilities/${state.Fac_Id}`, {
            fac_title: facility.fac_title,
            fac_desc: facility.fac_desc,
            featured_img: facility.file ? await upload(facility.file) : facility.featuredImg,
            gallery_imgs: hasNewGalleryImages ? galleryUrls : facility.galleryImages,
          })
        : await axios.post(`/api/facilities/`, {
            fac_title: facility.fac_title,
            fac_desc: facility.fac_desc,
            fac_date: moment(Date.now()).format('YYYY-MM-DD'),
            featured_img: facility.file ? await upload(facility.file) : "",
            gallery_imgs: hasNewGalleryImages ? galleryUrls : facility.galleryImages,
          });
          
  
      console.log("Existing Gallery Images:", facility.galleryImages);
      navigate('/dashboard/facilities');
    } catch (err) {
      console.log(err, "cannot post");
    }
  };
  

  return (
    <>
      <div className="add">
        <div className="content">
          <span>
            <Link to="/dashboard/facilities/">Back</Link>
          </span>
          <TextInput
            type="text"
            label="Title"
            value={facility.fac_title}
            onChange={(e) => setFacility({ ...facility, fac_title: e.target.value })}
          />
          <TextArea
            rows={10}
            cols={100}
            value={facility.fac_desc}
            onChange={(e) => setFacility({ ...facility, fac_desc: e.target.value })}
            label="Description"
          />
        </div>
        <div className="menu">
          <div className="item">
            <h1>Publish</h1>
          </div>
          <ImageUploader
            file={facility.file}
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
  );
};

export default Add_Facility;
