import React from 'react'
import { Link } from 'react-router-dom'

const TwoSections = ({ img, content, title}) => {
  return (
    <div className='two-sections-container'>
        <div className="image-wrapper">
            <img src={img} alt="" />
        </div>
        <div className='content-wrapper'>
            <h1>{title}</h1>
            <p>{content}</p>
            <div className='cta-wrapper'>
                <Link to=''>Learn More</Link>
            </div>
        </div>
    </div>
  )
}

export default TwoSections
