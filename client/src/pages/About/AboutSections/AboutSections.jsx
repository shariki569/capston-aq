import React from 'react'
import './aboutSection.scss'
const AboutSections = ({image, title, text}) => {
  return (
    <div className="about__sections">
        <div className="about__image">
            <img src={image} alt="" />
        </div>
        <div className='about__content'>
            <div className='about__title'><h3>{title}</h3></div>
            <div className='about__text'><p>{text}</p></div>
        </div>
    </div>
  )
}

export default AboutSections
