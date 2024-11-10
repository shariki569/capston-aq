import React, { useEffect, useState } from 'react'
import TextInput from '../../forms/FormFields/TextInput'
import ReactQuill from 'react-quill'
import { FiChevronDown, FiCreditCard, FiHash, FiHome, FiUser, FiXSquare } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import placeholder from '../../../img/placeholder-image.webp'
import axios from 'axios'
import moment from 'moment'
import { upload } from '../../../Hooks/imageHandling'
import ImageUploader from '../../util/ImageUploader'
// import { useImageUpload } from '../../../Hooks/imageHandling'
const Add_Accommodate = () => {


 
  const state = useLocation().state
  const [accommTitle, setAccommTitle] = useState(state?.Accommodation_Title || "")
  const [accommDesc, setAccommDesc] = useState(state?.Accommodation_Desc || "")
  const [accommCap, setAccommCap] = useState(state?.Accommodation_Cap || "")
  const [accommPrice, setAccommPrice] = useState(state?.Accommodation_Price || "")
  const [accommUnit, setAccommUnit] = useState(state?.Accommodation_Unit || "")
  const [selectedAccommType, setSelectedAccommType] = useState(state?.Accommodation_Type || "")

  const [file, setFile] = useState(null) // ! Do not remove THIS!!
  const [accommImg, setAccommImg] = useState(state?.Accommodation_Img || null)
  const [previewImage, setPreviewImage] = useState(null)


  // useEffect(() => {
  //   setAccommImg(accommImg);
  // }, [accommImg])

  const navigate = useNavigate();



  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
     setFile(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
      
    }
  }

  const removeSelectedImage = () => {
    if (accommImg) {
      setFile(null)
      setPreviewImage(null);
      setAccommImg(null)
    } else if (accommImg) {
      setPreviewImage(null)
    }
  }


  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = file ? await upload(file) : accommImg;

  try {
      state
        ? await axios.patch(`/api/accommodations/${state.Accommodation_Id}`, {
          accommTitle,
          accommDesc,
          accommCap,
          accommPrice,
          accommUnit,
          accommType: selectedAccommType,
          accommImg: file ?
            imgUrl : accommImg,
        })
        : await axios.post(`/api/accommodations/`, {
          accommTitle,
          accommDesc,
          accommCap,
          accommPrice,
          accommUnit,
          accommType: selectedAccommType,
          accommImg: file ?
            imgUrl : "",
          accommDate: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });
      navigate("/accommodations")
    } catch (err) {
      console.error( err);
    };
  };


  return (
    <div className='add'>
      <div className="content">
        <span><Link to='/dashboard/accommodations/'>Back</Link></span>
        <TextInput
          label='Title'
          type="text"
          width={100}
          value={accommTitle}
          placeholder='Title'
          onChange={(e) => setAccommTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            
            label="Description:"
            className="editor"
            theme='snow'
            value={accommDesc}
            onChange={setAccommDesc}
          />
        </div>
        <h2>Ammenities</h2>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status</b> Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>
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
                <span><FiHome size={20} /></span>
                <div className="dropdown-input">
                  <select className='select-box' value={selectedAccommType} onChange={(e) => setSelectedAccommType(e.target.value)}>
                    <option disabled value="" >Select accommodation type...</option>
                    <option value="Cottage">Cottage</option>
                    <option value="Room">Room</option>
                  </select>
                  <FiChevronDown className='custom-arrow' size={15} />
                </div>
              </div>
              <div className="top-row">
                <div className="item-input">
                  <span><FiCreditCard size={20} /></span>
                  <TextInput
                    type="number"
                    placeholder='Price'
                    value={accommPrice}
                    onChange={(e) => setAccommPrice(e.target.value)}
                    width={100}
                  />
                </div>
                <div className="item-input">
                  <span><FiHash size={20} /></span>
                  <TextInput
                    type="number"
                    placeholder='No. of Units'
                    value={accommUnit} onChange={(e) => setAccommUnit(e.target.value)}
                    width={100}
                  />
                </div>
              </div>
              <div className="full-row">
                <div className="item-input">
                  <span><FiUser size={20} /></span>
                  <TextInput
                    type="number"
                    placeholder='Capacity'
                    value={accommCap} onChange={(e) => setAccommCap(e.target.value)}
                    width={100}
                  />
                </div>
              </div>
              <div className="buttons">
                <button onClick={handleClick}>Publish</button>
                <button>Save as a Draft</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add_Accommodate
