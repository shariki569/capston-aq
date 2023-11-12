import axios from 'axios'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import homeHeader from '../img/HEADER-HOMEPAGE.webp'
import OGimg from '../img/opengraph-image.png'
import { FaRegLifeRing } from "react-icons/fa";
import TwoSections from '../Components/Sections/TwoSections'
import HomeSection1 from '../Components/Sections/HomeSection1'
import Facility_Section from '../Components/Sections/Facility_Section'
import Amenities from '../Components/Sections/Amenities'
import SEO from '../Components/SEO/SEO'
import ScrollToTop from '../Components/Hoc/ScrollToTop'


const Home = () => {

  return (
    <>
      <SEO
        title='Aqua Cainta Resort - A Relaxing Oasis in Cebu City'
        description='Discover the quiet charm of Aqua Cainta Resort in Cebu City. Our resort offers comfortable rooms, tranquil pools, and a variety of amenities for a peaceful stay. Experience Cebu at its most serene.'
        name='Aqua Cainta Resort'
        type='Homepage'
        url='https://aquacaintaresort.netlify.app/'
        hashtag='#AquaCaintaResortHomepage'
        image='https://caintaresort-test.netlify.app/assets/opengraph-image-31c22eb7.png'
        quote="Discover the quiet charm of Aqua Cainta Resort in Cebu City. Our resort offers comfortable rooms, tranquil pools, and a variety of amenities for a peaceful stay. Experience Cebu at its most serene."
      />
      <div className='home'>
        <div className="container">
          <div className='home-header-wrapper'>
            <picture>
              <source />
              <img className='home-header' src={homeHeader} alt="" />
            </picture>
            <div className='home-title-wrapper'>
              <div className='home-title'>
                <h1 className='xxxl-font'>Embrace Relaxation</h1>
                <p>Surrender to the Allure of Our Resort</p>
              </div>
              <div className='home-cta'>
                <Link className='cta' to='/'>Learn More</Link>
              </div>
            </div>

          </div>
        </div>
      </div>
      <HomeSection1 />
      <Facility_Section />
      <Amenities />
      <TwoSections
        title='Safety First'
        content="In our resort, your well-being is our top priority. Our dedicated team of lifeguards and a registered nurse are always on standby to ensure your safety. Rest easy, knowing you're in capable hands"
        images={[
          `/upload/lifeguard.webp`
        ]}
        icon={<FaRegLifeRing size={35} />}
      />


    </>
  )
}

export default ScrollToTop(Home)
