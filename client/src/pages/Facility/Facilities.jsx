import React, { useEffect, useState } from 'react'
import Header from '../../Components/ui/Header'
import headerImage from '/upload/1697021778728IMG_6025.jpg'
import SectionWithHeading from '../../Components/Sections/SectionWithHeading'
import TwoSectionsWithGallery from '../../Components/Sections/TwoSectionsWithGallery'
import axios from 'axios'

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
      <div className='wrapper '>
        <SectionWithHeading main="Explore Our Facilities" />

      </div>
      <section className='facility'>
        <div className="facility-sections" id='facility-container'>
          {facilities.map((facility) => (
            <TwoSectionsWithGallery
              title={facility.Fac_Title}
              desc={facility.Fac_Desc}
              key={facility.Fac_Id}
              galleries={facility.Gallery_Images}
              featuredImg={facility.Featured_Image}
            />
          ))}
        </div>
        {/* {facilities.map((facility) => (
          <div key={facility.Fac_Id}>
            <h2>{facility.Fac_Title}</h2>
            <p>{facility.Fac_Desc}</p>
            <img src={`/upload/${facility.Featured_Image}`} alt="" />
          < div >
          {
            facility.Gallery_Images.map((image) => (
              <img key={image} src={`/upload/${image}`} alt="" />
            ))
          }
            </>
      </div>
        ))} */}
      </section >
    </>
  )
}

export default Facilities
