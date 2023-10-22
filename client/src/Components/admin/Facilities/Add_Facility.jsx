import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextInput from '../../forms/FormFields/TextInput';
import ReactQuill from 'react-quill';
import placeholder from '../../../img/placeholder-image.webp';
import TextArea from '../../forms/FormFields/TextArea';
import { upload, uploadGalleryFiles } from '../../../Hooks/imageHandling';
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



  const handleGalleryImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);
      const newGalleryImages = selectedImages.map((selectedImage) => ({
        file: selectedImage,
        preview: URL.createObjectURL(selectedImage),
      }));

      setFacility((prevFacility) => ({
        ...prevFacility,
        galleryFiles: [...prevFacility.galleryFiles, ...newGalleryImages], // Keep galleryFiles for temporary preview
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

  const removeGalleryImage = (index, gallery) => {
    if (gallery === 'galleryImages') {
      const updatedGalleryImages = [...facility.galleryImages];
      updatedGalleryImages.splice(index, 1);

      setFacility((prevFacility) => ({
        ...prevFacility,
        galleryImages: updatedGalleryImages,
        removedProp: 'galleryImages',
      }));
    } else if (gallery === 'galleryFiles') {
      const updatedGalleryFiles = [...facility.galleryFiles];
      updatedGalleryFiles.splice(index, 1);

      setFacility((prevFacility) => ({
        ...prevFacility,
        galleryFiles: updatedGalleryFiles,
        removedProp: 'galleryFiles',
      }));
    }
  }

  // const removeGalleryImage = (index) => {
  //   if (facility.galleryImages.length > 0) {
  //     const updatedGalleryImages = [...facility.galleryImages];
  //     const updatedGalleryFiles = [...facility.galleryFiles];
  //     updatedGalleryImages.splice(index, 1);
  //     updatedGalleryFiles.splice(index, 1);
  //     setFacility((prevFacility) => ({
  //       ...prevFacility,
  //       galleryImages: updatedGalleryImages,
  //       galleryFiles: updatedGalleryFiles,
  //     }));
  //   }
  // };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let updatedGalleryImages = [...facility.galleryImages];
      if (facility.galleryFiles.length > 0) {
        const uploadedGalleryFiles = await uploadGalleryFiles(facility.galleryFiles);
        updatedGalleryImages = [...updatedGalleryImages, ...uploadedGalleryFiles];
      }
      if (state) {
        await axios.put(`/api/facilities/${state.Fac_Id}`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          featured_img: facility.file ? await upload(facility.file) : facility.featuredImg,
          gallery_imgs: updatedGalleryImages,
        });
      } else {
        await axios.post(`/api/facilities/`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          fac_date: moment(Date.now()).format('YYYY-MM-DD'),
          featured_img: facility.file ? await upload(facility.file) : "",
          gallery_imgs: updatedGalleryImages,
        });
      }
      console.log("Existing Gallery Images:", facility.galleryImages);
      navigate('/dashboard/facilities');
    } catch (err) {
      console.log(err, "cannot post");
    }
  };
  console.log("Existing Gallery Images:", facility.galleryImages);
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
            galleryFiles={facility.galleryFiles}
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