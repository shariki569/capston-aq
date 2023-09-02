import React from 'react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'

const TwoSections = ({ img, content, title }) => {

  

  // console.log("Image URL:", img)
  return (
    <div className='two-sections-container'>
      <div className="image-container">
        <div className="image-wrapper">
          <img src={img} alt="" />
        </div>
      </div>
      <div className='content-wrapper'>
        <div className="content">
          <h1>{title}</h1>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${content}`) }}>
          </p>
          <div className='cta-wrapper'>
            <Link to=''>Learn More</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TwoSections
