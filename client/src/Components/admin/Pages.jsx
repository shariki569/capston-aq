import axios from 'axios'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Pages = () => {


  const navigate= useNavigate();
  const state = useLocation().state
  const [title, setTitle] = useState(state?.title || "")
  const [heading, setHeading] = useState(state?.heading || "")
  const [value, setValue] = useState(state?.content || "")

  //Diri ta nihunong
  const handleClick = async e =>{
    e.preventDefault()
    try {
      state
      await axios.put(`api/pages/${state.slug}`, {
        title,
        heading,
        content:value
      });
      navigate(`/${state.slug}`)
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div className='add'>
      <div className='content'>
        <h2>Edit Page</h2>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Page Title'
        />

        <h2>Section</h2>
        <input 
          type="text" 
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder='Section Title'
        />
        <div className='editorContainer'>
          <ReactQuill
            className='editor'
            theme='snow'
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
        <div className='menu'>
          <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status</b> Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>
            <div className="buttons">
              <button type='button' onClick={handleClick}>Edit</button>
              <button>Save as a Draft</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Pages
