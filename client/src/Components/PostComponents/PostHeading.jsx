import React from 'react'
import postBannerImg from '../../img/blog3.svg'
const PostHeading = () => {
  return (
    <div className='postheading__container'>
      <div className="postheading__wrapper">
        <div className='postheading__title'>
          <h1>Blog Posts</h1>
          <p>Unveil the serene beauty of our resort, a haven of tranquility and luxury nestled in nature’s lap. This post is your invitation to experience paradise</p>
        </div>
        <div className='postheading__imageWrapper'>
          <img src={postBannerImg} alt="image" />

        </div>
      </div>
    </div>
  )
}

export default PostHeading
