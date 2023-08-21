import React, { useEffect, useState } from 'react'
import Header from '../Components/ui/Header'
import headerImage from '../img/header1.jpg'
import TwoSections from '../Components/ui/TwoSections'
import dummyImage from '../img/dummy-image1.svg'
import axios from 'axios'


const About = () => {

  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/pages/about-us')
        setPageData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [])

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
              img={section.SectionImage}
            />
          ))}
          
        </div>
      )}


    </div>
  )
}

export default About
