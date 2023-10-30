import axios from 'axios'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import homeHeader from '../img/HEADER-HOMEPAGE.jpg'
import { FaRegLifeRing } from "react-icons/fa";
import TwoSections from '../Components/Sections/TwoSections'
import HomeSection1 from '../Components/Sections/HomeSection1'
import Facility_Section from '../Components/Sections/Facility_Section'
import Amenities from '../Components/Sections/Amenities'
import SEO from '../Components/admin/Media/SocialMedia/SEO'


const Home = () => {


  return (
    <>
      <SEO
        title='Homepage | Aqua Cainta Resort'
        description='Surrender to the Allure of Our Resort'
        name='Aqua Cainta Resort'
        type='Homepage'
        url='https://aquacaintaresort.netlify.app/'
        hashtag='#AquaCaintaResort'
        image={homeHeader}
        quote="Aqua Cainta - Surrender to the Allure of Our Resort"
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

export default Home
