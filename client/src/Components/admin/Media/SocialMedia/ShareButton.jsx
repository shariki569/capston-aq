import React from 'react'
import { HelmetData } from 'react-helmet-async';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon } from "react-share";
import SEO from './SEO';

const ShareButton = () => {

  return (
    <div className='share-buttons'>
      <SEO/>
      <FacebookShareButton
        url='https://aquacaintaresort.netlify.app/'
        quote="Aqua Cainta - Surrender to the Allure of Our Resort"
        hashtag='#AquaCaintaResort'
        className='btn-2'
      >
        <FaFacebook size={25} />
      </FacebookShareButton>
      {/* <button className='btn-2' onClick={shareOnFacebook}>
        <FaFacebook size={25} /> Share on Facebook
      </button>
      <button className='btn-2' onClick={shareOnTwitter}>
        <FaTwitter size={25} /> Share on Twitter
      </button> */}
    </div>
  )
}


export default ShareButton
