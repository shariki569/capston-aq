import React from 'react'
import { HelmetData } from 'react-helmet-async';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'

import { useLocation } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, TwitterShareButton } from "react-share";



const ShareButton = () => {

  const location = useLocation()

  const url = 'https://resortcainta.netlify.app/' + location.pathname;
  
  return (
    <div className='share-buttons'>

      <FacebookShareButton
        url={url}
        quote="Aqua Cainta - Surrender to the Allure of Our Resort"
        hashtag='#AquaCaintaResort'
        className='btn-2'
      >
        <span><FaFacebook size={25} /></span>
      </FacebookShareButton>


      <TwitterShareButton
        url={url}
        hashtag='#AquaCaintaResort'
        className='btn-2'
      >

        {/* <span><FaXTwitter size={25} /></span> */}
        <span><FaXTwitter size={25} /></span>
      </TwitterShareButton>
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