import DOMPurify from 'dompurify'
import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
const PostItems = ({ posts }) => {
  // console.log(posts.display_name)
  return (
    <div className="post-items">
      {posts ?
        posts.length > 0 ? (
          posts.map((post) => (
            <div className="post" key={post.PostId}>
              <div className="img">
                <img src={post.PostImg} alt="" />
              </div>
              <div className="content">
                <span className='category'>{post.PostCat}</span>
                <Link to={`/post/${post.PostSlug}/${post.PostId}`}>
                  <h1>{post.PostTitle || <Skeleton />}</h1>
                </Link>
                <p className='info'>
                  <span>
                    {moment(post.date).format('MMMM DD YYYY')}
                  </span>
                  By: {post.display_name ? post.display_name : post.username}
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
          ))
        ) : (
          <div>No Posts</div>
        ) : (
          <div>Loading...</div>
        )}

    </div>
  )
}

export default PostItems
