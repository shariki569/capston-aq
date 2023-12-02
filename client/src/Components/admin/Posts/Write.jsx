import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import TextInput from '../../forms/FormFields/TextInput';
import ImageUploader from '../../util/ImageUploader';
import { upload } from '../../../Hooks/imageHandling';
import { slugify } from '../../util/slugify.js';
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



  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile);
      setPreviewImg(URL.createObjectURL(selectedFile));

    }
  }

  const removeSelectedImage = () => {
    if (postImg) {
      setFile(null)
      setPreviewImg(null);
      setPostImg(null)
    } else if (postImg) {
      setPreviewImg(null)
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
      
      navigate("/")
    } catch (err) {
      setLoading(false)
      console.log(err);
    } finally {
      setLoading(false)
    };
  };


  return (
    <div className='add'>
      <div className="content">
        <span><Link to='/dashboard/posts'>Back</Link></span>
        <TextInput
          containerClass={'title-input'}
          type="text"
          value={title}
          placeholder='Title'
          width={100}
          onChange={(e) => setTitle(e.target.value)}
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
            onChange={setValue}
          />
        </div>
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
            previewImage={previewImg}
            handleImageChange={handleImageChange}
            removeSelectedImage={removeSelectedImage}
            existingImage={postImg}
          />
          <div className="buttons">
            {loading ?
              (
                <button className='btn btn-loading' disabled={true}>Publishing</button>
              ) : (
                <button className='btn' onClick={handleClick}>Publish</button>
              )
            }
            {/* <button>Save as a Draft</button> */}
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className='cat'>
            <input
              type="radio"
              checked={cat === "art"}
              name='cat'
              value="art"
              id='art'
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="">Art</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "science"} name='cat' value="science" id='science' onChange={e => setCat(e.target.value)} />
            <label htmlFor="science">Science</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "technology"} name='cat' value="technology" id='technology' onChange={e => setCat(e.target.value)} />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "cinema"} name='cat' value="cinema" id='cinema' onChange={e => setCat(e.target.value)} />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "design"} name='cat' value="design" id='design' onChange={e => setCat(e.target.value)} />
            <label htmlFor="design">Design</label>
          </div>
          <div className='cat'>
            <input type="radio" checked={cat === "foods"} name='cat' value="food" id='food' onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
