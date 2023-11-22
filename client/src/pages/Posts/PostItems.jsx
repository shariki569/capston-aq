import DOMPurify from 'dompurify'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
const PostItems = ({ posts }) => {
  return (
    <div className="post-items">
      {posts.map((post) => (
        <div className="post" key={post.PostId}>
          <div className="img">
            <img src={post.PostImg} alt="" />
          </div>
          <div className="content">
            <Link to={`/post/${post.PostSlug}/${post.PostId}`}>
              <h1>{post.PostTitle || <Skeleton />}</h1>
            </Link>
            <p className='info'>
              <span>
                {moment(post.date).format('MMMM DD YYYY')}
              </span>
              By: {post.username}
            </p>

            <p className='desc'
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.PostDesc),
              }}
            ></p>
            <div className="btn_wrapper">
              <Link to={`/post/${post.PostSlug}/${post.PostId}`} className='btn'>Read More</Link>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}

export default PostItems
