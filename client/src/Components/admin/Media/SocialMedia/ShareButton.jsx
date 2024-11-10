import React from 'react'
import { FaFacebook, FaTwitter } from 'react-icons/fa';

const ShareButton = ({ url, title }) => {
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  }

  const shareOnTwitter = () => {
    const tweet = `${title} ${url}`;
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${tweet}`, '_blank');
  };

  return (
    <div className='share-buttons'>
      <button className='btn-2' onClick={shareOnFacebook}>
        <FaFacebook size={25} /> Share on Facebook
      </button>
      <button className='btn-2' onClick={shareOnTwitter}>
        <FaTwitter size={25} /> Share on Twitter
      </button>
    </div>
  )
}

export default ShareButton
