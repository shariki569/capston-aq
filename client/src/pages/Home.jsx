import axios from 'axios'
import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


const Home = () => {

const [posts, setPosts] = useState([])

const cat = useLocation().search;

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`/api/posts/${cat}`)
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchData();
}, [cat]);

const  getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html")
  return doc.body.textContent
}

  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
              </Link>
              <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.desc)}}></p>
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
