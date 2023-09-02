import axios from 'axios'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import homeHeader from '../img/HEADER-HOMEPAGE.jpg'

import dummyImage from '../img/dummy-image1.svg'
import TwoSections from '../Components/Sections/TwoSections'

const Home = () => {

  const [posts, setPosts] = useState([])

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${cat}`)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home'>
      <div className="container">
        <div className='home-header-wrapper'>
          <picture>
            <source />
            <img className='home-header' src={homeHeader} alt="" />
          </picture>
          <div className='home-title-wrapper'>
            <div className='home-title'>
              <h1>Embrace Relaxation</h1>
              <p>Surrender to the Allure of Our Resort</p>
            </div>
            <div className='home-cta'>
              <Link className='cta' to='/'>Learn More</Link>
            </div>
          </div>

        </div>
        <TwoSections
          title='OurResort'
          content='yoohoo wAssap'
          img={dummyImage}
        />

      </div>
    </div>
  )
}

export default Home
