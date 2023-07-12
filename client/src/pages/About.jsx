import React, { useEffect, useState } from 'react'
import Header from '../Components/ui/Header'
import headerImage from '../img/header1.jpg'
import TwoSections from '../Components/ui/TwoSections'
import dummyImage from  '../img/dummy-image1.svg'
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
        <>
          <Header
            imageUrl = {headerImage}
            title = {pageData.title}
            pageSlug = {pageData.slug}
            state = {pageData}
          />
          <TwoSections 
          title = {pageData.heading}
          content={pageData.content}
          img= {dummyImage}
          />
        </>
      )}

      
    </div>
  )
}

export default About
