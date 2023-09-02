import React, { useEffect, useState } from 'react'
import Header from '../Components/ui/Header'
import headerImage from '../img/header1.jpg'

import dummyImage from '../img/dummy-image1.svg'
import axios from 'axios'
import { useAboutPageData } from '../Hooks/fetchPage'
import TwoSections from '../Components/Sections/TwoSections'


const About = () => {

  const { pageData, fetchAboutData } = useAboutPageData()

  useEffect(() => {
    fetchAboutData();
  }, []);

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
          {pageData.sections.map((section) => (
            <TwoSections

              key={section.SectionId}
              title={section.SectionHeading}
              content={section.SectionContent}
              img={`/upload/${section.SectionImage}`}
            />
          ))}

        </div>
      )}


    </div>
  )
}

export default About
