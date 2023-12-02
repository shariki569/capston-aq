import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/ui/Header";
import Skeleton from "react-loading-skeleton";
import PostHeading from "../../Components/PostComponents/PostHeading";
import PostItems from "./PostItems";
import ScrollToTop from "../../Components/Hoc/ScrollToTop";
import SEO from "../../Components/SEO/SEO";
import { Menu } from "../../Components";
const Posts = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/api/posts/${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <>
    <SEO
      title="Blog | Aqua Cainta Resort"
    />
      <div className="posts">
        <PostHeading />
        <div className="post__container">
          <div className="left">
            <PostItems posts={posts} />
          </div>
          <div className=" right">
            <div>
              {/* <h4>Suggested Posts</h4> */}
              {/* <PostItems posts={posts} /> */}
              {/* <Menu cat={cat}/> */}
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default ScrollToTop(Posts);
