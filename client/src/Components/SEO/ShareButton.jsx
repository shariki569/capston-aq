import React from 'react'
import { HelmetData } from 'react-helmet-async';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon } from "react-share";


const ShareButton = () => {
  const imageUrl = 'https://aquacaintaresort.netlify.app/assets/HEADER-HOMEPAGE-778b2982.webp'
  return (
    <div className='share-buttons'>

      <FacebookShareButton
        url='https://aquacaintaresort.netlify.app/'
        quote="Aqua Cainta - Surrender to the Allure of Our Resort"
        hashtag='#AquaCaintaResort-ShareButton'
        className='btn-2'
      >
        <FaFacebook size={25}/>
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