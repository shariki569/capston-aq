import axios from 'axios'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { useLocation, useNavigate } from 'react-router-dom'


const Pages = () => {


  const state = useLocation().state
  const [pageTitle , setPageTitle] = useState(state?.PageTitle || "");
  const [pageSections, setSections] = useState(state?.sections || []);
  const navigate= useNavigate();


  const handleSectionChange = (sectionIndex, field, value) => {
    setSections((prevSections) => {
      const updateSections = [...prevSections];
      updateSections[sectionIndex][field] = value;
      return updateSections;
    });
  };

  // const state = useLocation().state
  // const [title, setTitle] = useState(state?.PageTitle || "")
  // const [heading, setHeading] = useState(state?.SectionHeading || "")
  // const [value, setValue] = useState(state?.SectionContent || "")

  //Diri ta nihunong
  const handleUpdate = async e =>{
    e.preventDefault()
    try {
      await axios.put(`api/pages/${state.Slug}`, {
        PageTitle: pageTitle,
        sections: pageSections,
      });
      navigate(`/${state.Slug}`)
    } catch (err) {
      console.log(err);
    }
  }
  

  

  return (
    <div>
        <div className='add'>
          <div className='content'>
            <h2>Edit Page</h2>
            <input 
              type="text" 
              value={pageTitle}
              onChange={(e)=> setPageTitle(e.target.value)}
              placeholder='Page Title'
            />

            <h2>Section</h2>
            {pageSections.map((section, index) => (
              <div key={index}>
                <h3>Section {index + 1}</h3>
                <input 
                  type="text" 
                  value={section.SectionHeading}
                  onChange= {(e) => handleSectionChange(index, 'SectionHeading', e.target.value)}
                  placeholder='Section Title'
                />
                <div className='editorContainer'>
                  <ReactQuill
                    className='editor'
                    theme='snow'
                    value={section.SectionContent}
                    onChange={(value) => handleSectionChange(index, 'SectionContent', value)}
                  />
                </div>
              </div>
            ))}
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
                  <button type='button' onClick={handleUpdate}>Update</button>
                  <button>Save as a Draft</button>
                </div>
              </div>
            </div>
        </div>
    </div>

  )
}

export default Pages
