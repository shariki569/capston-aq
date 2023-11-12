import React, { useEffect, useState } from 'react'
import Header from '../../Components/ui/Header'
import headerImage from '/upload/1697021778728IMG_6025.jpg'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import TwoSectionsWithGallery from '../../Components/Sections/TwoSectionsWithGallery'
import Amenities from '../../Components/Sections/Amenities'
import { useFacilities } from '../../API/fetchFacilities'
import SEO from '../../Components/SEO/SEO'
import ScrollToTop from '../../Components/Hoc/ScrollToTop'

const Facilities = () => {

  const { facilities } = useFacilities([])

  return (
    <div>
      <SEO
        title='Facilities | Aqua Cainta Resort'
        description='Facilities'
        name='Aqua Cainta Resort'
        type='Facilities'
        hashtag='#AquaCaintaResort'
        image={headerImage}
        quote="Facilities"
      />
      <Header
        imageUrl={headerImage}
        title='Facilities'
      />
      {/* <div className='wrapper'> */}
        <SectionWithHeading
          main="Your Gateway to Enjoyment"
          subheading="Explore our Facilities"
          desc="Shine a spotlight on the intersection of comfort and convenience as you navigate the heart of our resort's offerings" />

      {/* </div> */}
      <section className='facility_wrapper'>
        <div className="facility-sections" id='facility-container'>
          {facilities.map((facility) => (
            <TwoSectionsWithGallery
              title={facility.Fac_Title}
              desc={facility.Fac_Desc}
              key={facility.Fac_Id}
              featuredImg={facility.Featured_Image}
              galleries={facility.Gallery_Images}
            />
          ))}
        </div>

      </section >


      <Amenities />
    </div>
  )
}

export default ScrollToTop(Facilities)
