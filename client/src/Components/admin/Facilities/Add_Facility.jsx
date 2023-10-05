import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TextInput from '../../forms/FormFields/TextInput'
import ReactQuill from 'react-quill'
import placeholder from '../../../img/placeholder-image.webp'
import TextArea from '../../forms/FormFields/TextArea'
import { upload } from '../../../Hooks/imageHandling'
import ImageUploader from '../../util/ImageUploader'
import axios from 'axios'

const Add_Facility = () => {


  const state = useLocation().state

  const [facility, setFacilities] = useState({
    fac_title: state?.Fac_Title || "",
    fac_desc: state?.Fac_Desc || "",
    file: null,
    existingImage: state?.Fac_Img || null,
    previewImage: null
  })


  const navigate = useNavigate();

  // useEffect(() => {
  //   if (state) {
  //     setFacilities({ 
  //       ...facility, 
  //       fac_title: state?.Fac_Title || "",
  //       fac_desc: state?.Fac_Desc || "",
  //       existingImage: state?.Fac_Img || null,
  //     });
  //   }

  // }, [state, facility]);


  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFacilities({ ...facility, file: selectedFile, previewImage: URL.createObjectURL(selectedFile) })
    }
  }

  const removeSelectedImage = () => {
    if (facility.file) {
      setFacilities({ ...facility, file: null, previewImage: null })
    } else if (facility.existingImage) {
      setFacilities({ ...facility, existingImage: null, previewImage: null })
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
          fac_img: facility.file ? imgUrl : "",

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
