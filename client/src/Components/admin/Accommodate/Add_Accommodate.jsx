import React, { useEffect, useState } from 'react'
import TextInput from '../../forms/FormFields/TextInput'
import ReactQuill from 'react-quill'
import { FiAlertCircle, FiChevronDown, FiCreditCard, FiHash, FiHome, FiUser, FiXSquare } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import placeholder from '../../../img/placeholder-image.webp'
import axios from 'axios'
import moment from 'moment'
import { upload } from '../../../Hooks/imageHandling'
import ImageUploader from '../../util/ImageUploader'
import { DotLoader } from 'react-spinners'
import { slugify } from '../../util/slugify'
import { toast } from 'sonner'
import Modal from '../../ui/Modal/Modal'
// import { useImageUpload } from '../../../Hooks/imageHandling'
const Add_Accommodate = () => {



  const state = useLocation().state
  const [accommTitle, setAccommTitle] = useState(state?.Accommodation_Title || "")
  const [accommDesc, setAccommDesc] = useState(state?.Accommodation_Desc || "")
  const [accommCap, setAccommCap] = useState(state?.Accommodation_Cap || "")
  const [accommPrice, setAccommPrice] = useState(state?.Accommodation_Price || "")
  const [accommNightPrice, setAccommNightPrice] = useState(state?.Accommodation_NightPrice || null)
  const [accommUnit, setAccommUnit] = useState(state?.Accommodation_Unit || "")
  const [selectedAccommType, setSelectedAccommType] = useState(state?.Accommodation_Type || "")
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null) // ! Do not remove THIS!!
  const [accommImg, setAccommImg] = useState(state?.Accommodation_Img || null)
  const [previewImage, setPreviewImage] = useState(null)
  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
      setUnsavedChanges(true)
    }
  }

  const removeSelectedImage = () => {
    if (accommImg) {
      setFile(null)
      setPreviewImage(null);
      setAccommImg(null)
      setUnsavedChanges(true)
    } else if (file) {
      setPreviewImage(null)
      setUnsavedChanges(true)
    }
  }

  const emptyFields = () => {
    if (!accommTitle || !accommDesc || !accommCap || !accommPrice || !accommNightPrice || !accommUnit || !selectedAccommType) {
      return true
    }
    return false
  }

  const handleClick = async e => {
    e.preventDefault()
    setLoading(true)
    const imgUrl = file ? await upload(file) : accommImg;
    emptyFields(state ? '' : toast.error("Please fill in all fields"))

    try {
      state
        ? await axios.patch(`${import.meta.env.VITE_APP_BACKEND_URL}/api/accommodations/${state.Accommodation_Id}`, {
          accommTitle,
          accommSlug: slugify(accommTitle),
          accommDesc,
          accommCap,
          accommPrice,
          accommNightPrice,
          accommUnit,
          accommType: selectedAccommType,
          accommImg: file ?
            imgUrl : accommImg,
        })
        : await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/accommodations/`, {
          accommTitle,
          accommSlug: slugify(accommTitle),
          accommDesc,
          accommCap,
          accommPrice,
          accommNightPrice,
          accommUnit,
          accommType: selectedAccommType,
          accommImg: file ?
            imgUrl : "",
          accommDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });
      navigate("/dashboard/accommodations")
      state ? toast.success(`${accommTitle} has been updated successfully`) : toast.success(`${accommTitle} has been added successfully`);
    } catch (err) {
      setLoading(true)
      toast.error(err.response.data.message)

    } finally {
      setLoading(false)
      setUnsavedChanges(false)
    };
  };

  const handleBack = () => {
    if (unsavedChanges) {
      setShowModal(true)
    } else {
      navigate("/dashboard/accommodations")
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
    <div className='add'>
      <div className="content">
        <span onClick={handleBack} className='add-button'>Back</span>
        <TextInput
          label='Title'
          type="text"
          width={100}
          value={accommTitle}
          placeholder='Title'
          onChange={(e) => {
            setUnsavedChanges(true)
            setAccommTitle(e.target.value)
          }}
        />
        <div className="editorContainer">
          <ReactQuill

            label="Description:"
            className="editor"
            theme='snow'
            value={accommDesc}
            onChange={(content, delta, source, editor) => {
              setAccommDesc(content);
              setUnsavedChanges(true)
            }}
          />
        </div>
      </div>
      <div className="menu">
        <div className="buttons">
          {loading ?
            (<button
              className='btn btn-full btn-loading disabled'
            >
              Publishing...</button>
            ) : (
              <button
                onClick={handleClick}
                className='btn btn-full'
              >
                {state ? 'Update' : 'Publish'}
              </button>
            )}
        </div>
        <div className="item">
          <h1>Publish</h1>
          <ImageUploader
            file={file}
            previewImage={previewImage}
            handleImageChange={handleImageChange}
            removeSelectedImage={removeSelectedImage}
            existingImage={accommImg}
          />
          <div>
            <h1>Accommodation Info</h1>
            <div className="item-container">
              <div className="item-input">
                {/* <span><FiHome size={20} /></span> */}
                <label className='label'>Type</label>
                <div className='radio-input-wrapper'>
                  <div className="radio-input">
                    <input
                      type="radio"
                      checked={selectedAccommType === "Cottage"}
                      value="Cottage"
                      onChange={(e) => {
                        setSelectedAccommType(e.target.value)
                        setUnsavedChanges(true)
                      }}
                    />
                    <label htmlFor='cottage'>Cottage</label>
                  </div>
                  <div className="radio-input">
                    <input
                      type="radio"
                      checked={selectedAccommType === "Room"}
                      value="Room"
                      onChange={(e) => {
                        setSelectedAccommType(e.target.value)
                        setUnsavedChanges(true)
                      }} />
                    <label htmlFor='room'>Room</label>
                  </div>
                </div>
              </div>
              {/* <div className="top-row"> */}
              <div className="item-input">
                {/* <span><FiCreditCard size={20} /></span> */}
                <TextInput
                  type="number"
                  placeholder='Price'
                  value={accommPrice}
                  onChange={(e) => {
                    setAccommPrice(e.target.value)
                    setUnsavedChanges(true)
                  }}
                  width={100}
                  label="Price"
                />
              </div>
              <div className="item-input">
                {/* <span><FiCreditCard size={20} /></span> */}
                <TextInput
                  type="number"
                  placeholder='Night Price'
                  value={accommNightPrice}
                  onChange={(e) => {
                    setAccommNightPrice(e.target.value)
                    setUnsavedChanges(true)
                  }}
                  width={100}
                  label="Night Price"
                />
              </div>
              <div className="item-input">
                {/* <span><FiHash size={20} /></span> */}
                <TextInput
                  type="number"
                  placeholder='No. of Units'
                  value={accommUnit} onChange={(e) => {
                    setAccommUnit(e.target.value)
                    setUnsavedChanges(true)
                  }}
                  width={100}
                  label="No. of Units"
                />
              </div>
              {/* </div> */}
              <div className="full-row">
                <div className="item-input">
                  {/* <span><FiUser size={20} /></span> */}
                  <TextInput
                    type="number"
                    placeholder='Capacity'
                    value={accommCap} onChange={(e) => {
                      setAccommCap(e.target.value)
                      setUnsavedChanges(true)
                    }}
                    width={100}
                    label="Capacity"
                  />
                </div>
              </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_Accommodate
