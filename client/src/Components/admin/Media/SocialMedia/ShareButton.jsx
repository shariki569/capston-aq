import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon } from "react-share";
const ShareButton = () => {

  return (
    <div className='share-buttons'>

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
