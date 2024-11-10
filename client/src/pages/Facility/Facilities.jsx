import React, { useEffect, useState } from 'react'
import Header from '../../Components/ui/Header'
import headerImage from '/upload/1697021778728IMG_6025.jpg'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import TwoSectionsWithGallery from '../../Components/Sections/TwoSectionsWithGallery'
import axios from 'axios'
import Amenities from '../../Components/Sections/Amenities'

const Facilities = () => {
  const [facilities, setFacilities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/facilities')
        setFacilities(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [])


  return (
    <>
      <Header
        imageUrl={headerImage}
        title='Facilities'
      />
      <div className='wrapper m-margin-y'>
        <SectionWithHeading 
        main="Your Gateway to Enjoyment" 
        subheading="Explore our Facilities"
        desc="Shine a spotlight on the intersection of comfort and convenience as you navigate the heart of our resort's offerings"/>

      </div>
      <section className='facility wrapper'>
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
    

      <Amenities/>
    </>
  )
}

export default Facilities
