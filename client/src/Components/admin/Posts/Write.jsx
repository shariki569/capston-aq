import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import TextInput from '../../forms/FormFields/TextInput';
import ImageUploader from '../../util/ImageUploader';
import { upload } from '../../../Hooks/imageHandling';
import { slugify } from '../../util/slugify.js';
import Modal from '../../ui/Modal/Modal';
import { FiAlertCircle } from 'react-icons/fi';
import { toast } from 'sonner';
const Write = () => {

  const state = useLocation().state
  const [title, setTitle] = useState(state?.PostTitle || "")
  const [value, setValue] = useState(state?.PostDesc || "")
  const [file, setFile] = useState(null)
  const [previewImg, setPreviewImg] = useState(null)
  const [postImg, setPostImg] = useState(state?.PostImg || "")
  const [cat, setCat] = useState(state?.PostCat || "")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [unsavedChanges, setUnsavedChanges] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));
      setUnsavedChanges(true)
    }
  }



  const removeSelectedImage = () => {
    if (postImg) {
      setFile(null)
      setPreviewImg(null);
      setPostImg(null)
      setUnsavedChanges(true)
    } else if (postImg) {
      setPreviewImg(null)
      setUnsavedChanges(true)
    }
  }


  const handleClick = async e => {
    e.preventDefault()
    setLoading(true)
    const imgUrl = file ? await upload(file) : postImg;

    try {
      state
        ? await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/${state.PostId}`, {
          title,
          slug: slugify(title),
          desc: value,
          cat,
          img: file ?
            imgUrl : postImg,
        }, {
          withCredentials: true
        })
        : await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/`, {
          title,
          slug: slugify(title),
          desc: value,
          cat,
          img: file ?
            imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }, {
          withCredentials: true
        });

      navigate("/dashboard/posts")
    } catch (err) {
      setLoading(false)
      console.log(err);
    } finally {
      toast.success(state ? 'Posts has been successfully updated!' : 'Post added successfully!')
      setLoading(false)
      setUnsavedChanges(false);
    };
  };

  const handleBack = () => {
    if (unsavedChanges) {
      setShowModal(true)
    } else {
      navigate("/dashboard/posts")
    }
  }

  const handleConfirmation = (confirm) => {
    if (confirm) {
      setShowModal(false)
      navigate("/dashboard/posts")
    } else {
      setShowModal(false)
    }
  }


  return (
    <div className='add'>
      <div className="content">
        <span className="add-button" onClick={handleBack}>Back</span>
        <TextInput
          containerClass={'title-input'}
          type="text"
          value={title}
          placeholder='Title'
          width={100}
          onChange={
            (e) => {
              setTitle(e.target.value);
              setUnsavedChanges(true)
            }}
        />
        {/* <input
          type="text"
          value={title}
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
        /> */}
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme='snow'
            value={value}
            onChange={(content, delta, source, editor) => {
              setValue(content);
              setUnsavedChanges(true)
            }}
          />
        </div>
      </div>
      <div className="menu">
      <div className="buttons">
            {loading ?
              (
                <button className='btn btn-full btn-loading disabled'>Publishing</button>
              ) : (
                <button className='btn btn-full' onClick={handleClick}>Publish</button>
              )
            }
       
          </div>
        <div className="item">
          <h1>Publish</h1>
          <ImageUploader
            file={file}
            previewImage={previewImg}
            handleImageChange={handleImageChange}
            removeSelectedImage={removeSelectedImage}
            existingImage={postImg}
          />
          
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="radio-input-wrapper">
            {categories.map((category) => (
              <div className='radio-input' key={category.name}>
                <input
                  type="radio"
                  checked={cat === category.name}
                  name='cat'
                  value={category.name}
                  id={category.name}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="">{category.label}</label>
              </div>
            ))}
          </div>

          {/* <div className='cat'>
            <input type="radio" checked={cat === "science"} name='cat' value="science" id='science' onChange={e => setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "technology"} name='cat' value="technology" id='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "activities and entertainment"} name='Activities and Entertainment' value="Activities and Entertainment" id='Activities and Entertainment' onChange={e => setCat(e.target.value)} />
            <label htmlFor="Activities and Entertainment">Activities and Entertainment</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "special offers"} name='cat' value="special offers" id='special offers' onChange={e => setCat(e.target.value)} />
            <label htmlFor="Special Offers">Special Offers</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "foods"} name='cat' value="food" id='food' onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div> */}
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
    </div >
  )
}

export default Write


export const categories = [
  {
    id: 1,
    name: "budget-friendly",
    label: "Budget-Friendly",
  },
  {
    id: 2,
    name: "comfort",
    label: "Comfort",
  },
  {
    id: 3,
    name: "explore",
    label: "Explore",
  },
  {
    id: 4,
    name: "family-fun",
    label: "Family Fun",
  },
  {
    id: 5,
    name: "community",
    label: "Community",
  },
  {
    id: 6,
    name: "special-offers",
    label: "Special Offers",
  },
  {
    id: 7,
    name: 'staycation',
    label: 'Staycation',
  }
]