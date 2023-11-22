import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Menu = ({cat}) => {

  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/?cat=${cat}`)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);


  return (
    <div className='menu'>
      <h1>Other Posts you may like</h1>
      {posts.map(post => (
        <div className="post" key={post.PostId}>
            <img src={post.PostImg} alt="" />
            <h2>{post.PostTitle}</h2>
            <Link to={`/post/${post.PostSlug}/${post.PostId}`} className='btn btn-menu'>Read More</Link>
        </div>
      ))}
    </div>
  )
}

export default Menu
