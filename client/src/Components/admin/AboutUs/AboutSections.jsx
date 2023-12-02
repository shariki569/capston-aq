import React from 'react'
import { useAboutPageData } from '../../../API/fetchPage'
import './aboutSection.scss'
const AboutSections = ({data}) => {
    return (
        <div className='about-sections'>
            {data?.map((section) => (
                <div key={section.About_Id} className='about-section-item'>
                    <div className='about-section-image-wrap'>
                        <img src={section.About_Img.startsWith('http') ? section.About_Img : `/upload/${section.About_Img}`} alt={section?.About_Heading} />
                    </div>
                    <div className='about-section-content'>
                        <div className='about-section-title'>
                            <h3 >{section?.About_Heading}</h3>
                        </div>
                        <div className='about-section-text'>
                            <p>{section?.About_Content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AboutSections
