import React from 'react'
import postBannerImg from '../../img/blog3.svg'
const PostHeading = ({title, description}) => {
  return (
    <div className='postheading__container'>
      <div className="postheading__wrapper">
        <div className='postheading__title'>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className='postheading__imageWrapper'>
          <img src={postBannerImg} alt="image" />

        </div>
      </div>
    </div>
  )
}

export default PostHeading
