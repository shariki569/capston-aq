import React, { useEffect, useState } from 'react'
import Header from '../Components/ui/Header'
import headerImage from '../img/header1.jpg'

import dummyImage from '../img/dummy-image1.svg'
import axios from 'axios'
import { useAboutPageData } from '../API/fetchPage'
import TwoSections from '../Components/Sections/TwoSections'


const About = () => {

  const { pageData } = useAboutPageData()



  return (
    <div className='about'>
      {pageData && (
        <div>
          <Header
            imageUrl={headerImage}
            title={pageData.PageTitle}
            pageSlug={pageData.Slug}
            state={pageData}
          />
          <div className="about-sections">

            {pageData.sections.map((section) => (
              <TwoSections

                key={section.SectionId}
                title={section.SectionHeading}
                content={section.SectionContent}
                images={
                  [
                    `/upload/${section.SectionImage}`,

                  ]
                }
              />
            ))}
          </div>

        </div>
      )}


    </div>
  )
}

export default About
