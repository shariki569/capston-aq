import React, { useEffect, useState } from 'react'
import Header from '../Components/ui/Header'
import headerImage from '../img/header1.jpg'
import { useAboutPageData } from '../API/fetchPage'
import TwoSections from '../Components/Sections/TwoSections'
import SEO from '../Components/SEO/SEO'


const About = () => {

  const { pageData } = useAboutPageData()
  return (
    <>
      <SEO
        title='About Us | Aqua Cainta Resort'
        name="Aqua Cainta Resort"
        type="website"
        hashtag="#AquaCaintaResort"
        image={headerImage}
        quote="About Us" />
      <div className='about'>
        {pageData && (
          <div>
            <Header
              imageUrl={headerImage}
              title='About Us'
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
    </>

  )
}

export default About
