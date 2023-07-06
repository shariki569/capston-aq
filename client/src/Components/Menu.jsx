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

    // const posts = [
    //     {
    //       id: 1,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor. Eleifend quam adipiscing vitae proin sagittis nisl.",
    //       img: "https://images.pexels.com/photos/266004/pexels-photo-266004.jpeg?auto=compress&cs=tinysrgb&w=600"
    //     },
    //     {
    //       id: 2,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor. Eleifend quam adipiscing vitae proin sagittis nisl.",
    //       img: "https://images.pexels.com/photos/57686/pexels-photo-57686.jpeg?auto=compress&cs=tinysrgb&w=600"
    //     },
    //     {
    //       id: 3,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor. Eleifend quam adipiscing vitae proin sagittis nisl.",
    //       img: "https://images.pexels.com/photos/6373309/pexels-photo-6373309.jpeg?auto=compress&cs=tinysrgb&w=600"
    //     },
    //     {
    //       id: 4,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor. Eleifend quam adipiscing vitae proin sagittis nisl.",
    //       img: "https://images.pexels.com/photos/3933240/pexels-photo-3933240.jpeg?auto=compress&cs=tinysrgb&w=600"
    //     },
    //     {
    //       id: 5,
    //       title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    //       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat in ante metus dictum at tempor. Eleifend quam adipiscing vitae proin sagittis nisl.",
    //       img: "https://images.pexels.com/photos/358904/pexels-photo-358904.jpeg?auto=compress&cs=tinysrgb&w=600"
    //     },
    // ]

  return (
    <div className='menu'>
      <h1>Other Posts you may like</h1>
      {posts.map(post => (
        <div className="post" key={post.id}>
            <img src={`../upload/${post.img}`} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
        </div>
      ))}
    </div>
  )
}

export default Menu
