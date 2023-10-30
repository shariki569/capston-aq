import React from 'react'
import { HelmetData } from 'react-helmet-async';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon } from "react-share";
import SEO from './SEO';

const ShareButton = () => {
  const imageUrl = 'https://aquacaintaresort.netlify.app/assets/HEADER-HOMEPAGE-778b2982.webp'
  return (
    <div className='share-buttons'>

      <SEO
        title='Homepage | Aqua Cainta Resort'
        description='Surrender to the Allure of Our Resort'
        name='Aqua Cainta Resort'
        type='Homepage'
        url='https://aquacaintaresort.netlify.app/'
        hashtag='#AquaCaintaResort'
        image={imageUrl}
        quote="Aqua Cainta - Surrender to the Allure of Our Resort"
      />


      <FacebookShareButton
        url='https://aquacaintaresort.netlify.app/'
        quote="Aqua Cainta - Surrender to the Allure of Our Resort"
        hashtag='#AquaCaintaResortWAWA'
        className='btn-2'
      >
        <FaFacebook size={25} />
      </FacebookShareButton>
  
    </div>
  )
}

export default ShareButton
    {/* <button className='btn-2' onClick={shareOnFacebook}>
        <FaFacebook size={25} /> Share on Facebook
      </button>
      <button className='btn-2' onClick={shareOnTwitter}>
        <FaTwitter size={25} /> Share on Twitter
      </button> */}