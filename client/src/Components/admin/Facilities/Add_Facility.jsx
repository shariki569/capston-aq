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
import { toast } from 'sonner';
import Modal from '../../ui/Modal/Modal';
import { FiAlertCircle } from 'react-icons/fi';

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
    loading: false,
    error: null,
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFacility((prevFacility) => ({
        ...prevFacility,
        file: selectedFile,
        previewFeaturedImage: URL.createObjectURL(selectedFile),

      }));
      setUnsavedChanges(true)
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
      setUnsavedChanges(true)
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

  const handleClick = async (e) => {
    e.preventDefault();
    setFacility((prevFacility) => ({
      ...prevFacility,
      loading: true,
    }))
    try {
      let updatedGalleryImages = [...facility.galleryImages];
      if (facility.galleryFiles.length > 0) {
        const uploadedGalleryFiles = await uploadGalleryFiles(facility.galleryFiles);
        updatedGalleryImages = [...updatedGalleryImages, ...uploadedGalleryFiles];
      }
      if (state) {
        await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/facilities/${state.Fac_Id}`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          featured_img: facility.file ? await upload(facility.file) : facility.featuredImg,
          gallery_imgs: updatedGalleryImages,
        });
      } else {
        await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/facilities/`, {
          fac_title: facility.fac_title,
          fac_desc: facility.fac_desc,
          fac_date: moment(Date.now()).format('YYYY-MM-DD'),
          featured_img: facility.file ? await upload(facility.file) : "",
          gallery_imgs: updatedGalleryImages,
        });
      }
      navigate('/dashboard/facilities');
    } catch (err) {
      // console.log(err, "cannot post");
      setFacility((prevFacility) => ({
        ...prevFacility,
        // error: err.err,
        error: toast.error(err.response.data)
      }))
    } finally {
      setFacility((prevFacility) => ({
        ...prevFacility,
        loading: false,
      }))
      toast.success(state ? `Facility Updated Successfully` : `Facility Added Successfully`);
    }
  };

  const handleBack = () => {
    if (unsavedChanges) {
      setShowModal(true)
    } else {
      navigate("/dashboard/facilities")
    }
  }

  const handleConfirmation = (confirm) => {
    if (confirm) {
      setShowModal(false)
      navigate("/dashboard/accommodations")
    } else {
      setShowModal(false)
    }
  }


  return (
    <>
      <div className="add">
        <div className="content">
          <span className='add-button' onClick={handleBack}>
            Back
          </span>
          <TextInput
            type="text"
            label="Title"
            value={facility.fac_title}
            onChange={(e) => {
              setFacility({ ...facility, fac_title: e.target.value })
              setUnsavedChanges(true)
            }}
          />
          <TextArea
            rows={10}
            cols={100}
            value={facility.fac_desc}
            onChange={(e) => {
              setFacility({ ...facility, fac_desc: e.target.value })
              setUnsavedChanges(true)
            }}
            label="Description"
          />
        </div>
        <div className="menu">
          <div className="buttons">
            {facility.loading ? (
              <button className='btn btn-full btn-loading' disabled={true} >Publishing</button>
            ) : (
              <button button className='btn btn-full' onClick={handleClick}>Publish</button>
            )}

          </div>
          <div className="item">
            <h1>Publish</h1>
          </div>

          <ImageUploader
            title="Featured Image"
            file={facility.file}
            existingImage={facility.featuredImg}
            previewImage={facility.previewFeaturedImage}
            removeSelectedImage={removeFeaturedImage}
            handleImageChange={handleImageChange}
            err={facility.error}
          />
          <ImageGalleryUploader
            title="Gallery Images"
            galleryFiles={facility.galleryFiles}
            galleryImages={facility.galleryImages}
            handleGalleryImageChange={handleGalleryImageChange}
            removeImageItem={removeGalleryImage}
          />

        </div>
      </div >
      {showModal && (
        <Modal error={true} symbol={<FiAlertCircle />} dialogMsg='Are you sure you want to go back?' closeModal={() => setShowModal(false)}>
          <div>
            <p>Any unpublish progress or changes from the current action will be lost.</p>
          </div>
          <div className='modal__buttons'>
            <button className='btn btn-err' onClick={() => handleConfirmation(true)}>
              Yes, Unsave Changes
            </button>
            <button className='btn ' onClick={() => handleConfirmation(false)}>
              No
            </button>
          </div>

        </Modal>
      )}
    </>
  );
};

export default Add_Facility;