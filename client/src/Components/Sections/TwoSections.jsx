import React from 'react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'

const TwoSections = ({ images, content, title, inverse, cta, icon, }) => {
  const flexDirection = inverse? 'row-reverse' : 'row';
  
  return (
    <div className='two-sections-container bg-white' style={{ flexDirection }}>
      <div className="image-container">
        <div className="image-grid">
          {images && images.map((img, index) => (
            <div className={`image-wrapper ${index === 0 ? 'full-width': ''}` }key={index}>
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>
      <div className='content-wrapper'>
        <div className="content">
          <h4 className='xxl-font'>{title}</h4>
          {icon && <span className='two-section-icon'>{icon}</span>}
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${content}`) }}>
          </p>
          { cta && <div className='cta-wrapper'>
            <Link to={cta}>Learn More</Link>
          </div>}
        </div>
      </div>

    </div>
  )
}

export default TwoSections
