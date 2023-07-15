import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {

  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`)
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
            <img src={`../upload/${post.PostImg}`} alt="" />
            <h2>{post.PostTitle}</h2>
            <button>Read More</button>
        </div>
      ))}
    </div>
  )
}

export default Menu
